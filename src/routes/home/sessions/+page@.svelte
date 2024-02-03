<script>
    import {TableOfContents, tocCrawler,getDrawerStore} from "@skeletonlabs/skeleton"
    export let data;

    const drawerStore = getDrawerStore()



    $: { 
        console.log("I change")
        drawerStore.update(currentState =>{
            return{...currentState, id:'1' || '0'}
        })
    }
    
   
</script>
<a href="/home" class="absolute bottom-0 right-0 w-12 h-12 m-5 z-40 hover:pointer">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>
<img src="/images/ThePlanesEdited.png" class="absolute bg-cover bg-scroll brightness-[0.25] opacity-80 w-screen h-screen" alt="Planes revisioned"/>
<main class="bg-no-repeat bg-cover bg-fixed w-screen h-full">
    <article class="flex flex-row gap-6 md:flex-row relative">
 
        <div use:tocCrawler={{mode:'generate'}} class="flex flex-col grow w-96 relative">
            {#each data.summaries as summary}
            <div class="card flex flex-col grow w-full relative variant-ghost-error">
                <h2 class="mx-auto right-0 left-0 text-3xl underline p-4 text-center">{summary?.title}</h2>

                <div class="w-full flex md:flex-row flex-col mx-6 px-6 text-amber-300">
                    <div class="flex flex-col w-3/4">
                    {#each summary?.description.split('/n') as sentence}
                
                        <p class="text-start leading-relaxed font-bold first-letter:text-3xl font-mono first-letter:font-courgette courgette z-20 pb-3">{sentence}</p>
                
                    {/each}
                    </div>
                    {#if summary?.link.startsWith("https")}
                    <a class="card text-center flex flex-col shrink md:w-1/4 w-full md:visible p-2 scale-75 hover:scale-100 variant-glass-primary h-fit text-white font-bold hover:bg-cyan-200 hover:text-black rounded-full" href='{summary?.link}'>
                        Youtube video:
                        <span class="font-bold" >
                            {summary?.title}
                        </span>
                    </a>
                    {/if}
                 
                </div>
            </div>
            {/each}
        </div>
    </article>
</main>

<style>
    .custom-stick{
        position: -webkit-sticky;
        position:sticky;
        height:min-content;
        top:0;
    }
    .courgette::first-letter{
        font-family: Courgette;
        color: red;
    }
    p{
        text-shadow: 2px 2px black;
    }
</style>
