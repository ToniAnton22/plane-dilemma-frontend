<script>
	import ModalComponent from '$lib/components/ModalComponent.svelte';

	const getGridDimensions = (cell) => {
		return {
			rows: Math.floor(window.innerHeight / cell / 2),
			cols: Math.floor(window.innerWidth / cell/1.5)
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


<div class="fixed inset-0 -z-20 bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900">
	<img
		src="/images/yonal-writing.png"
		class="absolute w-full h-full object-cover opacity-30 mix-blend-overlay"
		alt="Yonal writing"
	/>

	<div class="particles"></div>
</div>

<div class="flex justify-between flex-col w-screen h-full p-6">

	<div class="memory-header">

		<a href="/home" class="back-button-ornate group" aria-label="Return to home">
			<div class="back-button-inner">
				<svg
					class="w-7 h-7 text-amber-100 group-hover:text-amber-50 transition-all duration-300 
					       group-hover:-translate-x-1"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			</div>
			<span class="back-tooltip">Return to Table of Contents</span>
		</a>


		<div class="search-container">
			<svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
			<input 
				class="search-input" 
				placeholder="Search the memories..." 
				bind:value={filter}
			/>
			<div class="search-glow"></div>
		</div>

		<h1 class="memory-title">
			<span class="title-ornament-left">✦</span>
			Memories & Lore
			<span class="title-ornament-right">✦</span>
		</h1>
	</div>


	<div class="grid p-4 gap-12 basis-1xs w-full relative" style={gridStyle}>
		{#each filteredContent as item, i}
			<ModalComponent
				title={item.name}
				content={item.description}
				footer={item.type}
				styles={`grid-row:${positions[i].row}; grid-column:${positions[i].col};`}
			/>
		{/each}
	</div>

	<div class="pagination-container">
		<button onclick={previousPage} class="pagination-btn pagination-btn-prev">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			<span>Previous</span>
		</button>
		
		<div class="page-counter">
			<span class="page-number">{page}</span>
			<span class="page-separator">/</span>
			<span class="page-total">{pageCount}</span>
		</div>
		
		<button onclick={nextPage} class="pagination-btn pagination-btn-next">
			<span>Next</span>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>
</div>

<style lang="postcss">
	/* Floating particles background effect */
	.particles {
		position: absolute;
		width: 100%;
		height: 100%;
		background-image: 
			radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.3), transparent),
			radial-gradient(2px 2px at 60% 70%, rgba(147, 197, 253, 0.3), transparent),
			radial-gradient(1px 1px at 50% 50%, rgba(196, 181, 253, 0.3), transparent),
			radial-gradient(2px 2px at 80% 10%, rgba(255, 255, 255, 0.3), transparent),
			radial-gradient(1px 1px at 90% 60%, rgba(147, 197, 253, 0.3), transparent);
		background-size: 200% 200%;
		animation: float 20s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { background-position: 0% 0%; opacity: 0.3; }
		50% { background-position: 100% 100%; opacity: 0.6; }
	}

	.memory-header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
		position: relative;
	}

	.back-button-ornate {
		position: absolute;
		top: 0;
		left: 0;
		width: 3.5rem;
		height: 3.5rem;
		z-index: 30;
	}

	.back-button-inner {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(217, 119, 6, 0.9), rgba(180, 83, 9, 0.9));
		border: 2px solid rgba(245, 158, 11, 0.6);
		border-radius: 50%;
		box-shadow: 
			0 4px 12px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		transition: all 0.3s ease;
		position: relative;
	}

	.back-button-inner::before,
	.back-button-inner::after {
		content: '';
		position: absolute;
		width: 6px;
		height: 6px;
		border: 2px solid rgba(245, 158, 11, 0.6);
		transition: all 0.3s ease;
	}

	.back-button-inner::before {
		top: -3px;
		left: -3px;
		border-right: none;
		border-bottom: none;
	}

	.back-button-inner::after {
		bottom: -3px;
		right: -3px;
		border-left: none;
		border-top: none;
	}

	.back-button-ornate:hover .back-button-inner {
		background: linear-gradient(135deg, rgba(245, 158, 11, 1), rgba(217, 119, 6, 1));
		box-shadow: 
			0 6px 20px rgba(245, 158, 11, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
		transform: scale(1.05);
	}

	.back-tooltip {
		position: absolute;
		left: 4.5rem;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(28, 25, 23, 0.95);
		color: #fef3c7;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-family: 'Courgette', cursive;
		font-size: 0.875rem;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
	}

	.back-button-ornate:hover .back-tooltip {
		opacity: 1;
	}

	.memory-title {
		font-family: 'Great Vibes', cursive;
		font-size: 3rem;
		text-align: center;
		color: #fef3c7;
		text-shadow: 
			0 0 20px rgba(251, 191, 36, 0.5),
			0 0 40px rgba(251, 191, 36, 0.3),
			2px 2px 4px rgba(0, 0, 0, 0.8);
		margin: 1rem 0;
		letter-spacing: 0.1em;
	}

	.title-ornament-left,
	.title-ornament-right {
		display: inline-block;
		font-size: 2rem;
		animation: pulse-glow 3s ease-in-out infinite;
	}

	.title-ornament-left {
		margin-right: 1rem;
	}

	.title-ornament-right {
		margin-left: 1rem;
		animation-delay: 1.5s;
	}

	@keyframes pulse-glow {
		0%, 100% { 
			opacity: 0.6;
			text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
		}
		50% { 
			opacity: 1;
			text-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
		}
	}

	.search-container {
		position: relative;
		max-width: 600px;
		margin: 0 auto;
		width: 100%;
	}

	.search-icon {
		position: absolute;
		left: 1.25rem;
		top: 50%;
		transform: translateY(-50%);
		width: 1.5rem;
		height: 1.5rem;
		color: #fbbf24;
		z-index: 2;
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: 1rem 1.5rem 1rem 3.5rem;
		background: rgba(30, 27, 75, 0.6);
		border: 2px solid rgba(139, 92, 246, 0.3);
		border-radius: 9999px;
		color: #fef3c7;
		font-family: 'Courgette', cursive;
		font-size: 1.125rem;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
		box-shadow: 
			0 4px 15px rgba(0, 0, 0, 0.3),
			inset 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.search-input::placeholder {
		color: rgba(254, 243, 199, 0.5);
		font-style: italic;
	}

	.search-input:focus {
		outline: none;
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(30, 27, 75, 0.8);
		box-shadow: 
			0 0 30px rgba(251, 191, 36, 0.3),
			0 4px 15px rgba(0, 0, 0, 0.4),
			inset 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.search-glow {
		position: absolute;
		inset: -2px;
		background: linear-gradient(90deg, 
			rgba(251, 191, 36, 0.1),
			rgba(139, 92, 246, 0.1),
			rgba(251, 191, 36, 0.1)
		);
		border-radius: 9999px;
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
		z-index: -1;
	}

	.search-input:focus ~ .search-glow {
		opacity: 1;
		animation: glow-pulse 2s ease-in-out infinite;
	}

	@keyframes glow-pulse {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 0.6; }
	}

	.pagination-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 2rem;
		background: rgba(30, 27, 75, 0.6);
		border: 2px solid rgba(139, 92, 246, 0.3);
		border-radius: 1rem;
		backdrop-filter: blur(10px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
		margin-top: 2rem;
	}

	.pagination-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, rgba(217, 119, 6, 0.9), rgba(180, 83, 9, 0.9));
		border: 2px solid rgba(245, 158, 11, 0.6);
		border-radius: 9999px;
		color: #fef3c7;
		font-family: 'Courgette', cursive;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 
			0 4px 12px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	.pagination-btn:hover {
		background: linear-gradient(135deg, rgba(245, 158, 11, 1), rgba(217, 119, 6, 1));
		border-color: rgba(251, 191, 36, 0.8);
		transform: translateY(-2px);
		box-shadow: 
			0 6px 20px rgba(245, 158, 11, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.pagination-btn:active {
		transform: translateY(0);
	}

	.page-counter {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 2rem;
		background: rgba(0, 0, 0, 0.4);
		border: 2px solid rgba(251, 191, 36, 0.3);
		border-radius: 9999px;
		font-family: 'Courgette', cursive;
		font-size: 1.25rem;
		color: #fef3c7;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
	}

	.page-number {
		font-size: 1.5rem;
		font-weight: bold;
		color: #fbbf24;
		text-shadow: 
			0 0 10px rgba(251, 191, 36, 0.5),
			0 2px 4px rgba(0, 0, 0, 0.8);
	}

	.page-separator {
		color: rgba(254, 243, 199, 0.5);
	}

	.page-total {
		color: #fef3c7;
	}

	p {
		text-shadow: 2px 2px black;
	}
</style>