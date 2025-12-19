import { getItem, setItem } from '$lib/storage.js';
import { loading } from '$lib/helpers/loading.svelte.js';
import { browser } from '$app/environment';

export const load = ({ fetch }) => {
	if (loading.isMaintanance) {
		loading.value = true;
		loading.message =
			'Database under maintenance, if you need details on my abilities contact me at frincucristiananton@gmail.com';
		return;
	}
  if(!browser){
    return {open:false}
  }
	const sessionStoreInitialized = getItem('npcs');
	if (sessionStoreInitialized && Object.values(sessionStoreInitialized).length > 0) {
		loading.value = false;
		console.log('Session storage already initialized, skipping database check.');
		return { open: true };
	}else{
    	return checkDatabase();
  }

	async function checkDatabase() {
		try {
			loading.message = `Loading in server...`;
			const data = await (await fetch('/api/getAll')).json();
      console.log(data)
			if (data || data != 'Error: Error: Request in progress') {
				for (const property in data.data) {
					setItem(property, data.data[property]);
				}
				loading.value = false;
				return { open: true };
			}

			loading.value = true;
			return { open: false };
		} catch (e) {
			console.log('Error in checkDatabase', e);
			loading.value = true;
			return { open: false };
		}
	}
};
