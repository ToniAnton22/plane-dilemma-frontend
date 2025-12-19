<script>
	import { textSplit } from '$lib/splitText/splitText';
	import Book from './Book.svelte';

	let { data, details } = $props();

	let { playerShown, playerTextTheme, background, backgroundCarouselTheme } = $derived(details);
</script>

{#snippet snippetLeft(page)}
	<div class="player-portrait-page">
		<div class="character-portrait" style="background-image: url({playerShown?.image})">
			<div class="portrait-frame-overlay"></div>
		</div>

		<div class="character-nameplate">
			<h1 class="character-name">{playerShown?.name}</h1>
			<div class="name-divider">✦ ❖ ✦</div>
			{#if playerShown?.class}
				<p class="character-class">{playerShown.class}</p>
			{/if}
			{#if playerShown?.race}
				<p class="character-race">{playerShown.race}</p>
			{/if}
		</div>

		{#if playerShown?.level || playerShown?.alignment}
			<div class="quick-stats">
				{#if playerShown?.level}
					<div class="stat-badge">
						<span class="stat-label">Level</span>
						<span class="stat-value">{playerShown.level}</span>
					</div>
				{/if}
				{#if playerShown?.alignment}
					<div class="stat-badge">
						<span class="stat-label">Alignment</span>
						<span class="stat-value">{playerShown.alignment}</span>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet snippetRight(page)}
	<div class="player-details-page" style="background-image: url({background})">
		<div class="details-overlay"></div>

		<div class="details-content">
			{#if playerShown?.background}
				{@const textSplit = playerShown.background.split('/n')}
				<div class="detail-section">
					<div class="section-header">
						<div class="section-icon">📜</div>
						<h2 class="section-title">Background</h2>
					</div>
					{#each textSplit as text}
						<p class="section-text first-letter">
							{text}
						</p>
						<br>
					{/each}
				</div>
			{/if}

			{#if playerShown?.personality}
				<div class="detail-section">
					<div class="section-header">
						<div class="section-icon">🎭</div>
						<h2 class="section-title">Personality</h2>
					</div>
					<p class="section-text">
						{playerShown.personality}
					</p>
				</div>
			{/if}

			{#if playerShown?.goals}
				<div class="detail-section">
					<div class="section-header">
						<div class="section-icon">🎯</div>
						<h2 class="section-title">Goals</h2>
					</div>
					<p class="section-text">
						{playerShown.goals}
					</p>
				</div>
			{/if}

			{#if playerShown?.bonds}
				<div class="detail-section">
					<div class="section-header">
						<div class="section-icon">🤝</div>
						<h2 class="section-title">Bonds</h2>
					</div>
					<p class="section-text">
						{playerShown.bonds}
					</p>
				</div>
			{/if}

			{#if playerShown?.flaws}
				<div class="detail-section">
					<div class="section-header">
						<div class="section-icon">⚠️</div>
						<h2 class="section-title">Flaws</h2>
					</div>
					<p class="section-text">
						{playerShown.flaws}
					</p>
				</div>
			{/if}
		</div>
	</div>
{/snippet}

<Book {data} {snippetLeft} {snippetRight} />

<style>

	.player-portrait-page {
		padding: 2rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		overflow-y: auto;
	}

	.character-portrait {
		position: relative;
		width: 280px;
		height: 380px;
		background-size: cover;
		background-position: center;
		border-radius: 1rem;
		box-shadow:
			0 12px 36px rgba(0, 0, 0, 0.5),
			inset 0 2px 8px rgba(0, 0, 0, 0.3);
		border: 4px solid #d4af37;
		overflow: hidden;
	}

	.portrait-frame-overlay {
		position: absolute;
		inset: -4px;
		border: 4px solid #d4af37;
		border-radius: 1rem;
		pointer-events: none;
	}

	.portrait-frame-overlay::before,
	.portrait-frame-overlay::after {
		content: '✦';
		position: absolute;
		color: #d4af37;
		font-size: 2rem;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
		animation: shimmer 3s ease-in-out infinite;
	}

	.portrait-frame-overlay::before {
		top: -16px;
		left: 50%;
		transform: translateX(-50%);
	}

	.portrait-frame-overlay::after {
		bottom: -16px;
		left: 50%;
		transform: translateX(-50%);
	}

	@keyframes shimmer {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}

	.character-nameplate {
		text-align: center;
		width: 100%;
	}

	.character-name {
		font-family: 'Great Vibes', cursive;
		font-size: 3rem;
		color: #3d2817;
		margin: 0 0 0.5rem 0;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	.name-divider {
		color: #8b6914;
		font-size: 1.5rem;
		margin: 0.75rem 0;
	}

	.character-class,
	.character-race {
		font-family: 'Courgette', cursive;
		font-size: 1.125rem;
		color: #5d5040;
		margin: 0.25rem 0;
	}

	.quick-stats {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		width: 100%;
	}

	.stat-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.75rem 1.5rem;
		background: rgba(212, 175, 55, 0.2);
		border: 2px solid rgba(139, 105, 20, 0.4);
		border-radius: 0.5rem;
		min-width: 100px;
	}

	.stat-label {
		font-family: 'Courgette', cursive;
		font-size: 0.875rem;
		color: #5d5040;
		margin-bottom: 0.25rem;
	}

	.stat-value {
		font-family: 'Quicksand', sans-serif;
		font-size: 1.25rem;
		font-weight: bold;
		color: #3d2817;
	}

	.player-details-page {
		position: relative;
		height: 100%;
		background-size: cover;
		background-position: center;
		overflow: hidden;
	}

	.details-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(245, 230, 211, 0.95) 0%,
			rgba(240, 221, 193, 0.92) 100%
		);
		backdrop-filter: blur(2px);
	}

	.details-content {
		position: relative;
		z-index: 10;
		height: 100%;
		overflow-y: auto;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.detail-section {
		background: rgba(255, 255, 255, 0.4);
		border-radius: 0.75rem;
		padding: 1.5rem;
		border: 1px solid rgba(139, 105, 20, 0.2);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.section-icon {
		font-size: 1.75rem;
		filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
	}

	.section-title {
		font-family: 'Courgette', cursive;
		font-size: 1.5rem;
		color: #3d2817;
		margin: 0;
		flex: 1;
		border-bottom: 2px solid rgba(139, 105, 20, 0.3);
		padding-bottom: 0.25rem;
	}

	.section-text {
		font-family: 'Quicksand', sans-serif;
		font-size: 1rem;
		color: #4a3728;
		line-height: 1.8;
		text-align: justify;
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


	.player-portrait-page::-webkit-scrollbar,
	.details-content::-webkit-scrollbar {
		width: 8px;
	}

	.player-portrait-page::-webkit-scrollbar-track,
	.details-content::-webkit-scrollbar-track {
		background: rgba(139, 69, 19, 0.1);
		border-radius: 4px;
	}

	.player-portrait-page::-webkit-scrollbar-thumb,
	.details-content::-webkit-scrollbar-thumb {
		background: rgba(139, 69, 19, 0.4);
		border-radius: 4px;
	}

	.player-portrait-page::-webkit-scrollbar-thumb:hover,
	.details-content::-webkit-scrollbar-thumb:hover {
		background: rgba(139, 69, 19, 0.6);
	}
</style>
