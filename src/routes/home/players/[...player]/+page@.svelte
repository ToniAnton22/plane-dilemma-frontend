<script>
    import {TabGroup,Tab} from "@skeletonlabs/skeleton"

    import { audioData } from "$lib/data/audioData.js";

    import {themeSong} from "$lib/themeSong.js"
	import { onDestroy, onMount } from "svelte";
   
    import {playTrack, stopTrack} from '$lib/helpers/setAudio.js'
	import DrawerData from "$lib/components/DrawerData.svelte";
  
    
    export let data;
    export let tabSet=0;
    export let theme;
    export let textTheme;
    export let splitSummary = data?.player?.summary;
   
  
    const themeMap = new Map()
    themeMap.set(
        "Vanelis",{
        theme:"bg-gradient-to-br from-black via-slate-500 to-cyan-800 w-full h-full md:border-l-4 md:border-stone-900",
        textTheme:"font-serif text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-blue-200",
    })  

 
    if(data?.player?.name === "Vanelis"){
        theme = "bg-gradient-to-br from-black via-slate-500 to-cyan-800 w-full h-full md:border-l-4 md:border-sky-900"
        textTheme="font-serif text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-blue-600 "
        themeSong.set(4)
    }
    else if(data?.player?.name === "Ng`ombe Radolack"){
        theme="bg-gradient-to-tr from-stone-900 via-orange-950 to-yellow-800 w-full h-full md:border-l-4 md:border-stone-900"
        textTheme="font-serif text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-stone-100 "
        themeSong.set(5)
    }
    else if(data?.player?.name === "Jamond Carter"){
        theme="bg-gradient-to-br from-indigo-900 via-rose-950 to-blue-800 w-full h-full md:border-l-4 md:border-violet-400"
        textTheme="font-serif text-4xl bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-blue-400 "
        themeSong.set(3)
      
    }
    else if(data?.player?.name === "Kalahari"){
        theme=`bg-gradient-to-b from-gray-500 via-rose-100 to-slate-800 w-full h-full md:border-l-4 md:border-gray-400`
        textTheme="font-serif text-4xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400  "
        themeSong.set(6)
    }
    else if(data?.player?.name === "Fennex Stoutwings"){
        theme="bg-gradient-to-t from-amber-700 via-orange-700 to-red-700 w-full h-full md:border-l-4 md:border-red-900 overflow-hidden"
        textTheme="font-serif text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-100 to-amber-100 "
        themeSong.set(7)
    }
    else if(data?.player?.name === "Bastion"){
        theme="bg-gradient-to-r from-cyan-900 via-slate-600 to-zinc-800 w-full h-full border-0 md:border-l-4 md:border-stone-900"
        textTheme="font-serif text-4xl bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-neutral-100 "
        themeSong.set(2)
    }

    onMount(() =>{
        
    })
    onDestroy(() =>{
        stopTrack()
        themeSong.set(0)
    })

</script>
<a href="/home/players" class="w-6 h-6 md:w-12 md:h-12 m-2 md:m-6 hover:pointer z-40 absolute bottom-0 md:top-0">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>
<header class="absolute md:bottom-1 md:left-6 right-3 w-fit z-10 ">
    <h1 class='{textTheme} uppercase'>{data?.player?.name}</h1>
    <DrawerData/>
</header>
<main class="h-full flex flex-col md:flex-row relative overflow-hidden">
   <div class="hidden md:block w-full md:w-1/2 absolute md:fixed bg-no-repeat md:bg-fixed object-scale-down md:bg-top md:h-full overflow-hidden avatar-animation" style="background-image: url({data?.player?.avatar})">
    
   </div>
   <div class="hidden md:block md:w-1/2"></div>
   <div class="w-full md:w-1/2 card h-full justify-center mx-auto self-center z-20 border-t-stone-900 space-x-4
   ">
    <TabGroup
        justify="justify-center"
        active="variant-filled-primary"
        hover="hover:variant-soft-primary"
        flex="flex-1 lg:flex-none"
        rounded="rounded-full"
        border="border-0"
        class="{theme}"
        spacing="y-4"
        regionPanel="mb-10 space-y-4 pt-4 indent-4 px-2 justify-center p-10 overflow-auto overscroll-auto {textTheme} text-lg"
    >
        <Tab bind:group={tabSet} name="description" value={0}>
            <svelte:fragment slot="lead">Description</svelte:fragment>
        </Tab>
        <Tab bind:group={tabSet} name="summary" value={1}>Summary</Tab>
        <Tab bind:group={tabSet} name="items" value={2}>Items</Tab>
        <Tab bind:group={tabSet} mame="Relations" value={3}>Friends and Enemies</Tab>
        <!-- Tab Panels --->
        <svelte:fragment slot="panel">
            {#if tabSet === 0}
                {#if data?.player?.description != undefined}
                    {#each data?.player?.description.split('/n') as sentence }
                        <p class="pl-3">{sentence}</p>
                    {/each}
                    <div class="md:hidden flex justify-center items-center align-center">
                        <div class="md:hidden {theme} w-[12.7rem] h-[12.7rem] rounded-full relative flex justify-center items-center align-center">
                            <img src="{data?.player?.avatar}" class="z-10 rounded-full w-48 h-48 avatar-animation" alt="Kalahari"/>
                        </div>
                        <p class={textTheme}>{data?.player?.name}</p>
                    </div>
                    {:else}
                        <p>Empty</p>
                {/if}
            {:else if tabSet === 1}
                {#if data?.player?.summary != undefined}
                    {#each splitSummary.split('/n') as sentence }
                        <p class="pl-3">{sentence}</p>
                    {/each}
                    {:else}
                        <p>Empty</p>
                {/if}

            {:else if tabSet === 2}
                Items he holds:
            {:else if tabSet === 3}
                Friends, Enemies
            {/if}
        </svelte:fragment>
    </TabGroup>
   </div>
</main>

<style>

    @keyframes custom-animation{
        0%{
            filter:blur(0px);
            filter:saturate(70%);
            opacity: 70%;
            filter:hue-rotate(5deg);
            transform:scale(1);
            filter:brightness(80%)
        }
        25%{
            filter:saturate(90%);
            filter:hue-rotate(25deg);
            filter:brightness(80%)
        }
        50%{
            filter:saturate(110%);
            filter:hue-rotate(15deg);
            filter:brightness(85%)
        }
        100%{
            filter:blur(3px);
            filter:saturate(125%);
            opacity: 100%;
            filter:hue-rotate(5deg);
            transform: scale(1.03);
            filter:brightness(90%)
        }
    }
    .avatar-animation{ 
        animation-name:custom-animation;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-direction:alternate;
        animation-timing-function:ease-in-out;
        background-size: cover;
    }
</style>