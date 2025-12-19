<script>
	import NpcsView from './NpcsView.svelte';

	let { data, details } = $props();


	let npcsInLocation = $derived.by(() => {
		if (!data?.npcs || !details?.locationId) return [];
		return data.npcs.filter((npc) => npc.location == details.locationId);
	});
	let paginationSettings = $derived({
		page: 1,
		limit: 3,
		size: npcsInLocation?.length || 0,
		amounts: 5
	});
</script>

<div class="details-content">
	{#if details?.name || details?.elevation || details?.state}
		<div class="details-section">
			{#if details?.elevation}
				<div class="detail-item">
					<div class="detail-icon">⛰️</div>
					<div>
						<h3 class="detail-title">Elevation</h3>
						<p class="detail-content">{details.elevation}</p>
					</div>
				</div>
			{/if}

			{#if details?.state}
				<div class="detail-item">
					<div class="detail-icon">🗺️</div>
					<div>
						<h3 class="detail-title">Region</h3>
						<p class="detail-content">{details.state}</p>
					</div>
				</div>
			{/if}

			{#if details?.description}
				<div class="detail-item full-width">
					<div class="detail-icon">📜</div>
					<div style="flex: 1;">
						<h3 class="detail-title">Description</h3>
						<p class="detail-content-main first-letter">{details.description}</p>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Population Section -->
	{#if details?.population || details?.culture || details?.religion}
		<div class="details-section">
			{#if details?.population}
				<div class="detail-item">
					<div class="detail-icon">👥</div>
					<div>
						<h3 class="detail-title">Population</h3>
						<p class="detail-content">{details.population}</p>
					</div>
				</div>
			{/if}

			{#if details?.culture}
				<div class="detail-item">
					<div class="detail-icon">🎭</div>
					<div>
						<h3 class="detail-title">Culture</h3>
						<p class="detail-content">{details.culture}</p>
					</div>
				</div>
			{/if}

			{#if details?.religion}
				<div class="detail-item">
					<div class="detail-icon">⛪</div>
					<div>
						<h3 class="detail-title">Religion</h3>
						<p class="detail-content">{details.religion}</p>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	{#if details?.locationId}
		<div class="npcs-section">
			<div class="section-header-with-icon">
				<div class="detail-icon">🗣️</div>
				<h2 class="section-header">Notable Residents</h2>
			</div>

			{#if npcsInLocation.length > 0}
				<NpcsView source={npcsInLocation} {...paginationSettings} />
			{:else}
				<div class="empty-state-small">
					<p class="empty-text-small">No known residents have been recorded</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.details-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.details-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.detail-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.detail-item.full-width {
		flex-direction: row;
	}

	.detail-icon {
		font-size: 2rem;
		flex-shrink: 0;
		filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
	}

	.detail-title {
		font-family: 'Courgette', cursive;
		font-size: 1.25rem;
		color: #3d2817;
		margin: 0 0 0.5rem 0;
		border-bottom: 2px solid rgba(139, 105, 20, 0.3);
		padding-bottom: 0.25rem;
	}

	.detail-content {
		font-family: 'Quicksand', sans-serif;
		font-size: 1rem;
		color: #4a3728;
		line-height: 1.6;
		margin: 0;
	}

	.detail-content-main {
		font-family: 'Quicksand', sans-serif;
		font-size: 1rem;
		color: #4a3728;
		line-height: 1.8;
		text-align: justify;
		text-indent: 2rem;
		margin: 0;
	}

	.first-letter::first-letter {
		font-family: 'Great Vibes', cursive;
		font-size: 3.5rem;
		float: left;
		line-height: 0.8;
		margin-right: 0.5rem;
		margin-top: 0.25rem;
		color: #8b4513;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}

	.npcs-section {
		margin-top: 1rem;
		padding-top: 2rem;
		border-top: 2px solid rgba(139, 105, 20, 0.3);
	}

	.section-header-with-icon {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.section-header {
		font-family: 'Great Vibes', cursive;
		font-size: 2rem;
		color: #3d2817;
		margin: 0;
	}

	.empty-state-small {
		text-align: center;
		padding: 2rem;
		background: rgba(139, 105, 20, 0.1);
		border-radius: 0.5rem;
		border: 1px dashed rgba(139, 105, 20, 0.3);
	}

	.empty-text-small {
		font-family: 'Courgette', cursive;
		font-size: 1rem;
		color: #7d6d5d;
		font-style: italic;
		margin: 0;
	}
</style>
