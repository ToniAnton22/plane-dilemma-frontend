<script>
 import { derived } from 'svelte/store';
  import { browser } from '$app/environment';
  import DrawerData from './DrawerData.svelte';

  let audio;

  // Create a derived store to handle client-side specific logic

    $effect(() =>{
        audio = new Audio()
        audio.muted = true
        return () =>{
                if(audio){
                audio.pause()
            }
        }
    })

    // $: if ($currentTrack && $currentTrack.url && audio ) {
    //     if (audio) {
    //     audio.pause();
    //     }
    //     audio.src= $currentTrack.url        
    //     if ($currentTrack.playing) {
    //         audio.play()
    //     }
    // } else if (audio) {
    //     audio.pause();
    // }

    // $: if(audio){
    //     audio.volume = $volume /100
    // }

    // $: audioMuted.subscribe(value =>{
    //     if (audio){
    //         audio.muted = value;
        
    //         if(!value){
    //             if(audio.paused){
    //                 audio.play().then().catch(error =>{console.log(error)})
    //             }
    //         }
    //     }
    // })


</script>