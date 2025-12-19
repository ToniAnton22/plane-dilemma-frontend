<script>
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

	let { title, content: modalContent, footer = 'none', styles = 'none' } = $props();
	let openState = $state(false);

	const animBackdrop =
		'transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100';
	const animModal =
		'transition transition-discrete opacity-0 -translate-x-full starting:data-[state=open]:opacity-0 starting:data-[state=open]:-translate-x-full data-[state=open]:opacity-100 data-[state=open]:translate-x-0';
</script>

<div class="" style={styles}>
	<Dialog
		onOpenChange={(e) => (openState = e.open)}
		modal={true}
		closeOnEscape={true}
		closeOnInteractOutside={true}
	>
		<Dialog.Trigger
			class="memory-bubble hover:scale-110 text-xs text-center p-2 transition-transform"
		>
			{title}
		</Dialog.Trigger>
		<Portal>
			<Dialog.Backdrop
				class="fixed inset-0 z-50 bg-surface-50-950/50 transition transition-discrete {animBackdrop}"
			/>
			<Dialog.Positioner class="fixed inset-0 z-50 flex justify-start">
				<Dialog.Content
					class="h-screen card bg-surface-100-900 w-sm p-4 space-y-4 shadow-xl {animModal}"
				>
					<header class="flex justify-between items-start">
						<h2 class="h2">{title}</h2>
						<Dialog.Close class="btn btn-sm variant-ghost-surface">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-5 h-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</Dialog.Close>
					</header>

					<article class="overflow-y-auto max-h-[50vh]">
						<p>
							{modalContent}
						</p>
					</article>

					{#if footer !== 'none'}
						<footer class="flex justify-end gap-4 pt-4 border-t border-surface-300-600-token">
							<h3>
								{footer}
							</h3>
						</footer>
					{/if}
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog>
</div>

<style>
	/* main circle */
	:global(.memory-bubble) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 9rem;
		height: 100px;
		margin: auto;
		border-radius: 50%;
		background: radial-gradient(
			65% 65% at 35% 35%,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(200, 200, 200, 0.4) 100%
		);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(0.3px);
		cursor: pointer;
		position: relative;
	}

	/* little "tail" */
	:global(.memory-bubble::after) {
		content: '';
		position: absolute;
		bottom: -12px;
		left: 18px;
		width: 11%;
		height: 15%;
		border-radius: 50%;
		background: rgba(200, 200, 200, 0.4);
		transform: rotate(60deg);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
</style>
