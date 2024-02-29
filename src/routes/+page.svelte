
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

<div class="h-full mx-0 p-0 flex justify-center items-center w-full bg-no-repeat bg-cover absolute -z-20
brightness-[0.6] avatar-animation" style="background-image: url('/images/plane-dillema.jpg');">

</div>

<div class="h-full mx-0 p-0 flex justify-center items-center w-full" >
	{#if data.open}
	<div class="absolute space-y-10 text-center flex flex-col items-center z-35">
		<h2 class="h1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-gray-300 uppercase ">Welcome to Plane Dilemma</h2>
		<a class="btn bg-gradient-to-r from-slate-400 to-indigo-300" href="/home">Explore</a>
	</div>

	{#await tick()}
		<div in:fade class="absolute w-screen h-screen overflow-hidden hide-scrollbar bg-black z-40">
			<div out:fade={{delay:2700,duration:1000}} class="grid w-full h-full items-center justify-center p-10 m-4">
				<h1 class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-gray-300 uppercase text-5xl text-center">"Roll the dice of fate, for in the realm of imagination, every outcome is a story waiting to be told."</h1>
			</div>
		</div>
	{:then} 

	{/await}
	{#if visible}
		<div out:fade={{delay:4000, duration:3000}} class="absolute w-screen h-screen overflow-hidden hide-scrollbar bg-black z-20 transition-opacity">
			<div out:fade={{delay:2700,duration:1000}} class="grid w-full h-full items-center justify-center p-10 m-4">
				<h1 class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-gray-300 uppercase text-5xl text-center">"Roll the dice of fate, for in the realm of imagination, every outcome is a story waiting to be told."</h1>
			</div>
			{toggleVis()}
		</div>		
	{/if}


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
    }
	@keyframes custom-animation{
        0%{
            filter:blur(0px);
            filter:saturate(70%);
          
			transfrom:translate(0);
            filter:hue-rotate(5deg);
            transform:scale(1);
            filter:brightness(80%)
        }
        25%{
            filter:saturate(90%);
            filter:hue-rotate(25deg);
            filter:brightness(80%)
        }
        50%{
            filter:saturate(110%);
            filter:hue-rotate(15deg);
            filter:brightness(85%)
        }
        100%{
            filter:blur(3px);
            filter:saturate(125%);
			transform:translate(100);
            filter:hue-rotate(5deg);
            transform: scale(1.03);
            filter:brightness(90%)
        }
    }

</style>
