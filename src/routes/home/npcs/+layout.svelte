<script>
	import '../../../app.css';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
			<svelte:fragment slot="headline">Plane Dilemma</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
