class RequestManager {
	activeRequest;
	requestCache;

	constructor(activeRequest = new Map(), requestCache = new Map()) {
		this.activeRequest = activeRequest;
		this.requestCache = requestCache;
	}

	getActiveRequest() {
		return this.activeRequest;
	}

	getRequestCache() {
		return this.requestCache;
	}

	async throttledRequest(requestFn, options = {}) {
		const { cacheMs = 5000, key = requestFn.toString() } = options;

		const now = Date.now();

		// Check if there's already an active request for this key - WAIT FOR IT
		const activeRequest = this.activeRequest.get(key);
		if (activeRequest) {
			return activeRequest; // Return the existing promise instead of throwing
		}

		// Check in-memory cache
		const cached = this.requestCache.get(key);
		if (cached?.promise && now - cached.timestamp < cacheMs) {
			return cached.promise;
		}

		// Create new request
		const promise = requestFn()
			.then((data) => {
				this.activeRequest.delete(key);
				return data;
			})
			.catch((error) => {
				this.activeRequest.delete(key);
				this.requestCache.delete(key); // Also clear cache on error
				throw error;
			});

		// Store the active request and cache it
		this.activeRequest.set(key, promise);
		this.requestCache.set(key, { promise, timestamp: now });

		try {
			return await promise;
		} finally {
			// Clean up cache after expiration
			setTimeout(() => {
				const cached = this.requestCache.get(key);
				if (cached?.timestamp === now) {
					this.requestCache.delete(key);
				}
			}, cacheMs);
		}
	}
}

const requestManager = new RequestManager();

export default requestManager;
