<script>
	let { data = {}, snippetLeft, snippetRight, textLeft = {}, textRight = {} } = $props();
	let page = $state(1);
	let pageCount = $derived.by(() => {
		return Math.ceil((textLeft.length + textRight.length) / 2) || 1;
	});

	function nextPage() {
		if (page < pageCount) {
			page += 1;
		} else {
			page = 1;
		}
	}
	function prevPage() {
		if (page > 1) {
			page -= 1;
		} else {
			page = pageCount;
		}
	}
	function selectPage(n) {
		page = n;
	}
</script>

<div class="book">
	<button class="edge-left" onclick={prevPage}></button>
	<div class="content-left">
		{@render snippetLeft(page - 1)}
	</div>
	<div class="divider"></div>
	<div class="content-right">
		{@render snippetRight(page - 1)}
	</div>
	<button class="edge-right" onclick={nextPage}> </button>
	{#if pageCount > 1}
		<select
			class="absolute top-5 right-14 0 mx-auto z-50 w-28 h-12 rounded-full btn preset-filled-secondary-400-600 text-stone-200 text-bold text-center"
			bind:value={page}
		>
			{#each textLeft as _, index}
				<option value={index + 1} selected={index === page}>{`Page ${index + 1}`}</option>
			{/each}
		</select>
	{/if}
</div>

<style>
</style>
