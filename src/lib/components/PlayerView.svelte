<script>
	import Book from './Book.svelte';

	let { data, details = $bindable() } = $props();

	let { playerShown, playerTextTheme, background, backgroundCarouselTheme } = $derived(details);


</script>

{#snippet snippetLeft(page)}
	{#if true}
		<section class="w-full mx-auto">
			<ul class="flex flex-row snap-x snap-mandatory overflow-x-auto h-screen container-snap">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<a
					class="shrink-0 snap-center bg-cover bg-center bg-no-repeat w-full"
					style="background-image:url({playerShown?.image})"
				>
				</a>
			</ul>
		</section>
	{:else}{/if}
{/snippet}
{#snippet snippetRight(page)}
	<div
		class="h-full flex flex-col items-center bg-center bg-cover bg-no-repeat rounded-lg text-center gap-10 justify-center preset-tonal-surface border border-surface-500"
		style="background-image:url({background})"
	>
		{#if playerShown}
			<p class="p-4 mt-20 preset-filled-surface-500 rounded-lg">{playerShown?.name}</p>
			<p class="w-1/2 p-4 preset-filled-surface-500 rounded-lg">
				{playerShown?.background.split('.')[0]}....
			</p>
		{/if}
	</div>
{/snippet}
<Book {data} {snippetLeft} {snippetRight} />
