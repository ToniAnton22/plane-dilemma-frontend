<script>
    import { onMount } from 'svelte';
    import {Tab, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
    import DetailsComponent from './DetailsComponent.svelte';
    export let town; // The town data is passed as a prop

    console.log(town)
  let canvas;
  let ctx;
  let details
  let image = '10';
  let info = '0';
  let tabSet = 0;
  let isDetails;
  let isEvents;
  let isPopulation;
  let isImage;

  onMount(() => {
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = town?.image; // Assuming 'town.Image' holds the URL to the town's image
    img.onload = () => {
      // Resize canvas to fill the screen width while maintaining aspect ratio
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Additional text drawing can go here
      ctx.fillStyle = 'white'; // Text color
      ctx.font = '24px Arial'; // Text size and font
      ctx.fillText(`Name: ${town?.name}`, 10, 30); // Example text
      // Add more text for other town properties as needed
    };
  });

  const changeDetails= () =>{
    if(isImage){
      image= '20'
      info = '0'
    }else if(isDetails){
      image= '0'
      info = '10'
      details = {name:town?.name, elevation:town?.elevation, state:town?.state}
    }else if(isEvents){
      image= '0'
      info = '10'
      details = {events:town?.events}
    }else if(isPopulation){
      image= '0'
      info = '10'
      details = {population:town?.population, culture:town?.culture, religion:town?.religion}
    }
    console.log(isDetails,isEvents,isPopulation,isImage)
    console.log(image,info)

  }
  </script>
  <div class="flex flex-row-reverse h-full">
    <div class="flex-0 w-full h-full">
      <img class="absolute w-full h-full z-{image} " src={town?.image} alt={town?.name}/>
      <div class="absolute bg-black opacity-40 w-full h-full z-{info}">
      </div>
      <div class="absolut bg-transparent w-full h-full z-{info}">
        <DetailsComponent {details}/>
      </div>
    </div>
    <div class="variant-soft-tertiary flex flex-col h-full">
      <button on:click={() =>{
        isDetails= true
        isEvents = false
        isImage = false
        isPopulation = false
        changeDetails()
        }}
        class="m-4 p-4 mr-0 pr-0 border-2 border-r-0 rounded-l-3xl border-green-300 focus:bg-amber-100 focus:text-black focus:border-sky-400"> Details </button>
      <button on:click={()=>{
        isEvents = true
        isDetails = false
        isImage = false
        isPopulation = false
        changeDetails()
        }} 
        class="m-4 p-4 mr-0 pr-0 border-2 border-r-0 rounded-l-3xl border-green-300 focus:bg-amber-100 focus:text-black focus:border-sky-400"> Events </button>
      <button on:click={() =>{
        isPopulation= true
        isDetails = false
        isEvents = false
        isImage = false
        changeDetails()
        }} 
        class="m-4 p-4 mr-0 pr-0 border-2 border-r-0 rounded-l-3xl border-green-300 focus:bg-amber-100 focus:text-black focus:border-sky-400"> Population </button>
      <button on:click={() =>{
        isImage = true
        isDetails = false
        isEvents = false
        isPopulation = false
        changeDetails()
        }}
         class="m-4 p-4 mr-0 pr-0 border-2 border-r-0 rounded-l-3xl border-green-300 focus:bg-amber-100 focus:text-black focus:border-sky-400"> Image </button>
    </div>

  </div>
  
