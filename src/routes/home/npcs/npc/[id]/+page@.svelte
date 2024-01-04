<script>
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

    export let data;
    let tabSet = 2;



</script>

<a href="/home/npcs" class="absolute w-12 h-12 m-6 pt-2 hover:pointer">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>
<img src={data?.npc?.avatar} class="absolute bg-cover mx-auto w-full h-full bg-scroll opacity-75 brightness-75 blur-sm -z-20" alt={data?.npc?.name}/>
<main class="flex lg:h-full h-screen lg:flex-row flex-col-reverse space-x-2 overflow-scroll">
    <header class="lg:mx-10 my-16 lg:w-1/2 w-full relative">
        <div class="mx-auto card w-96 h-96 bg-cover bg-center bg-no-repeat rounded-full border-[10px] shadow-cyan-200 border-cyan-600" style="background-image:url({data?.npc?.avatar})">
        </div>
        <h1 class="mx-auto text-4xl text-center w-96 font-bold font-serif p-4 m-6">
            {data?.npc?.name}
        </h1>
        <p class="mx-auto w-96 h-fit text-center indent-1 md:text-xl">
            {data?.npc?.description}
        </p>
    </header>

    <article class="lg:w-1/2 w-full md:text-xl break-words">
        <div>
            <TabGroup regionList="lg:justify-start justify-center"  regionPanel="justify-center">
                <Tab bind:group={tabSet} name="info" value={0}>
                    <svelte:fragment slot="lead">Info</svelte:fragment>
                    <span>About {data?.npc?.name}</span>
                </Tab>
                <Tab bind:group={tabSet} name="story" value={1}>
                    <svelte:fragment slot="lead">Story</svelte:fragment>
                    <span>
                        Story Relevance
                    </span>
                </Tab>
                <Tab bind:group={tabSet} name="location" value={2} regionTab="mt-3">Locations</Tab>
                <!-- Tab Panels --->
                <svelte:fragment slot="panel">
                    {#if tabSet === 0}
                        {data?.npc?.sex}
                        {data?.npc?.race}
                    {:else if tabSet === 1}
                        {data?.npc?.info}
                    {:else if tabSet === 2}
                    <p class="break-words">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dicta laboriosam tempore placeat sapiente nam assumenda, eligendi facilis quaerat vitae. Cumque consectetur exercitationem doloremque cupiditate molestias iure sapiente cum obcaecati.
                    
                    </p>
                        
                    {/if}
                </svelte:fragment>
            </TabGroup>
        </div>
    </article>
</main>

<style lang="postcss">
    p{
	text-shadow: 2px 2px black;
 }
</style>