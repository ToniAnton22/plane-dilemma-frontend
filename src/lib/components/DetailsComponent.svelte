<script>
	import NpcsView from "./NpcsView.svelte";
    import {getItem} from "$lib/storage.js"
	import { onMount } from "svelte";
    export let details;
    console.log(details)
    export let source;
    let data = [];
    if(!source){
        source = getItem('npcs')
    }
    
    console.log(source)
    $: if(data){ 
        data = source.filter(npc => npc.location.includes("Yua`san"));
        paginationSettings ={
        page:0,
        limit:2,
        size:data?.length,
        amounts:5
    }
    }

    console.log(data)
    let paginationSettings
</script>

<div class="flex flex-col justify-center items-center">
    {#if details?.population}
        <div class="relative z-[16]">
            <h1 class="text-3xl">Population</h1>
            <span>{details.population}</span>
        </div>
        <div class="relative z-[16]">
            <h1>Related NPCs to the town</h1>
            <NpcsView {paginationSettings} {data}/>
        </div>
    {/if}
</div>