<script>
    import Controls from "$lib/components/Controls.svelte";
    import VolumeSlider from "$lib/components/VolumeSlider.svelte"
    import PlayList from "$lib/components/VolumeSlider.svelte"
    import { audioData } from "$lib/data/audioData.js";
    import {getDrawerStore} from "@skeletonlabs/skeleton"
    import {themeSong} from "$lib/themeSong.js"
    import {onDestroy, onMount} from "svelte"
    import { currentTrack, stopTrack, playTrack , volume} from '$lib/helpers/setAudio.js';



    $: vol = $volume
    const drawerStore = getDrawerStore()
    $: isPlaying = $currentTrack.playing
    console.log(vol)
    const adjustVol = () => volume.set(vol)
    const playPauseAudio = () => {
    if (!isPlaying) {

        playTrack(audioData[$themeSong].url,volume)
     
    } else {

        stopTrack()
        console.log('here')
    }	 	
    }
   
    
  
</script>



<main class="grid w-full h-full align-center">
    <button class="w-6 h-6 md:w-12 md:h-12 m-2 md:m-6 hover:pointer z-40 top-0 right-0" on:click={drawerStore.close}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>  
    </button>
    <div class="self-end my-4 p-4 mx-auto">
        <Controls {isPlaying} on:playPause={playPauseAudio} />
		
        <VolumeSlider bind:vol on:input={adjustVol} />	
       
    </div>
    
</main>
