<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
    import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import {navigating} from '$app/stores'
	import {isLoading} from "$lib/loadingStore.js"
	import LoadingScreen from './LoadingScreen.svelte' 
    initializeStores();

	$: $isLoading = !!$navigating
</script>

<LoadingScreen/>
<Drawer/>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
