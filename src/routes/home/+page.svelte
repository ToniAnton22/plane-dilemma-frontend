<script>
    import {onDestroy, onMount} from "svelte"
    import {databaseLoading} from "$lib/loadingStore.js"
	import LoadingScreen from "../LoadingScreen.svelte"
    import {invalidateAll} from "$app/navigation"
    import {browser} from "$app/environment"
    import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
    import DrawerData from "$lib/components/DrawerData.svelte"
    export let data

   
    $: currentPathName = browser && window.location.pathname || '/home'
    $: $databaseLoading

    const delay = ms => new Promise(res =>  setTimeout(checkDb,ms))
    async function checkDb(){
        console.log("In delay")
        invalidateAll()
    }
    onMount(() =>{
        if($databaseLoading == true ){
            console.log("checking db")
            delay(10000)
            
        }
        
    })
    console.log(data)
    const drawerStore = getDrawerStore()
    $: {
    drawerStore.update(currentState =>{
        return {...currentState, id: '0' || '0'}
    })
}
	

</script>

<img class="w-full h-screen absolute bg-fixed bg-cover -z-20 brightness-75 blur-0" src="Ethereal_plane.jpg" alt="Ethereal Plane"/>
{#if $databaseLoading == true}
    <LoadingScreen/>
{/if}
<div class="w-full h-full">
    <div class="container mx-auto px-2">
    <h1 class="text-3xl uppercase py-10 text-orange-500">Player Information! </h1>
    <div class="flex flex-col xl:flex-row w-full h-full items-center align-center border-l-4 border-orange-600 space-y-12">
        <div class="flex flex-col w-full h-full space-y-12 justify-center xl:justify-start">
            
            <a class="flex items-center w-3/4 h-24 my-4 xl:my-0 mx-4 rounded-full transition ease-in-out delay-75 bg-zinc-700 opacity-80 hover:scale-110 hover:bg-indigo-400 duration-300 bg-contain bg-no-repeat border-2 border-l-0 border-stone-800 hover:border-stone-400" 
            href="/home/players">
                <img src="/images/players/card-image.png" class="w-32 h-32 object-cover rounded-full justify-center border-4 border-stone-500" alt="Players">
                <div class="w-full">
                    <div class="card-header text-2xl mb-4 border-b justify-center">Players</div>
                    <div class="card-footer hidden sm:block ">See details on the players, and how they currently stand in the story!</div>
                </div>
            </a>
            <a class="flex items-center w-3/4 h-24 my-4 xl:my-0 mx-4 rounded-full transition ease-in-out delay-75 bg-zinc-700 opacity-80 hover:scale-110 hover:bg-indigo-400 duration-300 bg-contain bg-no-repeat border-2 border-l-0 border-stone-800 hover:border-stone-400"  href="/home/npcs">
                <img src="/images/npcs/Arkane-Krafter.jpg" class="w-32 h-32 object-cover rounded-full justify-center border-4 border-stone-500" alt="NPCS">
                <div class="w-full">
                    <div class="card-header text-2xl mb-4 border-b">NPCS</div>
                    
                    <div class="card-footer hidden sm:block "> Details about the NPCS met in this world. </div>
                </div>
            </a>
        </div>
        <div class="flex flex-col w-full h-full space-y-12 justify-center xl:justify-start">
            <a class="flex items-center w-3/4 h-24 my-4 xl:my-0 mx-4 rounded-full transition ease-in-out delay-75 bg-zinc-700 opacity-80 hover:scale-110 hover:bg-blue-400 duration-300 bg-contain bg-no-repeat border-2 border-l-0 border-stone-800 hover:border-stone-400" href="/home/map">
                <img src="/card_map.png" class="w-32 h-32 object-cover rounded-full justify-center border-4 border-stone-500" alt="NPCS">
                <div class="w-full">
                    <div class="card-header text-2xl mb-4 border-b">Maps</div>
                    <div class="card-footer hidden sm:block "> View the map of the continent of Raphal. </div>
                </div>
            </a>
            <a class="flex items-center w-3/4 h-24 my-4 xl:my-0 mx-4 rounded-full transition ease-in-out delay-75 bg-zinc-700 opacity-80 hover:scale-110 hover:bg-green-600 duration-300 bg-contain bg-no-repeat border-2 border-l-0 border-stone-800 hover:border-stone-400" href="/home/sessions">
                <img src="/card_session.png" class="w-32 h-32 object-cover rounded-full justify-center border-4 border-stone-500" alt="NPCS">
                
                <div class="w-full">
                    <div class="card-header text-2xl mb-4 border-b">Sessions</div>
                    <div class="card-footer hidden sm:block "> Give yourself time to remember what happened last session! </div>    
                </div>
                
            </a>
        </div>
    </div>

    <h1 class="text-3xl uppercase my-10 text-red-500">Utilitise for DM</h1>
    <div class="border-l-4 border-red-500">
        <h1 class="px-4"> IN PROGRESS</h1>
    </div>
 
    <h1 class="text-3xl uppercase my-10 text-amber-200">Other </h1>

    <div class="flex flex-row w-full justify-center xl:justify-start border-l-4 border-amber-200">
        <a class="flex items-center w-3/4 h-24 my-4 xl:my-0 mx-4 rounded-full transition ease-in-out delay-75 bg-zinc-700 opacity-80 hover:scale-110 hover:bg-orange-950 duration-300 bg-contain bg-no-repeat border-2 border-l-0 border-stone-800 hover:border-stone-400" href="/home/context">
            <img src="/context.png" class="w-32 h-32 object-cover rounded-full justify-center border-4 border-stone-500" alt="context">
            <div class="w-full">
                <div class="card-header text-2xl mb-4 border-b">Context</div>
                <div class="card-footer hidden sm:block"> Read important bullet points gathered! </div>
            </div>
        </a>
    </div>
    </div>
    
</div>
<div class="">

</div>

<style lang="scss">
 
</style>