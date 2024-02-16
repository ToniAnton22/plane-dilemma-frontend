<script>
    import NpcsView from "$lib/components/NpcsView.svelte"
    export let data;
    export let filter;

    let source = data.npcs
    const filterContent = () =>{
        if(!filter){
            source = data.npcs
            return
        }
        source = data?.npcs.filter((p) =>{
            return p.name.toLowerCase().includes(filter.toLowerCase())
        })
    }
    let paginationSettings ={
        page:0,
        limit:4,
        size:source.length,
        amounts:5
    }


</script>
<a href="/home" class="absolute w-12 h-12 m-6 pt-2 hover:pointer">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>
<div class="container flex-col mx-auto mt-40">
    <h1 class="text-2xl">Search for the NPC</h1>
    <input class="flex-1 bg-gradient-to-r from-slate-500 from-20% via-zinc-300 via-40% to-stone-600 p-2 my-4 w-full" placeholder="Search for info" bind:value={filter} on:input={(i) => filterContent(filter)} >
    <NpcsView {source} {paginationSettings}/>

</div>
<div class="">

</div>

<style lang="postcss">
    .text-shadow{
        text-shadow: 2px 2px 5px black;
    }
    h1{
        text-shadow: 2px 3px 2px black;
    }
</style>