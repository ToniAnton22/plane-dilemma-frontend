
<script>
	import {getDrawerStore} from "@skeletonlabs/skeleton"
	import {tick} from 'svelte'
	import {fade} from 'svelte/transition'
	import DrawerData from "$lib/components/DrawerData.svelte";
	import Mist from "$lib/components/Mist.svelte";
	import UnmuteModal from "$lib/components/UnmuteModal.svelte";
	import {onMount} from "svelte"
	import {audioData} from "$lib/data/audioData.js"
	import {playTrack,audioMuted} from "$lib/helpers/setAudio.js"
	import {themeSong} from "$lib/themeSong.js"
	import { getModalStore } from '@skeletonlabs/skeleton';
	export let data
	let visible = true 
	const toggleVis = () =>{
		if(data){
			visible=false
			return
		}
		if (visible){
			visible = false
		}else{
			visible=true
		}
	}
	const modalComponent = {ref: UnmuteModal}
	const modal = {
		type:"component",
		component: modalComponent,
	}
	const modalStore = getModalStore()
	if($audioMuted){
		modalStore.trigger(modal)
	}

	onMount(() =>{

		playTrack(audioData[$themeSong].url)
		
	})

 
	const drawerStore = getDrawerStore()
    const settings  = {id:'0'}
	
	drawerStore.set(settings)

	
</script>

<div class="h-full mx-0 p-0 flex justify-center items-center w-full bg-no-repeat bg-cover absolute bg-center -z-20
brightness-[0.6] avatar-animation" style="background-image: url('/images/background2.webp');">
	<div class="absolute top-[90px] right-[545px] w-2 h-0 rounded-full glow avatar-animation">

	</div>
	<div class="absolute top-[90px] left-[545px] w-2 h-0 rounded-full glow avatar-animation">

	</div>
	<div class="absolute bottom-[210px] right-[530px] w-2 h-0 rounded-full glow avatar-animation">

	</div>
	<div class="absolute bottom-[210px] left-[535px] w-2 h-0 rounded-full glow avatar-animation">

	</div>
</div>

<div class="h-full mx-0 p-0 flex justify-center items-center w-full" >
	{#if data.open}
	<div class="absolute space-y-10 w-64 top-64 text-center flex flex-col items-center z-35 avatar-animation">
		<p class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-gray-300 uppercase text-xl">Welcome to Plane Dilemma</p>
		<a class="absolute btn bg-gradient-to-r from-slate-400 to-indigo-300 text-sm inset-x-50 right-0" href="/home">Explore</a>
	</div>



{/if}
	

</div>

<style lang="postcss">
	
    .avatar-animation{ 
        animation-name:custom-animation;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-direction:alternate;
        animation-timing-function:ease-in-out;
        background-size: cover;
		transition: transform 2s;
		filter:brightness(90%)
    }
	.glow{
		box-shadow:
		0 0 60px 40px #f7da9ba9,  /* inner white */
		0 0 100px 70px #d49b1fc9, /* middle magenta */
		0 0 140px 110px #e28242c2; /* outer cyan */
		filter: brightness(150%);
		animation-duration: 5s;
		animation-iteration-count: infinite;
		animation-name: glow-effect;
	}

	@keyframes glow-effect{
		0%{
			filter:brightness(120%);
			transform:scale(1)
		}
		25%{
			filter:brightness(130%);
			transform:scale(1.3)
		}
		50%{
			transform: scale(1);
		}
		75%{
			filter:brightness(150%);
			transform:scale(1.3)
		}
		100%{
			filter:brightness(160%);
			transform:scale(1)
		}
	}

	@keyframes custom-animation{
        0%{
          
			transfrom:translate(0);
            transform:translate(12px,2%);
			transform:scale(1.01)
			
        }
        25%{
    
        }
        50%{

        }
        100%{

			transform:translate(-12px,-2%);
			transform: scale(1);
		
        }
    }

</style>
