import { error, json, type RequestHandler } from '@sveltejs/kit';
import { starter } from '$lib/helpers/starter';
import {
	DAVE_KEY,
	DB_HOST,
	INTERNAL_KEY,
	PREVIEW_PASSWORD,
	PREVIEW_USERNAME
} from '$env/static/private';
import { dev } from '$app/environment';

export const GET: RequestHandler = async ({ url, cookies }) => {
	try {
		let token = cookies.get('token');
		
		if (!token) {
			const result = await fetch(`${DB_HOST}/User/login`, {
				method: 'POST',
				headers: {
					'DAVE-KEY': DAVE_KEY,
					'Content-Type': 'application/json',
					'X-Internal-Request': INTERNAL_KEY
				},
				body: JSON.stringify({
					username: PREVIEW_USERNAME,
					password: PREVIEW_PASSWORD,
					role: 'Previewer'
				})
			});
			console.log(result)
			if (result.status != 200) {
				throw new Error('Failed to Login.');
			}
			token = (await result.json()).token as string;
			const decoded = decodeJWT(token);
			if (!decoded) {
				throw new Error('Decoding failed. Invalid return');
			}
			cookies.set('token', token, {
				expires: decoded?.expiresAt,
				path: '/',
				secure: !dev
			});
		}
		const checkToken = await fetch(`${DB_HOST}/User/check/token`, {
			headers: {
				'DAVE-KEY': DAVE_KEY,
				Authorization: `Bearer ${token}`,
				'X-Internal-Request': INTERNAL_KEY
			}
		});
		if (checkToken.status === 401) {
			throw new Error('Check failed. Token is invalid');
		}
		const resultCheck = await checkToken.json();

		if (resultCheck) {
			const data = await starter([], [], token);
			return json({ data, success: true, message: 'Successful' }, { status: 200 });
		} else {
			const result = await fetch(`${DB_HOST}/User/login`, {
				headers: {
					'DAVE-KEY': DAVE_KEY,
					'Content-Type': 'application/json',
					'X-Internal-Request': INTERNAL_KEY
				},
				method: 'POST',
				body: JSON.stringify({
					username: PREVIEW_USERNAME,
					password: PREVIEW_PASSWORD,
					role: 'Previewer'
				})
			});
			token = (await result.json()).token as string;
			const data = await starter([], [], token);
			const decoded = decodeJWT(token);
			cookies.set('token', token, {
				expires: decoded?.expiresAt,
				path: '/',
				secure: !dev
			});
			return json({ data, success: true, message: 'Successful' }, { status: 200 });
		}
	} catch (e) {
		console.error(e);
		error(500, { message: e.message, success: false });
	}
};

interface DecodedToken {
	userId: string;
	name: string;
	role: string;
	lastLoginAt: string | null;
	campaignId: string | null;
	exp: number;
	expiresAt: Date;
	timeUntilExpiry: number;
	isExpired: () => boolean;
	isExpiringSoon: (minutesThreshold?: number) => boolean;
	timeRemaining: () => string;
}

function decodeJWT(token: string): DecodedToken | null {
	try {
		const payload = token.split('.')[1];
		const decoded = JSON.parse(atob(payload));

		const now = Date.now() / 1000;
		const exp = decoded.exp;
		const timeUntilExpiry = exp - now;

		return {
			userId: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
			name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
			role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'Player',
			lastLoginAt: decoded.LastLoginAt || null,
			campaignId: decoded.Campaign || null,
			exp: exp,
			expiresAt: new Date(exp * 1000),
			timeUntilExpiry: timeUntilExpiry,
			isExpired: () => now >= exp,
			isExpiringSoon: (minutesThreshold = 5) => timeUntilExpiry <= minutesThreshold * 60,
			timeRemaining: () => {
				if (timeUntilExpiry <= 0) return 'Expired';
				const hours = Math.floor(timeUntilExpiry / 3600);
				const minutes = Math.floor((timeUntilExpiry % 3600) / 60);
				return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
			}
		};
	} catch (error) {
		console.error('Invalid JWT token:', error);
		return null;
	}
}
