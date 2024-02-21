<script>
     import { Drawer, getDrawerStore, Accordion, AccordionItem, RadioItem } from '@skeletonlabs/skeleton';
     export let data;
     let filter

     const drawerStore = getDrawerStore();
    

    let content = data?.context
    
    function filterContent(filter) {
        
        if(!filter){
            content = data?.context
        }else{
            content = data?.context.filter((p) =>
            { 
                return (p.title.toLowerCase().includes(filter.toLowerCase()) || p.info.toLowerCase().includes(filter.toLowerCase()))
            }) 
      }
      
    }

    
  </script>
 
<a href="/home" class="absolute bottom-0 right-0 w-12 h-12 m-6 pt-2 hover:pointer z-20">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a> 
<img src="/images/yonal-writing.png" class="absolute w-full h-full bg-cover bg-scroll -z-10 brightness-50" alt="Yonal writing"/>
<div class="flex-col w-screen h-fit variant-ghost-primary p-4">
    <div class="flex flex-initial">
        <button class="flex flex-initial flex-col variant-ghost-surface p-5 shadow-md gap-y-3.5 items-center justify-center hover:bg-green-200 hover:text-stone-600"on:click={() => drawerStore.open(drawerStore.id)}>Select content</button>
        <input class="flex-1 bg-gradient-to-r from-slate-500 from-20% via-zinc-300 via-40% to-stone-600" placeholder="Search for info" bind:value={filter} on:input={(i) => filterContent(filter)} >
    </div>
    
    <div class="flex-1 m-2 p-4">
        <Accordion class="flex-col variant-ghost-secondary" autocollapse>
            {#each content as p}
                <AccordionItem regionPanel="font-bold text-xl text-stone-100 " class="text-2xl">
                    <svelte:fragment slot="summary">{p.title}</svelte:fragment>
                    <svelte:fragment slot="content">
                        {#each p.info.split("/n") as sentence}
                          <p class="font-serif">{sentence}</p>
                          <br>
                        {/each} 
                </svelte:fragment>
                </AccordionItem>
            {/each}
        </Accordion>
    </div>

</div>

<style lang="postcss">
    p{
	text-shadow: 2px 2px black;
    }
   
 </style>