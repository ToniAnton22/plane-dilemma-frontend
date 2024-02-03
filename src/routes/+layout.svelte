<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
    import { Drawer, getDrawerStore, Modal,getModalStore } from '@skeletonlabs/skeleton';
	import {navigating} from '$app/stores'
	import {isLoading} from "$lib/loadingStore.js"
	import {onMount} from "svelte"
	import PlayAudio from "$lib/components/PlayAudio.svelte"  
	import DrawerData from "$lib/components/DrawerData.svelte"
	import LoadingScreen from './LoadingScreen.svelte' 
	import Mist from '$lib/components/Mist.svelte';
	import {audioData} from "$lib/data/audioData.js"
	import {playTrack} from "$lib/helpers/setAudio.js"
	import {themeSong} from "$lib/themeSong.js"
    initializeStores();
	const drawerStore = getDrawerStore()
	const settings  = {id:'0',
	
	}

	drawerStore.set(settings)
	
	$: $isLoading = !!$navigating
	$: if($themeSong !== undefined){
		playTrack(audioData[$themeSong].url)
	}

	

</script>

<LoadingScreen/>
<Drawer position="top">
	<DrawerData/>
</Drawer>
<PlayAudio/>
<Modal/>

<Mist/>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
	</svelte:fragment>
	<div class="absolute w-full bottom-0 inset-x-0">
		<button on:click={drawerStore.open} class="flex w-16 h-16 variant-glass-tertiary">
			<svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24" fill="none">
				<path d="M8 16L12 20M12 20L16 16M12 20V8M4 4H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>
	<!-- Page Route Content	 -->
	<slot />
</AppShell>
