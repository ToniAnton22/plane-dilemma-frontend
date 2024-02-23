<script>
    import {TableOfContents, tocCrawler,getDrawerStore} from "@skeletonlabs/skeleton"
    export let data;
    let state = "fixed"
    let buttonColor = 'bg-gradient-to-br variant-gradient-primary-secondary'
    $: isVisibile = false;
    const drawerStore = getDrawerStore()

    function toggleTable(){
        if(isVisibile){
            isVisibile = false
            buttonColor = 'bg-gradient-to-br variant-gradient-primary-secondary'
            state = 'fixed'
        }else{
            isVisibile = true
            buttonColor = 'bg-gradient-to-br variant-gradient-warning-error'
            state="absolute"
        }
    }

    $: { 
        console.log("I change")
        drawerStore.update(currentState =>{
            return{...currentState, id:'1' || '0'}
        })
    }
    
   
</script>
<a href="/home" class="absolute bottom-0 right-0 w-[5vw] h-[10vh] m-3 md:w-12 md:h-12 z-40 hover:pointer">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>
<img src="/images/ThePlanesEdited.png" class="absolute bg-cover bg-scroll brightness-[0.25] opacity-80 w-screen h-screen" alt="Planes revisioned"/>
<main class="bg-no-repeat bg-cover bg-fixed w-screen h-full">
    <div class="absolute right-0">
        <div class="sticky top-0 z-30">
            <div class="flex flex-row-reverse justify-center align-center mt-4">
                <button on:click={toggleTable} class="{buttonColor} rounded-sm sm:p-2 h-fit w-fit mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </button>
            {#if isVisibile}
                <div class="border-t-[9px] border-t-transparent border-b-[9px] border-l-[15px] border-b-transparent w-0 h-0 mt-3 border-slate-500"></div>
                <div class="bg-slate-500 rounded-3xl rounded-r-none w-[60vw] h-[60vh] overflow-scroll">
                    <TableOfContents class="flex flex-col justify-center items-center" regionListItem="font-bold" regionList="text-white px-2 flex flex-col justify-center items-center"></TableOfContents>
                </div>
            {/if}
            </div>
            
        </div>
    </div>
    <article class="flex flex-row gap-6 w-[90vw] mx-auto md:flex-row relative">
        <div use:tocCrawler={{mode:'generate'}} class="flex flex-col grow w-full relative">
            {#each data.summaries as summary}
            <div class="card flex flex-col grow w-full relative variant-ghost-error">
                <h2 class="mx-auto right-0 left-0 text-3xl underline p-4 text-center">{summary?.title}</h2>

                <div class="w-full flex flex-col mx-6 px-6 text-amber-300 items-center ">
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
