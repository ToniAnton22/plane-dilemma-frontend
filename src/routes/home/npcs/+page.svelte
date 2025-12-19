<script>
    import Book from '$lib/components/Book.svelte';
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
    
    // Split NPCs between left and right pages
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

<a href="/home" class="absolute top-0 left-1 w-[5vw] h-[10vh] m-3 md:w-12 md:h-12 z-40 hover:pointer">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>

<Book {data} {snippetLeft} {snippetRight} textLeft={npcsLeft} textRight={npcsRight} />

{#snippet snippetLeft(page)}
    <main class="relative h-full">
        {#if page === 0}
            <!-- First page - Search Interface -->
            <div class="p-8 md:p-12 h-full overflow-y-auto">
                <h1 class="text-3xl md:text-4xl font-bold text-center mb-4 font-serif text-[#2c2416] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
                    NPCS
                </h1>
                
                <div class="w-full h-[2px] mb-6 mx-auto max-w-[400px] bg-gradient-to-r from-transparent via-[#2c2416] to-transparent"></div>
                
                <p class="text-center mb-8 text-lg font-serif text-[#3d3020]">
                    Details about the NPCs met in this world.
                </p>
                
                <div class="mb-6">
                    <label for="npc-search" class="block text-lg mb-2 font-semibold font-serif text-[#2c2416]">
                        Search for NPC
                    </label>
                    <input 
                        id="npc-search"
                        class="w-full p-3 font-bold font-serif text-[#2c2416] text-base focus:outline-none focus:border-stone-800 focus:bg-zinc-200/40"
                        placeholder="Enter name..." 
                        bind:value={filter}
                    />
                </div>
                
                <div class="text-center text-sm font-serif text-[#3d3020]">
                    {#if filter}
                        <p class="text-shadow">Found {filteredNpcs.length} NPC{filteredNpcs.length !== 1 ? 's' : ''}</p>
                    {:else}
                        <p class="text-shadow">Total NPCs: {data.npcs.length}</p>
                    {/if}
                </div>
                
                <div class="mt-8 text-center font-serif text-[#3d3020]">
                    <p class="text-sm italic text-shadow">Turn the page to view results →</p>
                </div>
            </div>
        {:else}
            <!-- Subsequent pages - NPC Details -->
            <div class="w-full h-full relative">
                {#if npcsLeft[page]}
                    <div class="p-8 md:p-12 h-full overflow-y-auto">
                        <h2 class="text-2xl md:text-3xl font-bold text-center mb-4 font-serif text-[#2c2416] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
                            {npcsLeft[page].name}
                        </h2>
                        
                        <div class="w-full h-[2px] mb-6 mx-auto max-w-[300px] bg-gradient-to-r from-transparent via-[#2c2416] to-transparent"></div>
                        
                        {#if npcsLeft[page].race || npcsLeft[page].class}
                            <div class="text-center mb-4 font-serif text-[#3d3020]">
                                <p class="text-sm italic text-shadow">
                                    {#if npcsLeft[page].race}{npcsLeft[page].race}{/if}
                                    {#if npcsLeft[page].race && npcsLeft[page].class} • {/if}
                                    {#if npcsLeft[page].class}{npcsLeft[page].class}{/if}
                                </p>
                            </div>
                        {/if}
                        
                        {#if npcsLeft[page].description}
                            <div class="mb-6">
                                <h3 class="text-lg font-bold mb-2 font-serif text-[#2c2416] text-shadow">Description</h3>
                                <p class="text-sm font-serif text-[#3d3020] leading-relaxed text-shadow indent-8">
                                    {npcsLeft[page].description}
                                </p>
                            </div>
                        {/if}
                        
                        {#if npcsLeft[page].location}
                            <div class="mb-6">
                                <h3 class="text-lg font-bold mb-2 font-serif text-[#2c2416] text-shadow">Location</h3>
                                <p class="text-sm font-serif text-[#3d3020] text-shadow">
                                    {npcsLeft[page].location}
                                </p>
                            </div>
                        {/if}
                        
                        {#if npcsLeft[page].notes}
                            <div class="mb-6">
                                <h3 class="text-lg font-bold mb-2 font-serif text-[#2c2416] text-shadow">Notes</h3>
                                <p class="text-sm font-serif text-[#3d3020] leading-relaxed text-shadow">
                                    {npcsLeft[page].notes}
                                </p>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        {/if}
    </main>
{/snippet}

{#snippet snippetRight(page)}
    <main class="relative h-full">
        {#if npcsRight[page]}
            <div class="w-full h-full relative">
                <div class="p-8 md:p-12 h-full overflow-y-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-center mb-4 font-serif text-[#2c2416] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
                        {npcsRight[page].name}
                    </h2>
                    
                    <div class="w-full h-[2px] mb-6 mx-auto max-w-[300px] bg-gradient-to-r from-transparent via-[#2c2416] to-transparent"></div>
                    
                    {#if npcsRight[page].race || npcsRight[page].class}
                        <div class="text-center mb-4 font-serif text-[#3d3020]">
                            <p class="text-sm italic text-shadow">
                                {#if npcsRight[page].race}{npcsRight[page].race}{/if}
                                {#if npcsRight[page].race && npcsRight[page].class} • {/if}
                                {#if npcsRight[page].class}{npcsRight[page].class}{/if}
                            </p>
                        </div>
                    {/if}
                    
                    {#if npcsRight[page].description}
                        <div class="mb-6">
                            <h3 class="text-lg font-bold mb-2 font-serif text-[#2c2416] text-shadow">Description</h3>
                            <p class="text-sm font-serif text-[#3d3020] leading-relaxed text-shadow indent-8">
                                {npcsRight[page].description}
                            </p>
                        </div>
                    {/if}
                    
                    {#if npcsRight[page].location}
                        <div class="mb-6">
                            <h3 class="text-lg font-bold mb-2 font-serif text-[#2c2416] text-shadow">Location</h3>
                            <p class="text-sm font-serif text-[#3d3020] text-shadow">
                                {npcsRight[page].location}
                            </p>
                        </div>
                    {/if}
                    
                    {#if npcsRight[page].notes}
                        <div class="mb-6">
                            <h3 class="text-lg font-bold mb-2 font-serif text-[#2c2416] text-shadow">Notes</h3>
                            <p class="text-sm font-serif text-[#3d3020] leading-relaxed text-shadow">
                                {npcsRight[page].notes}
                            </p>
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <!-- Last page or empty -->
            <div class="p-8 md:p-12 h-full flex items-center justify-center">
                <p class="text-center text-lg italic font-serif text-[#5d5040] text-shadow">
                    End of NPCs
                </p>
            </div>
        {/if}
    </main>
{/snippet}

<style lang="postcss">
    .text-shadow {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
</style>