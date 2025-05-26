<script>
	import '../../../app.css';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
