<script>
	import ModalComponent from '$lib/components/ModalComponent.svelte';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	let { title, content: modalContent, footer = 'none', styles = 'none' } = $props();
	let openState = $state(false);

	function modalClose() {
		openState = false;
	}
</script>

<div class="" style={styles}>
	<button onclick={() => (openState = !openState)} class="memory-bubble hover:scale-120 text-xs text-center p-2">
		<Modal
			open={openState}
			classes="-z-10"
			onOpenChange={(e) => (openState = e.open)}
			triggerBase=" w-full h-full"
			contentBase="card p-4 space-y-4 max-w-screen-sm overflow-scroll h-3/4"
			backdropClasses="backdrop-blur-sm"
			positionerClasses="bg-[url('/context-notes.png')] bg-no-repeat bg-contain bg-center overflow-hidden"
			backdropBackground="opacity-20"
		>
			{#snippet trigger()}
				{title}
			{/snippet}
			{#snippet content()}
				<header class="flex justify-between">
					<h2 class="h2">{title}</h2>
				</header>
				<article>
					<p class="overflow-scroll h-fit">
						{modalContent}
					</p>
				</article>
				<footer class="flex justify-end gap-4">
					<h3>
						{footer}
					</h3>
				</footer>
			{/snippet}
		</Modal>
	</button>
</div>

<style>
	/* main circle */
	.memory-bubble {
		display: flex; /* centre the text */
		align-items: center;
		justify-content: center;
		width: 9rem;
		height: 100px;
		margin: auto;
		border-radius: 50%; /* perfect circle */
		background: radial-gradient(
			/* grey → white */ 65% 65% at 35% 35%,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(200, 200, 200, 0.4) 100%
		);

		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* lift */
		backdrop-filter: blur(0.3px); /* optional “frosted” vibe */
	}

	/* little “tail” */
	.memory-bubble::after {
		content: '';
		position: absolute;
		bottom: -12px; /* nudge below circle */
		left: 18px; /* adjust to taste */
		width: 11%;
		height: 15%;
		border-radius: 50%;
		background: rgba(200, 200, 200, 0.4);
		transform: rotate(60deg);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
</style>
