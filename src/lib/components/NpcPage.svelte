<script>
	let { npc } = $props();
	let isExpanded = $state(false);

	function toggleExpanded() {
		isExpanded = !isExpanded;
	}
</script>

{#if !isExpanded}

	<button
		onclick={toggleExpanded}
		class="npc-portrait-card group"
		style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url({npc?.image})"
	>
		<div class="portrait-overlay"></div>
		

		<div class="frame-corner frame-corner-tl"></div>
		<div class="frame-corner frame-corner-tr"></div>
		<div class="frame-corner frame-corner-bl"></div>
		<div class="frame-corner frame-corner-br"></div>
		
	
		<div class="name-plate">
			<div class="name-plate-inner">
				<h1 class="npc-name">{npc?.name}</h1>
				{#if npc?.race || npc?.class}
					<p class="npc-subtitle">
						{#if npc?.race}{npc.race}{/if}
						{#if npc?.race && npc?.class} • {/if}
						{#if npc?.class}{npc.class}{/if}
					</p>
				{/if}
			</div>
		</div>
		
	
		<div class="hover-prompt">
			<span>Click to read more</span>
		</div>
	</button>
{:else}

	<div class="npc-detail-expanded">

		<button
			class="close-button-compact"
			onclick={toggleExpanded}
			aria-label="Close details"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<div class="detail-scroll-content">
		
			<div class="portrait-section-expanded">
				<div class="portrait-frame-expanded">
					<img
						src={npc?.image}
						alt={npc?.name}
						class="portrait-image-expanded"
					/>
					<div class="portrait-border-expanded"></div>
				</div>
			</div>
			
		
			<div class="detail-header-expanded">
				<h1 class="detail-name-expanded">{npc?.name}</h1>
				<div class="detail-divider-expanded">
					<span>✦ ❖ ✦</span>
				</div>
				{#if npc?.race || npc?.class}
					<p class="detail-subtitle-expanded">
						{#if npc?.race}{npc.race}{/if}
						{#if npc?.race && npc?.class} • {/if}
						{#if npc?.class}{npc.class}{/if}
					</p>
				{/if}
			</div>
			

			{#if npc?.location}
				<div class="detail-section-expanded">
					<div class="section-header-expanded">
						<div class="section-icon-expanded">📍</div>
						<h3 class="section-title-expanded">Last Known Location</h3>
					</div>
					<p class="section-content-expanded">{npc.location}</p>
				</div>
			{/if}

			{#if npc?.description}
				<div class="detail-section-expanded">
					<div class="section-header-expanded">
						<div class="section-icon-expanded">📜</div>
						<h3 class="section-title-expanded">Description</h3>
					</div>
					<p class="section-content-main-expanded first-letter-expanded">
						{npc.description}
					</p>
				</div>
			{/if}
			
			{#if npc?.background}
				<div class="detail-section-expanded">
					<div class="section-header-expanded">
						<div class="section-icon-expanded">📖</div>
						<h3 class="section-title-expanded">Background</h3>
					</div>
					<p class="section-content-main-expanded">
						{npc.background}
					</p>
				</div>
			{:else}
				<div class="detail-section-expanded">
					<div class="section-header-expanded">
						<div class="section-icon-expanded">📖</div>
						<h3 class="section-title-expanded">Background</h3>
					</div>
					<p class="section-content-italic-expanded">
						The history of this soul remains shrouded in mystery...
					</p>
				</div>
			{/if}
			
			{#if npc?.notes}
				<div class="detail-section-expanded">
					<div class="section-header-expanded">
						<div class="section-icon-expanded">✍️</div>
						<h3 class="section-title-expanded">Notes</h3>
					</div>
					<p class="section-content-main-expanded">
						{npc.notes}
					</p>
				</div>
			{/if}
		
			<div class="detail-footer-expanded">
				<span>❖</span>
			</div>
		</div>
	</div>
{/if}

<style>

	.npc-portrait-card {
		position: relative;
		width: 100%;
		max-width: 350px;
		aspect-ratio: 3/4;
		background-size: cover;
		background-position: center;
		border-radius: 0.5rem;
		overflow: hidden;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 
			0 10px 30px rgba(0, 0, 0, 0.5),
			inset 0 0 100px rgba(0, 0, 0, 0.3);
	}

	.npc-portrait-card:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: 
			0 20px 40px rgba(0, 0, 0, 0.6),
			0 0 30px rgba(212, 175, 55, 0.4),
			inset 0 0 100px rgba(0, 0, 0, 0.2);
	}

	.portrait-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			transparent 0%,
			transparent 40%,
			rgba(0, 0, 0, 0.6) 70%,
			rgba(0, 0, 0, 0.9) 100%
		);
		transition: opacity 0.3s ease;
	}

	.npc-portrait-card:hover .portrait-overlay {
		opacity: 0.8;
	}


	.frame-corner {
		position: absolute;
		width: 40px;
		height: 40px;
		border: 3px solid rgba(212, 175, 55, 0.8);
		transition: all 0.3s ease;
	}

	.frame-corner-tl {
		top: 8px;
		left: 8px;
		border-right: none;
		border-bottom: none;
	}

	.frame-corner-tr {
		top: 8px;
		right: 8px;
		border-left: none;
		border-bottom: none;
	}

	.frame-corner-bl {
		bottom: 8px;
		left: 8px;
		border-right: none;
		border-top: none;
	}

	.frame-corner-br {
		bottom: 8px;
		right: 8px;
		border-left: none;
		border-top: none;
	}

	.npc-portrait-card:hover .frame-corner {
		border-color: rgba(251, 191, 36, 1);
		width: 50px;
		height: 50px;
	}


	.name-plate {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1.5rem;
		z-index: 10;
	}

	.name-plate-inner {
		text-align: center;
	}

	.npc-name {
		font-family: 'Great Vibes', cursive;
		font-size: 2rem;
		color: #fef3c7;
		text-shadow: 
			0 0 20px rgba(251, 191, 36, 0.6),
			2px 2px 8px rgba(0, 0, 0, 0.9);
		margin-bottom: 0.5rem;
		transition: all 0.3s ease;
	}

	.npc-portrait-card:hover .npc-name {
		text-shadow: 
			0 0 30px rgba(251, 191, 36, 0.8),
			2px 2px 8px rgba(0, 0, 0, 0.9);
		transform: scale(1.05);
	}

	.npc-subtitle {
		font-family: 'Courgette', cursive;
		font-size: 0.875rem;
		color: #fbbf24;
		text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.9);
		margin: 0;
	}

	.hover-prompt {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.hover-prompt span {
		font-family: 'Courgette', cursive;
		font-size: 1.125rem;
		color: #fef3c7;
		background: rgba(0, 0, 0, 0.8);
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		border: 2px solid rgba(251, 191, 36, 0.6);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
	}

	.npc-portrait-card:hover .hover-prompt {
		opacity: 1;
	}

	.npc-detail-expanded {
		position: relative;
		width: 100%;
		height: 100%;
		animation: fadeIn 0.4s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.detail-scroll-content {
		height: 100%;
		overflow-y: auto;
		padding: 3rem 2rem 2rem 2rem;
	}

	.close-button-compact {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 10;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(139, 69, 19, 0.3);
		border: 2px solid rgba(139, 69, 19, 0.5);
		border-radius: 50%;
		color: #3d2817;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.close-button-compact:hover {
		background: rgba(139, 69, 19, 0.5);
		border-color: rgba(139, 69, 19, 0.7);
		transform: rotate(90deg) scale(1.1);
	}

	.portrait-section-expanded {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.portrait-frame-expanded {
		position: relative;
		width: 180px;
		height: 180px;
	}

	.portrait-image-expanded {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
		box-shadow: 
			0 8px 24px rgba(0, 0, 0, 0.4),
			inset 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	.portrait-border-expanded {
		position: absolute;
		inset: -8px;
		border: 3px solid #d4af37;
		border-radius: 50%;
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
	}

	.portrait-border-expanded::before,
	.portrait-border-expanded::after {
		content: '✦';
		position: absolute;
		color: #d4af37;
		font-size: 1.5rem;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.portrait-border-expanded::before {
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
	}

	.portrait-border-expanded::after {
		bottom: -12px;
		left: 50%;
		transform: translateX(-50%);
	}

	.detail-header-expanded {
		text-align: center;
		margin-bottom: 2rem;
	}

	.detail-name-expanded {
		font-family: 'Great Vibes', cursive;
		font-size: 2.5rem;
		color: #3d2817;
		margin-bottom: 0.75rem;
	}

	.detail-divider-expanded {
		color: #8b6914;
		font-size: 1.25rem;
		margin: 0.75rem 0;
	}

	.detail-subtitle-expanded {
		font-family: 'Courgette', cursive;
		font-size: 1rem;
		color: #5d5040;
		font-style: italic;
		margin: 0;
	}

	.detail-section-expanded {
		margin-bottom: 2rem;
	}

	.section-header-expanded {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.section-icon-expanded {
		font-size: 1.5rem;
		filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
		flex-shrink: 0;
	}

	.section-title-expanded {
		font-family: 'Courgette', cursive;
		font-size: 1.25rem;
		color: #3d2817;
		margin: 0;
		border-bottom: 2px solid rgba(139, 105, 20, 0.3);
		padding-bottom: 0.25rem;
		flex: 1;
	}

	.section-content-expanded,
	.section-content-main-expanded {
		font-family: 'Quicksand', sans-serif;
		font-size: 0.95rem;
		color: #4a3728;
		line-height: 1.7;
		text-align: justify;
		margin: 0;
	}

	.section-content-main-expanded {
		text-indent: 2rem;
	}

	.first-letter-expanded::first-letter {
		font-family: 'Great Vibes', cursive;
		font-size: 3.5rem;
		float: left;
		line-height: 0.8;
		margin-right: 0.5rem;
		margin-top: 0.25rem;
		color: #8b4513;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}

	.section-content-italic-expanded {
		font-family: 'Courgette', cursive;
		font-size: 0.95rem;
		color: #7d6d5d;
		font-style: italic;
		text-align: center;
		padding: 1rem;
		margin: 0;
	}

	.detail-footer-expanded {
		text-align: center;
		color: #8b6914;
		font-size: 1.5rem;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(139, 105, 20, 0.2);
	}

	.detail-scroll-content::-webkit-scrollbar {
		width: 8px;
	}

	.detail-scroll-content::-webkit-scrollbar-track {
		background: rgba(139, 69, 19, 0.1);
		border-radius: 4px;
	}

	.detail-scroll-content::-webkit-scrollbar-thumb {
		background: rgba(139, 69, 19, 0.4);
		border-radius: 4px;
	}

	.detail-scroll-content::-webkit-scrollbar-thumb:hover {
		background: rgba(139, 69, 19, 0.6);
	}
</style>