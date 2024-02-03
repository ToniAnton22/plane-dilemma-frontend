<script>
 import { derived } from 'svelte/store';
  import { browser } from '$app/environment';
  import { currentTrack } from '$lib/helpers/setAudio.js';
  import { onDestroy, onMount } from 'svelte';
  import DrawerData from './DrawerData.svelte';
  import {volume} from '$lib/helpers/setAudio.js'

  let audio;

  // Create a derived store to handle client-side specific logic

    onMount(() =>{
        audio = new Audio()
    })

$: if ($currentTrack && $currentTrack.url && audio ) {
    if (audio) {
    audio.pause();
    }
    audio.src= $currentTrack.url
    
    if ($currentTrack.playing) {
    audio.play();
    }
} else if (audio) {
    audio.pause();
}



onDestroy(() =>{
    if(audio){
        audio.pause()
    }
})


</script>