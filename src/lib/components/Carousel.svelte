<script>
    import {getTheme} from "$lib/helpers/getBackgroundTheme.js"
	import { onDestroy } from "svelte";
    import Book from "./Book.svelte";
    export let players;
    export let navigate

    let active = 'data-active'
    const changeImage = (i,player) => {
        return `carousel-item-${i}`
    }

    let backgroundCarouselTheme
    let playerTextTheme
    let background = "/images/background/Kalahari-bg.webp"
    let playerData

    function changeTheme(player){
        let themes = getTheme(player)
        backgroundCarouselTheme = themes.theme
        playerTextTheme = themes.textTheme
        background = themes.background
        playerData=player
    }
    
</script>

<Book>
    <div class="relative h-full {background ? `bg-[url('${background}')] bg-cover` : `${backgroundCarouselTheme}`}" style="{background ? `background-image: url('${background}')` : "background-color: url('/images/background/Fennex-bg.webp');"}" slot="page-two">
        <div class="absolute badge h-[10vh] lg:-top-[1vh] -top-[3.5vh] inset-x-0 p-4 mx-auto z-40 text-black">
            <div class="grid grid-cols-6 gap-4 w-full justify-items-center">
                {#each players as player, i } 
                <a href={`#carousel-item-${i}`} class="transition h-[10vh] w-[4vw] ease-in delay-150 duration-200 opacity-75 border hover:opacity-100 hover:scale-110 rounded-b-full bg-cover bg-center" style="background-image:url({player?.image})" on:click={() =>changeTheme(player)}>
                </a>
                {/each} 
            </div>
        </div>    
        <div class="h-full flex flex-col items-center variant-soft-surface rounded-lg text-center gap-10 justify-center variant-ghost-surface">
            {#if !playerData}
                <p class="p-4 mt-20">{players[0]?.name}</p>
                <p class="w-1/2">{players[0]?.background.split(".")[0]}....</p>
            {/if}
            {#if playerData}
                <p class="p-4 mt-20 variant-filled-surface rounded-lg">{playerData?.name}</p>
                <p class="w-1/2 p-4 variant-filled-surface rounded-lg">{playerData?.background.split(".")[0]}....</p>
            {/if}
            
        </div>
    </div>
    <section class="w-full mx-auto" slot="page-one">
        <ul class="flex flex-row snap-x snap-mandatory overflow-x-auto h-screen container-snap">
            {#each players as player,i }
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <a id="carousel-item-{i}" class="shrink-0 snap-center bg-cover bg-center bg-no-repeat w-full" style="background-image:url({player?.image})" on:click={() => navigate(player)}>
                
                </a>
            {/each}
        </ul>
    </section>

</Book>


<style lang="scss">
    .container-snap::-webkit-scrollbar{
        display: none;
    }
    
    .container-snap{
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

</style>


