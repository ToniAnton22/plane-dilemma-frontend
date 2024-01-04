<script>
	import { Paginator, tableMapperValues } from "@skeletonlabs/skeleton";
    import {Table} from "@skeletonlabs/skeleton"
    import {goto} from "$app/navigation"
    import {tableSourceMapper} from "@skeletonlabs/skeleton"

    export let data;
    export let filter;
    let tableSimple;

    let source = data.npcs
    const filterContent = () =>{
        if(!filter){
            console.log("I am here")
            source = data.npcs
            tableSimple = {
                head:['Sex',"Name","Description","Current Location"],
                body: tableMapperValues(source,['sex',"name","description","location"]),
                meta: tableMapperValues(source,['id'])
            }
            return
        }
        source = data?.npcs.filter((p) =>{
            return p.name.toLowerCase().includes(filter.toLowerCase())
        })
        tableSimple = {
        head:['Sex',"Name","Description","Current Location"],
        body: tableMapperValues(source,['sex',"name","description","location"]),
        meta: tableMapperValues(source,['id'])
    }
    }
    let paginationSettings ={
        page:0,
        limit:6,
        size:source.length,
        amounts:5
    }
    let paginatedSource = source.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    )
    console.log(source)

    
    tableSimple = {
        head:['Sex',"Name","Description","Current Location"],
        body: tableMapperValues(source,['sex',"name","description","location"]),
        meta: tableMapperValues(source,['id'])
    }

    const onClickTable = ({id})=>{
        const ref = document.referrer
        goto(ref.length > 0 ? ref : `/home/npcs/npc/${id}`)
    }

</script>
<a href="/home" class="absolute w-12 h-12 m-6 pt-2 hover:pointer">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>
<div class="container flex-col mx-auto mt-40">
    <input class="flex-1 bg-gradient-to-r from-slate-500 from-20% via-zinc-300 via-40% to-stone-600 p-2 my-4" placeholder="Search for info" bind:value={filter} on:input={(i) => filterContent(filter)} >

    <div class="table-container">
        <!-- Native Table Element -->
        
        <Table class="table table-hover" source={tableSimple} interactive={true} on:selected={(e)=>onClickTable({id:e.detail[0]})} />
   
        <Paginator
        bind:settings={paginationSettings}
        showFirstLastButtons="{true}"
        showPreviousNextButtons="{false}"
        class="flex-initial"
        />
   

    </div>

</div>
<div class="">

</div>

<style lang="postcss">
   
</style>