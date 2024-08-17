<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import DrawerData from '$lib/components/DrawerData.svelte';
	import Mist from '$lib/components/Mist.svelte';
	import {goto, invalidateAll} from "$app/navigation"
	import UnmuteModal from '$lib/components/UnmuteModal.svelte';
	import { onMount } from 'svelte';
	import { audioData } from '$lib/data/audioData.js';
	import { playTrack, audioMuted } from '$lib/helpers/setAudio.js';
	import { themeSong } from '$lib/themeSong.js';
	import { getModalStore } from '@skeletonlabs/skeleton';
	export let data;
	let visible = true;
	const toggleVis = () => {
		if (data) {
			visible = false;
			return;
		}
		if (visible) {
			visible = false;
		} else {
			visible = true;
		}
	};
	const modalComponent = { ref: UnmuteModal };
	const modal = {
		type: 'component',
		component: modalComponent
	};
	const modalStore = getModalStore();
	if ($audioMuted) {
		modalStore.trigger(modal);
	}

	onMount(() => {
		playTrack(audioData[$themeSong].url);
	});
	const sendToContent= (url) =>{
		goto('/home')
	}
	const numberof= 2
	const drawerStore = getDrawerStore();
	const settings = { id: '0' };

	drawerStore.set(settings);
</script>

<div
	class="h-full mx-0 p-0 flex justify-center items-center w-screen bg-no-repeat bg-cover absolute bg-center -z-20
brightness-[0.6] avatar-animation"
	style="background-image: url('/images/background2.webp');"
>
	<div class="h-full w-full" />
</div>

<div class="h-full mx-0 p-0 flex justify-center items-center w-full">
	{#if data.open}
		<button
			class="absolute w-1/5 h-[53vh] top-[20vh] text-center z-35 glow"
			on:click={() =>sendToContent('/home')}
		>
			<p
				class="flex bg-clip-text h-full text-transparent bg-gradient-to-r from-indigo-300 to-gray-300 uppercase text-[1vw] items-center justify-center"
			>
				Lost history of Plane Dilemma
			</p>
		</button>
		<!-- {#await tick()}
			<div in:fade class="absolute w-screen h-screen overflow-hidden hide-scrollbar bg-black z-40">
				<div
					out:fade={{ delay: 2700, duration: 1000 }}
					class="grid w-full h-full items-center justify-center p-10 m-4"
				>
					<h1
						class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-gray-300 uppercase text-5xl text-center"
					>
						"Roll the dice of fate, for in the realm of imagination, every outcome is a story
						waiting to be told."
					</h1>
				</div>
			</div>
		{/await}
		{#if visible}
			<div
				out:fade={{ delay: 4000, duration: 3000 }}
				class="absolute w-screen h-screen overflow-hidden hide-scrollbar bg-black z-20 transition-opacity"
			>
				<div
					out:fade={{ delay: 2700, duration: 1000 }}
					class="grid w-full h-full items-center justify-center p-10 m-4"
				>
					<h1
						class="bg-clip-text text-transparent "
					>
						"Roll the dice of fate, for in the realm of imagination, every outcome is a story
						waiting to be told."
					</h1>
				</div>
				{toggleVis()}
			</div>
		{/if} -->
	{/if}
</div>

<style lang="scss">
	
	.avatar-animation {
		animation-name: custom-animation;
		animation-duration: 3s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		animation-timing-function: ease-in-out;
		background-size: cover;
		transition: transform 2s;
		filter: brightness(90%);
	}
	.glow {
		background-color: rgba(87, 41, 131, 0.582);		
		box-shadow: 0 0 1vh 1vh #4002a371, /* inner white */ 0 0 3vh 3vh #8e63d367,
			/* middle magenta */ 0 0 5vh 5vh #bda0eb8a; /* outer cyan */
		filter: brightness(150%);
		animation-duration: 5s;
		animation-iteration-count: infinite;
		animation-name: glow-effect;
	}
	.book-page{

	}

	@keyframes book-flip{
		0%{
			opacity: 1;
			transform: scale(0);
			
		}
		100%{
			opacity: 0;
			transform: scale(1);
		}
	}
	@keyframes glow-effect {
		0% {
			filter: brightness(100%);
			transform:scale(1);
			opacity: 0;

		}
		25% {


		}
		50% {
			filter:brightness(160%);
			transform:scale(1.01);
			opacity: 0.6;
		}
		75% {


		
		}
		100% {
			filter: brightness(100%);
			transform:scale(1);
			opacity: 0;
		}
	}

	@keyframes custom-animation {
		0% {
			transfrom: translate(0);
	
			transform: scale(1);
		}

		50% {
			transform: scale(1.01);
		}
		100% {
	
			transform: scale(1);
		}
	}
</style>
