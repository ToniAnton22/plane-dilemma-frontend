<script>
	import { Pagination } from '@skeletonlabs/skeleton-svelte';
	import NpcPage from './NpcPage.svelte';

	let { source, mapped = true, limit, page, count } = $props();

	let sourceData = $derived.by(() => {
		if (source) {
			return source.slice((page - 1) * limit, page * limit);
		}
		return [];
	});
	if (mapped) {
	}
</script>

<div class="flex flex-row space-x-20">
	{#each sourceData as npc}

		<NpcPage {npc}/>
	{/each}
</div>
<div class="table-container text-shadow text-zinc-300">
	<Pagination
		data={source}
		{count}
		{page}
		onPageChange={(e) => (page = e.page)}
		onPageSizeChange={(e) => (size = e.pageSize)}
		pageSize={limit}
		class="flex-initial"
	/>
</div>

<style lang="postcss">
	.text-shadow {
		text-shadow: 2px 2px 5px black;
	}
</style>
