<script>
	import DetailsComponent from './DetailsComponent.svelte';

	let { data, town } = $props();

	let selectedView = $state('image'); // 'image', 'details', 'events', 'population'
</script>

<div class="town-details-container">
	<div class="town-image-background">
		<img
			src={town?.image}
			alt={town?.name}
			class="town-background-img"
			class:dimmed={selectedView !== 'image'}
		/>
		<div class="town-image-overlay" class:visible={selectedView !== 'image'}></div>
	</div>

	{#if selectedView !== 'image'}
		<div class="town-content-area">
			<div class="town-scroll-content">

				<div class="town-header">
					<h1 class="town-name">{town?.name}</h1>
					<div class="town-divider">
						<span>✦ ❖ ✦</span>
					</div>
					{#if town?.capital}
						<p class="town-badge capital-badge">👑 Capital City</p>
					{:else if town?.port}
						<p class="town-badge port-badge">⚓ Port Town</p>
					{:else}
						<p class="town-badge settlement-badge">🏘️ Settlement</p>
					{/if}
				</div>

				{#if selectedView === 'details'}
					<DetailsComponent
						{data}
						details={town}
					/>
				{/if}


				{#if selectedView === 'events'}
					<div class="events-section">
						{#if town?.events}
							<div class="detail-item full-width">
								<div class="detail-icon">📖</div>
								<div>
									<h3 class="detail-title">Historical Events</h3>
									<p class="detail-content-main first-letter">{town.events}</p>
								</div>
							</div>
						{:else}
							<div class="empty-state">
								<p class="empty-text">No recorded events for this location</p>
							</div>
						{/if}
					</div>
				{/if}

				{#if selectedView === 'population'}
					<DetailsComponent
						{data}
						details={town}
					/>
				{/if}
			</div>
		</div>
	{/if}

	<div class="town-nav-sidebar">
		<button
			onclick={() => (selectedView = 'details')}
			class="nav-tab"
			class:active={selectedView === 'details'}
			aria-label="View details"
		>
			<span class="nav-icon">📜</span>
			<span class="nav-label">Details</span>
		</button>

		<button
			onclick={() => (selectedView = 'events')}
			class="nav-tab"
			class:active={selectedView === 'events'}
			aria-label="View events"
		>
			<span class="nav-icon">📖</span>
			<span class="nav-label">Events</span>
		</button>

		<button
			onclick={() => (selectedView = 'population')}
			class="nav-tab"
			class:active={selectedView === 'population'}
			aria-label="View population"
		>
			<span class="nav-icon">👥</span>
			<span class="nav-label">Population</span>
		</button>

		<button
			onclick={() => (selectedView = 'image')}
			class="nav-tab"
			class:active={selectedView === 'image'}
			aria-label="View image"
		>
			<span class="nav-icon">🖼️</span>
			<span class="nav-label">Image</span>
		</button>
	</div>
</div>

<style>
	.town-details-container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.town-image-background {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.town-background-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: filter 0.4s ease;
	}

	.town-background-img.dimmed {
		filter: brightness(0.4) blur(2px);
	}

	.town-image-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0);
		transition: background 0.4s ease;
		pointer-events: none;
	}

	.town-image-overlay.visible {
		background: rgba(0, 0, 0, 0.7);
	}

	.town-content-area {
		position: absolute;
		inset: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 8rem 4rem 4rem;
		animation: fadeIn 0.4s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.town-scroll-content {
		width: 100%;
		max-width: 900px;
		height: 100%;
		overflow-y: auto;
		background: linear-gradient(135deg, rgba(245, 230, 211, 0.95), rgba(240, 221, 193, 0.95));
		border-radius: 1rem;
		padding: 3rem;
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.6),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		border: 2px solid rgba(139, 105, 20, 0.4);
	}

	.town-header {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid rgba(139, 105, 20, 0.3);
	}

	.town-name {
		font-family: 'Great Vibes', cursive;
		font-size: 3.5rem;
		color: #3d2817;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	.town-divider {
		color: #8b6914;
		font-size: 1.5rem;
		margin: 1rem 0;
	}

	.town-badge {
		display: inline-block;
		padding: 0.5rem 1.5rem;
		border-radius: 9999px;
		font-family: 'Courgette', cursive;
		font-size: 1rem;
		margin-top: 1rem;
	}

	.capital-badge {
		background: linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(185, 28, 28, 0.2));
		border: 2px solid rgba(220, 38, 38, 0.4);
		color: #7f1d1d;
	}

	.port-badge {
		background: linear-gradient(135deg, rgba(8, 145, 178, 0.2), rgba(6, 95, 116, 0.2));
		border: 2px solid rgba(8, 145, 178, 0.4);
		color: #164e63;
	}

	.settlement-badge {
		background: linear-gradient(135deg, rgba(202, 138, 4, 0.2), rgba(161, 98, 7, 0.2));
		border: 2px solid rgba(202, 138, 4, 0.4);
		color: #713f12;
	}

	.events-section,
	.details-section {
		padding: 1rem 0;
	}

	.detail-item {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.detail-item.full-width {
		flex-direction: row;
		align-items: flex-start;
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

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
	}

	.empty-text {
		font-family: 'Courgette', cursive;
		font-size: 1.125rem;
		color: #7d6d5d;
		font-style: italic;
	}

	/* Navigation Sidebar */
	.town-nav-sidebar {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		z-index: 20;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem 0;
	}

	.nav-tab {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		padding-right: 1rem;
		background: linear-gradient(135deg, rgba(139, 69, 19, 0.9), rgba(101, 48, 10, 0.9));
		border: 2px solid rgba(212, 175, 55, 0.6);
		border-right: none;
		border-radius: 1.5rem 0 0 1.5rem;
		color: #fef3c7;
		font-family: 'Courgette', cursive;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
	}

	.nav-tab:hover {
		background: linear-gradient(135deg, rgba(180, 83, 9, 1), rgba(139, 69, 19, 1));
		border-color: rgba(251, 191, 36, 0.8);
		transform: translateX(-8px);
		box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
	}

	.nav-tab.active {
		background: linear-gradient(135deg, rgba(251, 191, 36, 0.95), rgba(245, 158, 11, 0.95));
		border-color: rgba(217, 119, 6, 0.8);
		color: #3d2817;
		transform: translateX(-12px);
		box-shadow: 0 8px 24px rgba(251, 191, 36, 0.5);
	}

	.nav-icon {
		font-size: 1.5rem;
	}

	.nav-label {
		font-size: 1rem;
		font-weight: 600;
	}

	.town-scroll-content::-webkit-scrollbar {
		width: 8px;
	}

	.town-scroll-content::-webkit-scrollbar-track {
		background: rgba(139, 69, 19, 0.1);
		border-radius: 4px;
	}

	.town-scroll-content::-webkit-scrollbar-thumb {
		background: rgba(139, 69, 19, 0.4);
		border-radius: 4px;
	}

	.town-scroll-content::-webkit-scrollbar-thumb:hover {
		background: rgba(139, 69, 19, 0.6);
	}
</style>
