<script>
    import {getTheme} from "$lib/helpers/getBackgroundTheme.js"
	import { onDestroy } from "svelte";
    export let players;
    export let navigate

    let active = 'data-active'
    const changeImage = (i,player) => {
        return `carousel-item-${i}`
    }

    let backgroundCarouselTheme
    let playerTextTheme
    let background = "/images/background/Fennex-bg.webp"

    function changeTheme(player){
        let themes = getTheme(player)
        backgroundCarouselTheme = themes.theme
        playerTextTheme = themes.textTheme
        background = themes.background
   
    }
    changeTheme("Fennex Stoutwings")

</script>
<div class="relative {background ? `bg-[url('${background}')] bg-cover` : `${backgroundCarouselTheme}`}" style="{background ? `background-image: url('${background}')` : "background-color: transparent"}" >
    <section class="w-1/2 mx-auto">
        <ul class="flex flex-row snap-x snap-mandatory overflow-x-auto h-screen container-snap">
            {#each players as player,i }
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <a id="carousel-item-{i}" class="shrink-0 snap-center bg-cover bg-center bg-no-repeat w-full rounded-full" style="background-image:url({player?.avatar})" on:click={() => navigate(player)}>
                
                </a>
            {/each}
        </ul>
    </section>
    <div class="absolute bottom-0 inset-x-0 p-4 mx-auto">
        <div class="grid grid-cols-6 gap-4 h-32 w-full justify-items-center">
            {#each players as player, i } 
            <a href={`#carousel-item-${i}`} class="transition ease-in delay-150 duration-200 opacity-75 border hover:opacity-100 hover:scale-110 rounded-full" on:click={() =>changeTheme(player)}>
                <img class="w-32 h-32 rounded-full"
                src={player?.avatar}
                alt={player?.name}
                />
            </a>
            {/each} 
        </div>
    </div>    
</div>

<style lang="scss">
    .container-snap::-webkit-scrollbar{
        display: none;
    }
    
    .container-snap{
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

</style>


