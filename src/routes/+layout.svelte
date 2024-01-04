<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
    import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
    initializeStores();
</script>

<Drawer/>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
