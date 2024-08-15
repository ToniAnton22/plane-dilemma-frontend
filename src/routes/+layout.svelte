<script>
	import '../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';
	import AddLocation from '$lib/components/AddLocation.svelte'
	import { initializeStores } from '@skeletonlabs/skeleton';
    import { Drawer, getDrawerStore, Modal,getModalStore ,TableOfContents} from '@skeletonlabs/skeleton';
	import {navigating} from '$app/stores'
	import {isLoading,databaseLoading} from "$lib/loadingStore.js"
	import {onMount} from "svelte"
	import PlayAudio from "$lib/components/PlayAudio.svelte"  
	import DrawerData from "$lib/components/DrawerData.svelte"
	import LoadingScreen from './LoadingScreen.svelte' 
	import Mist from '$lib/components/Mist.svelte';
	import {audioData} from "$lib/data/audioData.js"
	import {playTrack} from "$lib/helpers/setAudio.js"
	import {themeSong} from "$lib/themeSong.js"
	import TownDetails from '$lib/components/TownDetails.svelte';
	
    initializeStores();

	let town;
	const drawerStore = getDrawerStore()
	$: $isLoading = !!$navigating
	$: if($themeSong !== undefined){
		playTrack(audioData[$themeSong].url)
	}
	let stage
	$: if($drawerStore.id){
		stage = $drawerStore.id
		town = $drawerStore?.town 
	}else {
		$drawerStore.id = stage
	}
	console.log(stage)
	$: console.log($drawerStore.open)
	$: console.log($drawerStore.id)

	function closeDrawer(){
	
		setTimeout((drawerStore.close()),5000)

	}
	const modalRegistry ={
		addCityModal: {ref: AddLocation}
	}
</script>

{#if $isLoading || $databaseLoading }
	<LoadingScreen/>
{/if}
<Drawer position="top" height="h-full" border="border-b-4 rounded-lg border-l border-r" class="relative h-2/3">
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
</Drawer>
<Toast/>
<PlayAudio/>
<Modal components={modalRegistry}/>

<Mist/>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
	</svelte:fragment>
	<div class="absolute w-full bottom-0 inset-x-0 z-30">
		<button on:click={() =>{
			if(stage){
				drawerStore.open()
			}else{
				drawerStore.close()
			}
			}} class="flex w-[5vh] h-[5vh] variant-glass-tertiary">
			<svg xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" viewBox="0 0 24 24" fill="none">
				<path d="M8 16L12 20M12 20L16 16M12 20V8M4 4H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>
	<!-- Page Route Content	 -->
	<slot />
</AppShell>
