<script>
    import {goto} from '$app/navigation'
    export let data;

    function navigate(player){
        goto('/home/players/player?detail='+encodeURIComponent(JSON.stringify(player)) )
    }
    const getTheme= (player) =>{
        let theme
        let textTheme
        if(player?.name === "Vanelis"){
        theme = "bg-gradient-to-br from-black via-slate-500 to-cyan-800 w-full h-full md:border-l-4 md:border-sky-900"
        textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-blue-600 "
   
        }
        else if(player?.name === "Ng`ombe Radolack"){
            theme="bg-gradient-to-tr from-stone-900 via-orange-950 to-yellow-800 w-full h-full md:border-l-4 md:border-stone-900"
            textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-stone-100 "
       
        }
        else if(player?.name === "Jamond Carter"){
            theme="bg-gradient-to-br from-indigo-900 via-rose-950 to-blue-800 w-full h-full md:border-l-4 md:border-violet-400"
            textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-blue-400 "
         
        
        }
        else if(player?.name === "Kalahari"){
            theme=`bg-gradient-to-b from-gray-500 via-rose-100 to-slate-800 w-full h-full md:border-l-4 md:border-gray-400`
            textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400  "
       
        }
        else if(player?.name === "Fennex Stoutwings"){
            theme="bg-gradient-to-t from-amber-700 via-orange-700 to-red-700 w-full h-full md:border-l-4 md:border-red-900 overflow-hidden"
            textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-orange-100 to-amber-100 "
     
        }
        else if(player?.name === "Bastion"){
            theme="bg-gradient-to-r from-cyan-900 via-slate-600 to-zinc-800 w-full h-full border-0 md:border-l-4 md:border-stone-900"
            textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-neutral-100 "
        }
        return textTheme
    }
    
</script>
<a href="/home" class="absolute w-12 h-12 m-6 pt-2 hover:pointer z-20">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>
<div class="container flex w-full mx-auto my-auto h-3/4 align-center justify-start items-center mt-20 overflow-scroll">
    <!-- svelte-ignore a11y-missing-attribute -->
    {#each data.players as player}
  
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a class="card relative sm:max-md:w-full h-5/6 w-96 transition ease-in-out duration-1000 delay-75 variant-ghost-primary hover:scale-100 hover:w-1/2 hover:h-full hover:bg-start hover:transform-10 hover:z-10 bg-cover bg-no-repeat bg-center" on:click={navigate(player)} style="background-image:url({player?.avatar})">
     
        <header class="{getTheme(player)} text-xl pl-3 pt-2 shadow" >{player?.name}</header>
        <footer class="card-footer bottom-0 my-auto absolute {getTheme(player)} text-md shadow">{player?.class}
        </footer>

    </a>
    {/each}
</div>

<style lang="postcss">

</style>


