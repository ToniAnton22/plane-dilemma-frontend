<script>

</script>

<img class="w-full h-screen absolute bg-fixed bg-cover -z-10 brightness-75 blur-0" src="Ethereal_plane.jpg" alt="Ethereal Plane"/>
<div class="w-full h-full">
    <div class="container mx-auto px-2">
        <h1 class="text-3xl uppercase py-10">Player Information! </h1>
    <div class="flex flex-col xl:flex-row w-full h-full items-center align-center !border-t-8 border-stone-900 !border-opacity-40 !rounded-t-lg">
        <div class="flex flex-row w-full justify-center xl:justify-start variant-ghost-surface rounded-l-lg">
            <a class="card w-72 h-96 my-4 xl:my-0 rounded-full mx-4 xl:mr-4 p-0 space-x-0 transition ease-in-out delay-75 variant-glass-primary card-hover hover:scale-110 hover:bg-red-400 duration-300 bg-[url('images/players/card-image.png" 
            href="/home/players">
                <img src="/images/players/card-image.png" class="w-full h-36 object-cover" alt="Players">
                <div class="card-header text-2xl mb-4">Players</div>
                <div class="card-footer">See details on the players, and how they currently stand in the story!</div>
            </a>
            <a class="card w-72 h-96 my-4 xl:my-0 mx-4 rounded-full transition ease-in-out delay-75 variant-glass-primary card-hover hover:scale-110 hover:bg-indigo-400 duration-300 bg-contain bg-no-repeat"  href="/home/npcs">
                <img src="/images/npcs/Arkane-Krafter.jpg" class="w-full h-36 object-cover" alt="NPCS">
                <div class="card-header text-2xl mb-4">NPCS</div>
                <div class="card-footer "> Details about the NPCS met in this world. </div>
            </a>
        </div>
        <div class="flex flex-row w-full justify-center xl:justify-end variant-ghost-primary rounded-r-lg">
            <a class="card w-72 h-96 my-4 xl:my-0 mx-4 rounded-full transition ease-in-out delay-75 variant-glass-primary card-hover hover:scale-110 hover:bg-cyan-600 duration-300" href="/home/map">
                <img src="/card_map.png" class="w-full h-36 object-cover" alt="NPCS">
                <div class="card-header text-2xl mb-4">Maps</div>
                <div class="card-footer"> View the map of the continent of Raphal. </div>
            </a>
            <a class="card w-72 h-96 my-4 xl:my-0 mx-4 rounded-full xl:ml-4 transition ease-in-out delay-75 variant-glass-primary card-hover hover:scale-110 hover:bg-stone-500 duration-300" href="/home/sessions">
                <img src="/card_session.png" class="w-full h-36 object-cover" alt="NPCS">
                <div class="card-header text-2xl mb-4">Sessions</div>
                <div class="card-footer"> Give yourself time to remember what happened last session! </div>
            </a>
        </div>
    </div>
    <div class="!border-t-8 border-stone-900 !border-opacity-40" ></div>
    <h1 class="text-3xl uppercase my-10">Utilitize for DM</h1>
    <div class="!border-t-8 border-stone-900 !border-opacity-40" ></div>
    <div>
        <h1> IN PROGRESS</h1>
    </div>
    <div class="!border-t-8 border-stone-900 !border-opacity-40 p-2" ></div>
    <h1 class="text-3xl uppercase my-10">Other </h1>
    <div class="!border-t-8 border-stone-900 !border-opacity-40 p-2" ></div>
    <div class="flex flex-row w-full justify-center xl:justify-start ">
        <a class="card w-72 h-96 my-4 xl:my-0 mx-4 rounded-full xl:ml-4 transition ease-in-out delay-75 variant-glass-primary card-hover hover:scale-110 hover:bg-stone-500 duration-300" href="/home/context">
            <img src="/context.png" class="w-full h-36 object-cover" alt="context">
            <div class="card-header text-2xl mb-4">Context</div>
            <div class="card-footer "> Dive and read about important bullet points to know the customs of the places you've been to! </div>
        </a>
    </div>
    </div>
    
</div>
<div class="">

</div>

<style lang="scss">
    @keyframes banner-animation{
        0%{
            transform: translateY(8px);

        }
        100%{
            transform: translateY(-8px);
   
        }
    }
    .flag {
        position: relative;

    }

    .flag::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: 400% 100%;
        animation: banner-animation 2s linear infinite;
    }

    .column{
        &::first-child{
            border-top-left-radius:8px;
            border-bottom-left-radius:8px;
            overflow: auto;
        };

        &::last-child{
            border-top-right-radius:8px;
            border-bottom-right-radius:8px;
            overflow: auto;
        };
        animation: banner-animation 2s linear infinite;
        animation-direction: alternate;
        animation-timing-function: ease-in-out;
        animation-fill-mode:backwards;
    }

    

   .animation-flag{
        animation: banner-animation;
        animation-duration: 3s;
        animation-iteration-count: infinite;
   }
   @for $i from 1 through 4 {
        .column:nth-child(#{$i}){
            animation-delay: $i*100ms;
        }
   }
</style>