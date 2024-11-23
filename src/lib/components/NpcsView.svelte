<script>
	import { Paginator } from '@skeletonlabs/skeleton';

	export let source;
	export let mapped;
	if (mapped) {
	}
	export let paginationSettings;
	$: paginatedSource = source.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

<div class="flex flex-row space-x-20">
	{#each paginatedSource as npc}
		<a
			href="/home/npcs/npc/details?detail={encodeURIComponent(JSON.stringify(npc))}"
			class="card flex p-4 w-96 h-96 bg-cover bg-center bg-no-repeat border-2 border-black rounded-2xl shadow-2xl"
			style="background-image:url({npc?.image})"
		>
			<div class="flex justify-end items-end aling-bottom">
				<h1 class="text-2xl text-white shadow-2xl text=shadow">{npc?.name}</h1>
			</div>
		</a>
	{/each}
</div>
<div class="table-container text-shadow text-zinc-300">
	<!-- Native Table Element -->

	<Paginator
		bind:settings={paginationSettings}
		showFirstLastButtons={true}
		showPreviousNextButtons={false}
		class="flex-initial"
	/>
</div>

<style lang="postcss">
	.text-shadow {
		text-shadow: 2px 2px 5px black;
	}
</style>
