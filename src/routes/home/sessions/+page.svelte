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
	class="absolute top-6 left-6 z-40 group"
	aria-label="Return to home"
>
	<div class="relative w-16 h-16 flex items-center justify-center">
	
		<div class="absolute inset-0 rounded-full border-2 border-amber-800/60 
		            group-hover:border-amber-600 transition-all duration-300
		            group-hover:shadow-lg group-hover:shadow-amber-900/50
		            bg-gradient-to-br from-amber-100/80 to-amber-200/60"></div>
		
	
		<svg
			class="w-8 h-8 relative z-10 text-amber-900 group-hover:text-amber-700 
			       transition-all duration-300 group-hover:-translate-x-1"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
		</svg>
		

		<div class="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-900/40 
		            group-hover:border-amber-700 transition-colors"></div>
		<div class="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-900/40 
		            group-hover:border-amber-700 transition-colors"></div>
	</div>
	

	<span class="absolute left-20 top-1/2 -translate-y-1/2 
	             bg-amber-900/90 text-amber-100 px-3 py-1 rounded
	             text-sm whitespace-nowrap
	             opacity-0 group-hover:opacity-100 transition-opacity duration-300
	             pointer-events-none"
	      style="font-family: 'Courgette', cursive;">
		Return to Table of Contents
	</span>
</a>

<Book {data} {snippetLeft} {snippetRight} textLeft={summaryLeft} textRight={summaryRight} />

{#snippet snippetLeft(page)}
	<main class="relative h-full overflow-auto">
		{#if page == 0}
			<div class="h-full flex items-center justify-center relative">
				<div
					class="absolute inset-0 bg-cover bg-center brightness-[0.20] opacity-90 
					       bg-[url('/images/ThePlanesEdited.png')]"
					alt="Planes revisioned"
				></div>
				<div class="relative z-10 text-center px-8">
					<h1 class="text-6xl mb-6 text-amber-100" style="font-family: 'Great Vibes', cursive; text-shadow: 3px 3px 6px rgba(0,0,0,0.8);">
						Session Chronicles
					</h1>
					<div class="text-amber-200 text-xl" style="font-family: 'Courgette', cursive; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
						<p class="mb-2">✦ ❖ ✦</p>
						<p>Turn the page to begin your journey</p>
						<p>through the recorded tales</p>
						<p class="mt-2">✦ ❖ ✦</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="w-full h-full px-6 py-8">
	
				<div class="text-center mb-6">
					<div class="inline-block relative">
						<h2 class="text-3xl tracking-wider" 
						    style="font-family: 'Great Vibes', cursive; color: #3d2817;">
							<span class="before:content-['✦'] before:absolute before:-left-8 before:top-1/2 before:-translate-y-1/2 before:text-xl
							           after:content-['✦'] after:absolute after:-right-8 after:top-1/2 after:-translate-y-1/2 after:text-xl">
								{summaryLeft[page]?.sessionNumber}
							</span>
						</h2>
					</div>
					<div class="h-1 w-24 mx-auto mt-2 bg-gradient-to-r from-transparent via-amber-800 to-transparent"></div>
				</div>


				<div class="prose prose-amber max-w-none">
					<div class="space-y-4">
						{#each summaryLeft[page]?.summary.split('/n') as sentence, index}
							<p class="text-justify leading-loose tracking-wide
							        {index === 0 ? 'first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1' : ''}
							        text-base"
							   style="font-family: 'Quicksand', sans-serif; color: #4a3728; text-indent: {index === 0 ? '0' : '2rem'};">
								{sentence}
							</p>
						{/each}
					</div>
				</div>


				<div class="mt-8 text-center">
					<div class="inline-block text-amber-800 text-xl">
						❖
					</div>
				</div>
			</div>
		{/if}
	</main>
{/snippet}

{#snippet snippetRight(page)}
	<main class="relative h-full overflow-auto">
		{#if page === summaryLeft.length - 1}
			<div class="h-full flex items-center justify-center relative">
				<div
					class="absolute inset-0 bg-cover bg-center brightness-[0.20] opacity-90 
					       bg-[url('/images/ThePlanesEdited.png')]"
					alt="Planes revisioned"
				></div>
				<div class="relative z-10 text-center px-8">
					<h1 class="text-6xl mb-6 text-amber-100" style="font-family: 'Great Vibes', cursive; text-shadow: 3px 3px 6px rgba(0,0,0,0.8);">
						To Be Continued...
					</h1>
					<div class="text-amber-200 text-xl" style="font-family: 'Courgette', cursive; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
						<p class="mb-2">✦ ❖ ✦</p>
						<p>The adventure awaits</p>
						<p>in the next session</p>
						<p class="mt-2">✦ ❖ ✦</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="w-full h-full px-6 py-8">
				<div class="text-center mb-6">
					<div class="inline-block relative">
						<h2 class="text-3xl tracking-wider" 
						    style="font-family: 'Great Vibes', cursive; color: #3d2817;">
							<span class="before:content-['✦'] before:absolute before:-left-8 before:top-1/2 before:-translate-y-1/2 before:text-xl
							           after:content-['✦'] after:absolute after:-right-8 after:top-1/2 after:-translate-y-1/2 after:text-xl">
								{summaryRight[page].sessionNumber}
							</span>
						</h2>
					</div>
					<div class="h-1 w-24 mx-auto mt-2 bg-gradient-to-r from-transparent via-amber-800 to-transparent"></div>
				</div>

	
				<div class="prose prose-amber max-w-none">
					<div class="space-y-4">
						{#each summaryRight[page].summary.split('/n') as sentence, index}
							<p class="text-justify leading-loose tracking-wide
							        {index === 0 ? 'first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1' : ''}
							        text-base"
							   style="font-family: 'Quicksand', sans-serif; color: #4a3728; text-indent: {index === 0 ? '0' : '2rem'};">
								{sentence}
							</p>
						{/each}
					</div>
				</div>

			
				<div class="mt-8 text-center">
					<div class="inline-block text-amber-800 text-xl">
						❖
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

	p:first-of-type::first-letter {
		font-family: 'Great Vibes', cursive;
		color: #8b4513;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		line-height: 0.8;
	}


	main::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: 
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 2px,
				rgba(139, 69, 19, 0.03) 2px,
				rgba(139, 69, 19, 0.03) 4px
			);
		pointer-events: none;
		z-index: 1;
	}

	main::-webkit-scrollbar {
		width: 8px;
	}

	main::-webkit-scrollbar-track {
		background: rgba(139, 69, 19, 0.1);
		border-radius: 4px;
	}

	main::-webkit-scrollbar-thumb {
		background: rgba(139, 69, 19, 0.4);
		border-radius: 4px;
	}

	main::-webkit-scrollbar-thumb:hover {
		background: rgba(139, 69, 19, 0.6);
	}

	@keyframes shimmer {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 1; }
	}

	h2 span::before,
	h2 span::after {
		animation: shimmer 3s ease-in-out infinite;
	}
</style>