<script>
	import NpcsView from "./NpcsView.svelte";
    import {getItem} from "$lib/storage.js"
	import { onMount } from "svelte";
    export let details;
    console.log(details)
    export let data;
    let source = [];
    if(!data){
        data = getItem('npcs')
    }
    
    console.log(data)
    $: if(source){ 
        source = data.filter(npc => npc.location.includes("Yua`san"));
        paginationSettings ={
        page:0,
        limit:2,
        size:source?.length,
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
            {#if source}
                <NpcsView {paginationSettings} {source}/>    
            {/if}
            {#if !source}
                <h1>No npc related to this town has been discovered</h1>
            {/if}
            
        </div>
    {/if}
</div>