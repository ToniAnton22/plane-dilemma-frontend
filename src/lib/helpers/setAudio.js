import { writable } from 'svelte/store';

export const currentTrack = writable({ url: null, playing: false});

export function playTrack(url) {
  currentTrack.set({ url, playing: true});
}

export function stopTrack() {
  currentTrack.update(state => ({ ...state, playing: false}));
}

export const volume = writable(10)