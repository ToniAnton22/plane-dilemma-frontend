<script>
	import OpenAI from 'openai';
	import quicksort from '$lib/quicksort';
	import Book from '$lib/components/Book.svelte';

	let { data } = $props();
	let state = $state('fixed');
	let buttonColor = $state('bg-linear-to-br from-primary-500 to-secondary-500');
	let isVisibile = $state(false);
	let isImage = $state(true);
	
	let openai;
	let { summaryLeft, summaryRight } = $derived.by(() => {
		const left = [true];
		const right = [];
		data.sessions.map((session, index) => {
			if (index % 2 === 1) {
				left.push(session);
			} else {
				right.push(session);
			}
		});
		return { summaryLeft: left, summaryRight: right };
	});


	function toggleTable() {
		if (isVisibile) {
			isVisibile = false;
			buttonColor = 'bg-linear-to-br from-primary-500 to-secondary-500';
			state = 'fixed';
		} else {
			isVisibile = true;
			buttonColor = 'bg-linear-to-br from-warning-500 to-error-500';
			state = 'absolute';
		}
	}

	$effect(() => {});
	let summariesSorted = data.sessions.sort((a, b) => {
		const titleA = a.sessionNumber;
		const titleB = b.sessionNumber;

		return titleA - titleB;
	});
	async function playSessions(text) {}
</script>

<a
	href="/home"
	class="absolute top-0 left-1 w-[5vw] h-[10vh] m-3 md:w-12 md:h-12 z-40 hover:pointer"
>
	<svg
		aria-hidden="true"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"
		></path>
	</svg>
</a>
<Book {data} {snippetLeft} {snippetRight} textLeft={summaryLeft} textRight={summaryRight} />

{#snippet snippetLeft(page)}
	<main class="relative">
		{#if page == 0}
			<div
				class="absolute bg-cover bg-left brightness-[0.25] opacity-80 h-screen bg-[url('/images/ThePlanesEdited.png')] w-full"
				alt="Planes revisioned"
			></div>
		{:else}
			<div class="w-full relative variant-ghost-error">
				<h2 class="mx-auto right-0 left-0 text-xl underline mt-2 text-center">
					{summaryLeft[page]?.sessionNumber}
				</h2>

				<div class=" text-zinc-400 items-center text-md overflow-scroll">
					<div class="flex flex-col mx-5">
						{#each summaryLeft[page]?.summary.split('/n') as sentence}
							<p
								class="text-start leading-relaxed font-bold first-letter:text-3xl text-sm font-mono first-letter:font-courgette courgette z-20 pb-3 indent-10"
							>
								{sentence}
							</p>
						{/each}
						<button class="w-64 h-64" onclick={playSessions(summaryLeft[page])}></button>
					</div>
				</div>
			</div>
		{/if}
	</main>
{/snippet}
{#snippet snippetRight(page)}
	<main class="relative">
		{#if page === summaryLeft.length - 1}
			<div
				class="absolute bg-cover bg-right brightness-[0.25] opacity-80 h-screen bg-[url('/images/ThePlanesEdited.png')] w-full"
				alt="Planes revisioned"
			></div>
		{:else}
			<div class="w-full relative variant-ghost-error">
				<h2 class="mx-auto right-0 left-0 text-xl underline mt-2 text-center">
					{summaryRight[page].sessionNumber}
				</h2>
				<div class=" text-zinc-400 items-center text-md overflow-scroll">
					<div class="flex flex-col mx-5">
						{#each summaryRight[page].summary.split('/n') as sentence}
							<p
								class="text-start leading-relaxed font-bold first-letter:text-3xl font-mono first-letter:font-courgette courgette z-20 pb-3 indent-10"
							>
								{sentence}
							</p>
						{/each}
						<button class="w-64 h-64" onclick={playSessions(summaryRight[page])}></button>
					</div>
				</div>
			</div>
		{/if}
	</main>
{/snippet}

<style>
	.custom-stick {
		position: -webkit-sticky;
		position: sticky;
		height: min-content;
		top: 0;
	}
	.courgette::first-letter {
		font-family: Courgette;
		color: red;
	}
	p {
		text-shadow: 2px 2px black;
	}
</style>
