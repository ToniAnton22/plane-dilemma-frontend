<script>
    import Controls from "$lib/components/Controls.svelte";
    import VolumeSlider from "$lib/components/VolumeSlider.svelte"
    import PlayList from "$lib/components/VolumeSlider.svelte"
    import { audioData } from "$lib/data/audioData.js";
    import {getDrawerStore} from "@skeletonlabs/skeleton"
    import {themeSong} from "$lib/themeSong.js"
    import {onDestroy, onMount} from "svelte"
    import { currentTrack, stopTrack, playTrack , volume} from '$lib/helpers/setAudio.js';
	import UnmuteModal from "./UnmuteModal.svelte";



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



<main class="absolute right-0 inset-y-[31rem] align-center z-40">
    <div class="self-end my-4 p-4 mx-auto">
        <Controls {isPlaying} on:playPause={playPauseAudio} />
		
        <VolumeSlider bind:vol on:input={adjustVol} />	
        <UnmuteModal/>
    </div>
    
</main>
