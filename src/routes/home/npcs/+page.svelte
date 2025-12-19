<script>
    import Book from '$lib/components/Book.svelte';
    import NpcPage from '$lib/components/NpcPage.svelte';
    
    let { data } = $props();

    let filter = $state("");
    
    const filteredNpcs = $derived.by(() => {
        if(!filter){
            return data.npcs;
        }
        return data.npcs.filter((npc) => {
            return npc.name.toLowerCase().includes(filter.toLowerCase());
        });
    });
    
    // Split NPCs between left and right pages (2 per page spread)
    let { npcsLeft, npcsRight } = $derived.by(() => {
        const left = [true]; // First page is the search/intro
        const right = [];
        
        filteredNpcs.forEach((npc, index) => {
            if (index % 2 === 1) {
                left.push(npc);
            } else {
                right.push(npc);
            }
        });
        
        return { npcsLeft: left, npcsRight: right };
    });
</script>


<a href="/home" class="absolute top-6 left-6 z-40 group" aria-label="Return to home">
    <div class="relative w-16 h-16 flex items-center justify-center">
 
        <div class="absolute inset-0 rounded-full border-2 border-amber-800/60 
                    group-hover:border-amber-600 transition-all duration-300
                    group-hover:shadow-lg group-hover:shadow-amber-900/50
                    bg-gradient-to-br from-amber-100/80 to-amber-200/60"></div>
        

        <svg
            class="w-8 h-8 relative z-10 text-amber-900 group-hover:text-amber-700 
                   transition-all duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        
        <div class="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-900/40 
                    group-hover:border-amber-700 transition-colors"></div>
        <div class="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-900/40 
                    group-hover:border-amber-700 transition-colors"></div>
    </div>
    

    <span class="absolute left-20 top-1/2 -translate-y-1/2 
                 bg-amber-900/90 text-amber-100 px-3 py-1 rounded
                 text-sm whitespace-nowrap
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                 pointer-events-none"
          style="font-family: 'Courgette', cursive;">
        Return to Table of Contents
    </span>
</a>

<Book {data} {snippetLeft} {snippetRight} textLeft={npcsLeft} textRight={npcsRight} />

{#snippet snippetLeft(page)}
    <main class="relative h-full overflow-auto">
        {#if page === 0}
            <div class="h-full flex items-center justify-center relative">
                <div class="absolute inset-0 bg-cover bg-center brightness-[0.25] opacity-80 
                           bg-[url('/images/background/ancient-library.jpg')]"></div>
                
                <div class="relative z-10 px-12 py-8 w-full">
                    <h1 class="text-5xl text-center mb-6" 
                        style="font-family: 'Great Vibes', cursive; color: #3d2817;">
                        <div class="relative inline-block">
                            <span class="before:content-['✦'] before:absolute before:-left-12 before:top-1/2 before:-translate-y-1/2 before:text-3xl
                                       after:content-['✦'] after:absolute after:-right-12 after:top-1/2 after:-translate-y-1/2 after:text-3xl">
                                NPCs
                            </span>
                        </div>
                    </h1>
                    
                    <div class="h-1 w-32 mx-auto mb-8 bg-gradient-to-r from-transparent via-amber-800 to-transparent"></div>
                    
                    <p class="text-center mb-12 text-lg leading-relaxed" 
                       style="font-family: 'Courgette', cursive; color: #4a3728;">
                        A compendium of souls encountered<br/>throughout your journey
                    </p>
                    
                    <div class="mb-8">
                        <label for="npc-search" 
                               class="block text-xl mb-3 text-center" 
                               style="font-family: 'Courgette', cursive; color: #3d2817;">
                            Search for a Soul
                        </label>
                        <div class="relative max-w-md mx-auto">
                            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-800 pointer-events-none" 
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input 
                                id="npc-search"
                                class="w-full py-3 pl-12 pr-4 rounded-full border-2 border-amber-800/40
                                       bg-amber-50/20 backdrop-blur-sm
                                       focus:outline-none focus:border-amber-700 focus:bg-amber-50
                                       transition-all duration-300"
                                style="font-family: 'Quicksand', sans-serif; color: #3d2817;"
                                placeholder="Enter name..." 
                                bind:value={filter}
                            />
                        </div>
                    </div>
                    
                    <div class="text-center mb-8" 
                         style="font-family: 'Courgette', cursive; color: #4a3728;">
                        {#if filter}
                            <p class="text-lg">
                                ✦ Found {filteredNpcs.length} Soul{filteredNpcs.length !== 1 ? 's' : ''} ✦
                            </p>
                        {:else}
                            <p class="text-lg">
                                ✦ {data.npcs.length} Souls Recorded ✦
                            </p>
                        {/if}
                    </div>
                    
                    <div class="text-center" 
                         style="font-family: 'Courgette', cursive; color: #5d5040;">
                        <p class="text-sm italic animate-pulse">
                            Turn the page to view →
                        </p>
                    </div>
                </div>
            </div>
        {:else}
            <div class="w-full h-full relative flex items-center justify-center p-8">
                {#if npcsLeft[page]}
                    <NpcPage npc={npcsLeft[page]} />
                {:else}
                    <div class="text-center" style="font-family: 'Courgette', cursive; color: #5d5040;">
                        <p class="text-xl italic">~</p>
                    </div>
                {/if}
            </div>
        {/if}
    </main>
{/snippet}

{#snippet snippetRight(page)}
    <main class="relative h-full overflow-auto">
        {#if npcsRight[page]}
            <div class="w-full h-full relative flex items-center justify-center p-8">
                <NpcPage npc={npcsRight[page]} />
            </div>
        {:else}
            <div class="h-full flex items-center justify-center">
                <div class="text-center" style="font-family: 'Great Vibes', cursive; color: #5d5040;">
                    <p class="text-4xl mb-4">✦</p>
                    <p class="text-2xl italic">End of Records</p>
                    <p class="text-xl mt-4">❖</p>
                </div>
            </div>
        {/if}
    </main>
{/snippet}

<style lang="postcss">
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }
    
    .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
    }
</style>