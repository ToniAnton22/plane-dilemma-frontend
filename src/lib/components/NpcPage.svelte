<script>
	import Book from './Book.svelte';

	let { npc } = $props();

	let visible = $state(false);
</script>

<button
	onclick={() => (visible = !visible)}
	class="card flex p-4 w-96 h-96 bg-cover bg-center bg-no-repeat border-2 border-black rounded-2xl shadow-2xl"
	style="background-image:url({npc?.image})"
>
	<div class="flex justify-end items-end aling-bottom">
		<h1 class="text-2xl text-white shadow-2xl text=shadow">{npc?.name}</h1>
	</div>
</button>
{#snippet snippetLeft()}
	<div class="flex flex-col items-center justify-center h-full">
		<img
			src={npc?.image}
			alt={npc?.name}
			class="w-64 h-64 object-cover rounded-lg shadow-lg mb-4"
		/>
		<h1 class="text-2xl font-bold text-gray-800">{npc?.name}</h1>
		<p class="text-gray-600 mt-2">{npc?.Role}</p>
	</div>
{/snippet}
{#snippet snippetRight()}
	<div class="flex flex-col items-start justify-start h-full p-4">
		<h2 class="text-xl font-semibold text-gray-800 mt-4">Details</h2>
		<p class="text-gray-600 mt-2">{npc?.description}</p>
		<h2 class="text-xl font-semibold text-gray-800 mt-4">Background</h2>
		<p class="text-gray-600 mt-2">
			{npc?.background ? npc.background : 'No bockground discovered'}
		</p>
	</div>
{/snippet}

{#if visible}
	<div class="absolute h-full w-full inset-0">
		<Book {snippetLeft} {snippetRight} />
	</div>
	<button
		class="absolute border-4 w-12 h-8 z-50 bg-red-400 text-zinc-500 border-amber-100 top-6 left-6"
		onclick={() => (visible = false)}>X</button
	>
{/if}
