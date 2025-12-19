<script>
	import { goto } from '$app/navigation';
	import Carousel from '$lib/components/Carousel.svelte';
    
	let { data } = $props();
</script>

<a href="/home" class="back-button-players group" aria-label="Return to home">
	<div class="back-button-inner-players">
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
	<span class="back-tooltip-players">Return to Table of Contents</span>
</a>

<Carousel {data} />

<style>
	.back-button-players {
		position: absolute;
		top: 2rem;
		left: 2rem;
		z-index: 60;
		width: 4rem;
		height: 4rem;
	}

	.back-button-inner-players {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(101, 48, 10, 0.95));
		border: 2px solid rgba(212, 175, 55, 0.8);
		border-radius: 50%;
		box-shadow: 
			0 6px 20px rgba(0, 0, 0, 0.6),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		transition: all 0.3s ease;
		cursor: pointer;
		position: relative;
	}

	.back-button-inner-players::before,
	.back-button-inner-players::after {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		border: 2px solid rgba(212, 175, 55, 0.8);
		transition: all 0.3s ease;
	}

	.back-button-inner-players::before {
		top: -4px;
		left: -4px;
		border-right: none;
		border-bottom: none;
	}

	.back-button-inner-players::after {
		bottom: -4px;
		right: -4px;
		border-left: none;
		border-top: none;
	}

	.back-button-players:hover .back-button-inner-players {
		background: linear-gradient(135deg, rgba(180, 83, 9, 1), rgba(139, 69, 19, 1));
		transform: scale(1.1);
		box-shadow: 
			0 8px 28px rgba(212, 175, 55, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.back-tooltip-players {
		position: absolute;
		left: 5rem;
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
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
	}

	.back-button-players:hover .back-tooltip-players {
		opacity: 1;
	}
</style>