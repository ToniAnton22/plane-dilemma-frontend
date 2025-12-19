<script>
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

	let { title, content: modalContent, footer = 'none', styles = 'none' } = $props();
	let openState = $state(false);

	const animBackdrop =
		'transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100';
	const animModal =
		'transition-all duration-700 transition-discrete opacity-0 -translate-x-full scale-90 starting:data-[state=open]:opacity-0 starting:data-[state=open]:-translate-x-full starting:data-[state=open]:scale-90 data-[state=open]:opacity-100 data-[state=open]:translate-x-0 data-[state=open]:scale-100';
</script>

<div class="" style={styles}>
	<Dialog
		onOpenChange={(e) => (openState = e.open)}
		modal={true}
		closeOnEscape={true}
		closeOnInteractOutside={true}
	>
		<Dialog.Trigger
			class="memory-bubble hover:scale-110 text-xs text-center p-2 transition-all duration-300"
		>
			<span class="memory-text">{title}</span>
		</Dialog.Trigger>
		<Portal>
			<Dialog.Backdrop
				class="fixed inset-0 z-50 bg-gradient-to-br from-slate-950/80 via-purple-950/80 to-slate-950/80 backdrop-blur-sm {animBackdrop}"
			/>
			<Dialog.Positioner class="fixed inset-0 z-50 flex justify-start items-center p-8">
				<Dialog.Content class="scroll-container h-[90vh] w-[500px] relative {animModal}">
					<div class="scroll-paper">
						<div class="scroll-curl-top"></div>

						<div class="scroll-content">
							<header class="scroll-header">
								<h2 class="scroll-title">{title}</h2>
								<Dialog.Close class="close-button">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2.5"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</Dialog.Close>
							</header>

							<div class="scroll-divider">
								<span>✦ ❖ ✦</span>
							</div>

							<article class="scroll-body">
								<p class="scroll-text">
									{modalContent}
								</p>
							</article>

							{#if footer !== 'none'}
								<footer class="scroll-footer">
									<div class="footer-ornament">✦</div>
									<h3 class="footer-type">{footer}</h3>
									<div class="footer-ornament">✦</div>
								</footer>
							{/if}
						</div>

						<div class="scroll-curl-bottom"></div>
					</div>
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog>
</div>

<style>
	:global(.memory-bubble) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 9rem;
		height: 100px;
		margin: auto;
		border-radius: 50%;
		background: radial-gradient(
			circle at 30% 30%,
			rgba(255, 255, 255, 0.8) 0%,
			rgba(196, 181, 253, 0.6) 30%,
			rgba(147, 197, 253, 0.5) 60%,
			rgba(139, 92, 246, 0.4) 100%
		);
		box-shadow:
			0 8px 24px rgba(139, 92, 246, 0.4),
			0 4px 12px rgba(0, 0, 0, 0.2),
			inset 0 2px 4px rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(8px);
		cursor: pointer;
		position: relative;
		border: 2px solid rgba(255, 255, 255, 0.3);
		animation: float-bubble 4s ease-in-out infinite;
	}

	@keyframes float-bubble {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	:global(.memory-bubble:hover) {
		background: radial-gradient(
			circle at 30% 30%,
			rgba(255, 255, 255, 0.9) 0%,
			rgba(196, 181, 253, 0.7) 30%,
			rgba(147, 197, 253, 0.6) 60%,
			rgba(139, 92, 246, 0.5) 100%
		);
		box-shadow:
			0 12px 32px rgba(139, 92, 246, 0.6),
			0 6px 16px rgba(0, 0, 0, 0.3),
			inset 0 2px 4px rgba(255, 255, 255, 0.6);
		animation: float-bubble 2s ease-in-out infinite;
	}

	:global(.memory-bubble::after) {
		content: '';
		position: absolute;
		bottom: -12px;
		left: 18px;
		width: 11%;
		height: 15%;
		border-radius: 50%;
		background: rgba(196, 181, 253, 0.5);
		border: 2px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	}

	:global(.memory-bubble::before) {
		content: '';
		position: absolute;
		bottom: -20px;
		left: 12px;
		width: 6%;
		height: 8%;
		border-radius: 50%;
		background: rgba(196, 181, 253, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
	}

	.memory-text {
		font-family: 'Courgette', cursive;
		color: #1e1b4b;
		font-weight: 600;
		text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
		z-index: 10;
		position: relative;
	}

	.scroll-container {
		display: flex;
		align-items: center;
		justify-content: center;
		perspective: 1000px;
	}

	.scroll-paper {
		position: relative;
		width: 100%;
		max-width: 500px;
		background: linear-gradient(180deg, #f5e6d3 0%, #f0ddc1 50%, #f5e6d3 100%);
		border-radius: 8px;
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		padding: 3rem 2rem;
		background-image: repeating-linear-gradient(
			90deg,
			transparent,
			transparent 2px,
			rgba(139, 69, 19, 0.02) 2px,
			rgba(139, 69, 19, 0.02) 4px
		);
	}

	.scroll-curl-top,
	.scroll-curl-bottom {
		position: absolute;
		left: 0;
		right: 0;
		height: 40px;
		background: linear-gradient(to bottom, #d4af37, #f4d03f);
		box-shadow:
			0 4px 12px rgba(0, 0, 0, 0.3),
			inset 0 2px 4px rgba(255, 255, 255, 0.3);
		z-index: 10;
	}

	.scroll-curl-top {
		top: 0;
		border-radius: 8px 8px 50% 50% / 8px 8px 20px 20px;
		border-bottom: 2px solid #8b6914;
	}

	.scroll-curl-bottom {
		bottom: 0;
		border-radius: 50% 50% 8px 8px / 20px 20px 8px 8px;
		border-top: 2px solid #8b6914;
	}

	.scroll-content {
		position: relative;
		z-index: 5;
		max-height: calc(90vh - 6rem);
		overflow-y: auto;
		padding: 1rem;
	}

	.scroll-content::-webkit-scrollbar {
		width: 8px;
	}

	.scroll-content::-webkit-scrollbar-track {
		background: rgba(139, 69, 19, 0.1);
		border-radius: 4px;
	}

	.scroll-content::-webkit-scrollbar-thumb {
		background: rgba(139, 69, 19, 0.4);
		border-radius: 4px;
	}

	.scroll-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		margin-bottom: 1.5rem;
	}

	.scroll-title {
		font-family: 'Great Vibes', cursive;
		font-size: 2.5rem;
		color: #3d2817;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
		margin: 0;
		flex: 1;
	}

	.close-button {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(139, 69, 19, 0.2);
		border: 2px solid rgba(139, 69, 19, 0.3);
		border-radius: 50%;
		color: #3d2817;
		cursor: pointer;
		transition: all 0.3s ease;
		flex-shrink: 0;
	}

	.close-button:hover {
		background: rgba(139, 69, 19, 0.3);
		border-color: rgba(139, 69, 19, 0.5);
		transform: rotate(90deg);
	}

	.scroll-divider {
		text-align: center;
		margin: 1.5rem 0;
		color: #8b6914;
		font-size: 1.25rem;
		position: relative;
	}

	.scroll-divider::before,
	.scroll-divider::after {
		content: '';
		position: absolute;
		top: 50%;
		width: 30%;
		height: 1px;
		background: linear-gradient(to right, transparent, #8b6914, transparent);
	}

	.scroll-divider::before {
		left: 0;
	}

	.scroll-divider::after {
		right: 0;
	}

	.scroll-body {
		margin: 2rem 0;
	}

	.scroll-text {
		font-family: 'Quicksand', sans-serif;
		font-size: 1rem;
		line-height: 1.8;
		color: #4a3728;
		text-align: justify;
		text-indent: 2rem;
	}

	.scroll-text::first-letter {
		font-family: 'Great Vibes', cursive;
		font-size: 3rem;
		float: left;
		line-height: 0.8;
		margin-right: 0.5rem;
		color: #8b4513;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
	}

	.scroll-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding-top: 2rem;
		margin-top: 2rem;
		border-top: 2px solid rgba(139, 69, 19, 0.2);
	}

	.footer-ornament {
		color: #8b6914;
		font-size: 1rem;
		animation: shimmer 3s ease-in-out infinite;
	}

	.footer-type {
		font-family: 'Courgette', cursive;
		font-size: 1.125rem;
		color: #3d2817;
		margin: 0;
		padding: 0.5rem 1rem;
		background: rgba(212, 175, 55, 0.2);
		border-radius: 9999px;
		border: 1px solid rgba(139, 105, 20, 0.3);
	}

	@keyframes shimmer {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 1;
		}
	}
</style>
