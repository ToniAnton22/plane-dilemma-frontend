import { writable } from 'svelte/store';

export const isLoading = writable(false);

export const databaseLoading = writable(false)

export const sessionStorageInitialized = writable(false)