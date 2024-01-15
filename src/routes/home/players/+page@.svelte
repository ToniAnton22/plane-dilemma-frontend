<script>
    import {goto} from '$app/navigation'
    export let data;

    function navigate(player){
        goto('/home/players/player?detail='+encodeURIComponent(JSON.stringify(player)) )
    }
</script>
<a href="/home" class="absolute w-12 h-12 m-6 pt-2 hover:pointer z-20">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>
<div class="container flex w-full mx-auto my-auto h-3/4 align-center justify-start items-center mt-20 overflow-scroll">
    {#each data.players as player}
    <button class="card relative sm:max-md:w-full h-5/6 w-96 transition ease-in-out duration-1000 delay-75 variant-ghost-primary hover:scale-100 hover:w-1/2 hover:h-full hover:bg-start hover:transform-10 hover:z-10 bg-cover bg-no-repeat bg-center" on:click={navigate(player)} style="background-image:url({player?.avatar})">
     
        <header class="card-header text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-blue-300 font-bold" >{player?.name}</header>
        <footer class="card-footer bottom-0 my-auto absolute bg-clip-text bg-gradient-to-r 
         text-transparent from-cyan-200 to-red-200 font-bold">{player?.class}
        </footer>

    </button>
    {/each}
</div>

<style lang="postcss">
   
</style>


