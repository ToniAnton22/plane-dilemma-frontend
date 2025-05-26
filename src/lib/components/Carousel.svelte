<script>
	import Book from './Book.svelte';
	import { getTheme } from '$lib/helpers/getBackgroundTheme.js';
	import PlayerView from './PlayerView.svelte';
	import { page } from '$app/state';

	let { data } = $props();

	let active = $state('data-active');
	const changeImage = (i, player) => {
		return `carousel-item-${i}`;
	};

	let playersData = $derived.by(() => {
		return data.players;
	});

	let extractedIdFromUrl = $derived.by(() => {
		if(!page.url.hash){
			return 0
		}
		const regex = /(?<=-)[-\d]/g;
		const match = page.url.hash.match(regex);
		return match[0];
	});

	let playerShown = $derived(playersData[parseInt(extractedIdFromUrl)]);
	let details = $derived({
		background: '',
		playerTextTheme: '',
		backgroundCarouselTheme: '',
		playerShown
	});

	function changeTheme(player) {
		let themes = getTheme(player);
		details = {
			background: themes.background,
			playerTextTheme: themes.textTheme,
			backgroundCarouselTheme: themes.theme,
			playerShown: player
		};
	}
	$effect(() => {
		changeTheme(playerShown);
	});
</script>

<div
	class="absolute badge h-[10vh] lg:-top-[1vh] -top-[3.5vh] inset-x-0 p-4 mx-auto z-40 text-black"
>
	<div class="grid grid-cols-6 gap-4 w-full justify-items-center">
		{#each playersData as player, i}
			<a
				href="#carousel-item-{i}"
				class="transition h-[10vh] w-[4vw] ease-in delay-150 duration-200 opacity-75 border hover:opacity-100 hover:scale-110 rounded-b-full bg-cover bg-center"
				style="background-image:url({player?.image})"
				onclick={() => changeTheme(player)}
			>
			</a>
		{/each}
	</div>
</div>
<PlayerView {data} bind:details />

<style lang="scss">
	.container-snap::-webkit-scrollbar {
		display: none;
	}

	.container-snap {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
