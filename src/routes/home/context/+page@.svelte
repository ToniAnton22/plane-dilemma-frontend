<script>
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import ModalComponent from '$lib/components/ModalComponent.svelte';

	const getGridDimensions = (cell) => {
		return {
			rows: Math.floor(window.innerHeight / cell / 2),
			cols: Math.floor(window.innerWidth / cell)
		};
	};

	$effect(() => {});
	function makeGridStyles(cell) {
		return `grid-template-columns: repeat(${getGridDimensions(cell).cols}, ${cell}px); grid-template-rows: repeat(${getGridDimensions(cell).rows}, ${cell}px);`;
	}

	const cell = 120;
	let { data: serverData } = $props();
	let filter = $state('');

	let data = $state.raw(serverData.data);
	let page = $state(1);
	let pageSize = 9;
	let pageCount = $derived.by(() => {
		return Math.ceil(data.length / pageSize);
	});
	let dims = $derived.by(() => {
		return getGridDimensions(cell);
	});

	let gridStyle = $derived(makeGridStyles(cell));

	let positions = $derived.by(() => {
		const totalSlots = dims.rows * dims.cols;

		const indices = randomIndices(totalSlots, filteredContent.length);

		return indices.map((i) => {
			const { row, col } = indexToCoord(i, dims.cols);
			return {
				row: row,
				col: col
			};
		});
	});
	let filteredContent = $derived.by(() => {

		if (filter.length < 3 || !filter) {
			return data.slice((page - 1) * pageSize, pageSize * (page -1) + pageSize);
		} else if (filter.length > 2) {
			return data
				.filter((p) => {
					return (
						p.name.toLowerCase().includes(filter.toLowerCase()) ||
						p.description.toLowerCase().includes(filter.toLowerCase())
					);
				})
				.slice((page - 1) * pageSize, pageSize * (page -1) + pageSize);
		}
	});

	$effect(() => {
		if (data) {
			filteredContent = data.slice((page - 1) * pageSize, pageSize * (page -1) + pageSize);
		}
	});

	function nextPage() {
		if (page < pageCount) page += 1;
		else page = 1; // wrap (optional)
	}

	function previousPage() {
		if (page > 1) page -= 1;
		else page = pageCount; // wrap (optional)
	}

	function randomIndices(total, k = 10) {
		const set = new Set();
		k = Math.min(k, total);
		if (!total) {
			return [];
		}
		while (set.size < k) {
			set.add(Math.floor(Math.random() * total));
		}
		return [...set];
	}

	function indexToCoord(idx, cols) {
		return {
			col: (idx % cols) + 1,
			row: Math.floor(idx / cols) + 1
		};
	}
</script>

<img
	src="/images/yonal-writing.png"
	class="absolute w-full h-full bg-cover bg-scroll -z-10 brightness-50"
	alt="Yonal writing"
/>
<div class="flex justify-between flex-col w-screen h-full p-4">
	<div
		class="opacity-80 flex flex-row relative w-full h-16 p-4 bg-primary-500/25 rounded-lg shadow-md justify-between items-center gap-4"
	>
		<!-- <button class="flex flex-initial flex-col preset-tonal-surface border border-surface-500 p-5 shadow-md gap-y-3.5 items-center justify-center hover:bg-green-200 hover:text-stone-600"onclick={() => drawerStore.open(drawerStore.id)}>Select content</button> -->
		<a href="/home" class="w-12 h-12 hover:pointer z-20">
			<svg
				aria-hidden="true"
				fill="none"
				stroke="currentColor"
				text-decoration="Home"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"
				></path>
			</svg>
		</a>
		<input class="basis-full" placeholder="Search for info" bind:value={filter} />
	</div>

	<div class="grid p-4 gap-12 basis-1xs w-full" style={gridStyle}>
		{#each filteredContent as item, i}
			<ModalComponent
				title={item.name}
				content={item.description}
				footer={item.type}
				styles={`grid-row:${positions[i].row}; grid-column:${positions[i].col};`}
			/>
		{/each}
	</div>
	<div class="w-full h-24 flex justify-between">
		<button onclick={previousPage} class="btn preset-filled-primary-200-800 h-12">
			Previous
		</button>
		<span> {page}/{pageCount}</span>
		<button onclick={nextPage} class="btn preset-filled-primary-200-800 h-12"> Next </button>
	</div>
</div>

<style lang="postcss">
	p {
		text-shadow: 2px 2px black;
	}
</style>
