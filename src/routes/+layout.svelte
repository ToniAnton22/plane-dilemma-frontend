<script>
	import '../app.css';
	import AddLocation from '$lib/components/AddLocation.svelte';
	import PlayAudio from '$lib/components/PlayAudio.svelte';
	import DrawerData from '$lib/components/DrawerData.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import Mist from '$lib/components/Mist.svelte';
	import { audioData } from '$lib/data/audioData.js';
	import { themeSong } from '$lib/themeSong.js';
	import TownDetails from '$lib/components/TownDetails.svelte';
	import { loading } from '$lib/helpers/loading.svelte.js';

	let { children } = $props();
	let town;
	let themesong = $derived.by(() => {
		if (themeSong !== undefined) {
			//playTrack(audioData[$themeSong].url);
		}
	});
	let stage;
	// $: if($drawerStore.id){
	// 	stage = $drawerStore.id
	// 	town = $drawerStore?.town
	// }else {
	// 	$drawerStore.id = stage
	// }
</script>

{#if loading.isMaintanance}
	<LoadingScreen />
{:else if loading.value}
	<LoadingScreen />
{:else}
	{@render children()}
{/if}
<!-- <Drawer position="top" height="h-full" border="border-b-4 rounded-lg border-l border-r" class="relative h-2/3">
	<button class="absolute w-6 h-6 md:w-12 md:h-12 m-2 md:m-6 hover:pointer z-40 top-0 right-0 border bg-red-500 rounded-full opacity-70" on:click={drawerStore.close}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>  
    </button>
	{#if stage == '1'}

	{/if}
	{#if stage == '2'}
		<TownDetails {town}/>
	{/if}
	{#if stage == undefined}
		<h1 class="text-4xl"> I AM HERE FOR WHATEVER REASON</h1>
	{/if}
	<DrawerData/>
</Drawer> -->

<!-- <Toast /> -->
<PlayAudio />
<!-- <Modal components={modalRegistry} /> -->

<!-- <Mist /> -->
