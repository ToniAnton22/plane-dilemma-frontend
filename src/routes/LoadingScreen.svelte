<script>
    import { isLoading,databaseLoading, loadingMessage, setMessage} from '$lib/loadingStore.js'
	import { onDestroy, onMount } from 'svelte';

    $: message = $loadingMessage

    onMount(() =>{
        setMessage("Loading.....")
    })

    if($isLoading){
        setMessage("Loading, this might take a while (max of 1 minute)....")
    }else if($databaseLoading){
        setMessage("Waiting for the database's response, please wait....")
    }

</script>

{#if $isLoading}
    <div class="variant-glass-tertiary absolute w-screen h-screen z-[9999] inset-0">
        <div class="w-full h-full relative">
            <p class="grid justify-center aling-center items-center self-center h-full text-3xl animate-pulse">{message}</p>
        </div>
    </div>
{/if}

{#if $databaseLoading}
    <div class="variant-glass-tertiary absolute w-screen h-screen z-[9999] inset-0">
        <div class="w-full h-full relative">
            <p class="grid justify-center aling-center items-center self-center h-full text-3xl animate-pulse">{message}</p>
        </div>
    </div>    
{/if}
<style>


    .loading-spinner {
        /* Style your spinner or loading message here */
    }
</style>