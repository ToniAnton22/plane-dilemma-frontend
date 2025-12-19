<script>
	import Book from './Book.svelte';
	import { getTheme } from '$lib/helpers/getBackgroundTheme.js';
	import PlayerView from './PlayerView.svelte';
	import { page } from '$app/state';

	let { data } = $props();

	let selectorExpanded = $state(false);

	let playersData = $derived.by(() => {
		return data.players;
	});

	let extractedIdFromUrl = $derived.by(() => {
		if (!page.url.hash) {
			return 0;
		}
		const regex = /(?<=-)[-\d]/g;
		const match = page.url.hash.match(regex);
		return match ? parseInt(match[0]) : 0;
	});

	let playerShown = $derived(playersData[extractedIdFromUrl]);
	
	let details = $derived.by(() => {
		if (!playerShown) return {};
		let themes = getTheme(playerShown);
		return {
			background: themes.background,
			playerTextTheme: themes.textTheme,
			backgroundCarouselTheme: themes.theme,
			playerShown
		};
	});

	function toggleSelector() {
		selectorExpanded = !selectorExpanded;
	}
</script>

{#if !selectorExpanded}
	<div class="player-selector-compact">
		<button 
			class="selector-toggle-btn"
			onclick={toggleSelector}
			aria-label="Expand player selector"
		>
			<span class="toggle-icon">⚔️</span>
			<span class="toggle-text">The Adventurers</span>
			<span class="toggle-icon">⚔️</span>
		</button>
		
		<div class="compact-tabs">
			{#each playersData as player, i}
				<a
					href="#carousel-item-{i}"
					class="compact-tab"
					class:active={extractedIdFromUrl === i}
					style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url({player?.image})"
					title={player?.name}
				>
					<span class="compact-tab-initial">{player?.name.charAt(0)}</span>
				</a>
			{/each}
		</div>
	</div>
{/if}


{#if selectorExpanded}
	<div class="player-selector-expanded">
		<button 
			class="selector-close-btn"
			onclick={toggleSelector}
			aria-label="Collapse player selector"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<div class="expanded-content">
			<div class="expanded-title">
				<h2>
					<span class="title-ornament">⚔️</span>
					Choose Your Adventurer
					<span class="title-ornament">⚔️</span>
				</h2>
			</div>
			
			<div class="expanded-grid">
				{#each playersData as player, i}
					<a
						href="#carousel-item-{i}"
						class="expanded-card"
						class:active={extractedIdFromUrl === i}
						style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url({player?.image})"
						onclick={toggleSelector}
					>
						<div class="card-overlay"></div>
						<div class="card-content">
							<span class="card-name">{player?.name}</span>
							{#if player?.class}
								<span class="card-class">{player.class}</span>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}

<PlayerView {data} {details} />

<style>

	.player-selector-compact {
		position: absolute;
		bottom: 4rem;
		left: 14%;
		transform: translateX(-50%);
		z-index: 40;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.selector-toggle-btn {
		padding: 0.5rem 1.5rem;
		background: linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(101, 48, 10, 0.95));
		border: 2px solid rgba(212, 175, 55, 0.8);
		border-radius: 9999px;
		color: #fef3c7;
		font-family: 'Courgette', cursive;
		font-size: 1.125rem;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		visibility: hidden;
	}

	.selector-toggle-btn:hover {
		background: linear-gradient(135deg, rgba(180, 83, 9, 1), rgba(139, 69, 19, 1));
		transform: scale(1.05);
		box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
	}

	.toggle-icon {
		font-size: 1.25rem;
		animation: pulse-glow 3s ease-in-out infinite;
	}

	.toggle-icon:last-child {
		animation-delay: 1.5s;
	}

	.toggle-text {
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
	}

	@keyframes pulse-glow {
		0%, 100% { 
			opacity: 0.7;
			filter: drop-shadow(0 0 3px rgba(251, 191, 36, 0.5));
		}
		50% { 
			opacity: 1;
			filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.8));
		}
	}

	.compact-tabs {
		display: flex;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: rgba(28, 25, 23, 0.9);
		backdrop-filter: blur(10px);
		border-radius: 9999px;
		border: 2px solid rgba(212, 175, 55, 0.5);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
	}

	.compact-tab {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background-size: cover;
		background-position: center;
		border: 2px solid rgba(212, 175, 55, 0.6);
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
	}

	.compact-tab:hover {
		transform: scale(1.15);
		border-color: rgba(251, 191, 36, 0.9);
		box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
	}

	.compact-tab.active {
		border-color: rgba(251, 191, 36, 1);
		border-width: 3px;
		box-shadow: 
			0 4px 16px rgba(251, 191, 36, 0.6),
			inset 0 0 20px rgba(251, 191, 36, 0.2);
		transform: scale(1.2);
	}

	.compact-tab-initial {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Great Vibes', cursive;
		font-size: 1.5rem;
		color: #fef3c7;
		text-shadow: 
			0 2px 4px rgba(0, 0, 0, 0.9),
			0 0 10px rgba(0, 0, 0, 0.8);
		opacity: 0;
		transition: opacity 0.3s ease;
		background: rgba(0, 0, 0, 0.6);
	}

	.compact-tab:hover .compact-tab-initial {
		opacity: 1;
	}
	
	.player-selector-expanded {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.95);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.selector-close-btn {
		position: absolute;
		top: 2rem;
		right: 2rem;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(101, 48, 10, 0.95));
		border: 2px solid rgba(212, 175, 55, 0.8);
		border-radius: 50%;
		color: #fef3c7;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
	}

	.selector-close-btn:hover {
		background: linear-gradient(135deg, rgba(180, 83, 9, 1), rgba(139, 69, 19, 1));
		transform: rotate(90deg) scale(1.1);
		box-shadow: 0 8px 28px rgba(212, 175, 55, 0.5);
	}

	.expanded-content {
		width: 100%;
		max-width: 1200px;
		max-height: 90vh;
		overflow-y: auto;
		background: linear-gradient(135deg, rgba(245, 230, 211, 0.95), rgba(240, 221, 193, 0.95));
		border-radius: 1.5rem;
		padding: 3rem;
		border: 3px solid rgba(212, 175, 55, 0.8);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
		animation: slideIn 0.4s ease;
	}

	@keyframes slideIn {
		from { 
			opacity: 0;
			transform: translateY(-30px);
		}
		to { 
			opacity: 1;
			transform: translateY(0);
		}
	}

	.expanded-title {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 2px solid rgba(139, 105, 20, 0.3);
	}

	.expanded-title h2 {
		font-family: 'Great Vibes', cursive;
		font-size: 3rem;
		color: #3d2817;
		margin: 0;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	.title-ornament {
		display: inline-block;
		font-size: 2rem;
		color: #8b4513;
		margin: 0 1rem;
	}

	.expanded-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.5rem;
	}

	.expanded-card {
		position: relative;
		aspect-ratio: 2/3;
		background-size: cover;
		background-position: center;
		border-radius: 1rem;
		overflow: hidden;
		cursor: pointer;
		transition: all 0.3s ease;
		border: 3px solid rgba(139, 105, 20, 0.5);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
	}

	.expanded-card:hover {
		transform: translateY(-8px) scale(1.03);
		border-color: rgba(212, 175, 55, 0.8);
		box-shadow: 
			0 12px 32px rgba(0, 0, 0, 0.6),
			0 0 30px rgba(212, 175, 55, 0.3);
	}

	.expanded-card.active {
		border-color: rgba(251, 191, 36, 1);
		border-width: 4px;
		box-shadow: 
			0 12px 32px rgba(0, 0, 0, 0.6),
			0 0 40px rgba(251, 191, 36, 0.6);
		transform: translateY(-10px) scale(1.05);
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			transparent 0%,
			transparent 40%,
			rgba(0, 0, 0, 0.7) 70%,
			rgba(0, 0, 0, 0.95) 100%
		);
	}

	.card-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1.5rem 1rem;
		z-index: 10;
		text-align: center;
	}

	.card-name {
		display: block;
		font-family: 'Great Vibes', cursive;
		font-size: 1.75rem;
		color: #fef3c7;
		text-shadow: 
			0 2px 4px rgba(0, 0, 0, 0.9),
			0 0 15px rgba(0, 0, 0, 0.8);
		margin-bottom: 0.25rem;
	}

	.card-class {
		display: block;
		font-family: 'Courgette', cursive;
		font-size: 0.875rem;
		color: #fbbf24;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
	}

	.expanded-content::-webkit-scrollbar {
		width: 10px;
	}

	.expanded-content::-webkit-scrollbar-track {
		background: rgba(139, 69, 19, 0.1);
		border-radius: 5px;
	}

	.expanded-content::-webkit-scrollbar-thumb {
		background: rgba(139, 69, 19, 0.5);
		border-radius: 5px;
	}

	.expanded-content::-webkit-scrollbar-thumb:hover {
		background: rgba(139, 69, 19, 0.7);
	}

	@media (max-width: 768px) {
		.compact-tabs {
			flex-wrap: wrap;
			max-width: 90vw;
		}

		.expanded-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.expanded-title h2 {
			font-size: 2rem;
		}

		.expanded-content {
			padding: 2rem 1rem;
		}
	}
</style>