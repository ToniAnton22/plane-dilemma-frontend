<script>
    import { loading } from '$lib/helpers/loading.svelte.js'
    let message = $state('Current I am loading HAHAHAHAHHAHA ')
    $effect(() =>{

    })

</script>

{#if true}
    <div class="preset-tonal-tertiary absolute w-screen h-screen inset-0">
        <div class="w-full h-full relative">
            <p class="grid justify-center aling-center items-center self-center h-full text-3xl animate-pulse">{loading.message ? loading.message : "Under maintanance, stay cool!"}</p>
        </div>
    </div>
{/if}

{#if false}
    <div class="preset-tonal-tertiary absolute w-screen h-screen inset-0">
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