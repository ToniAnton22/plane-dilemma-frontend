<script>
    import {goto} from '$app/navigation'
	import Book from '$lib/components/Book.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
    
    let {data} = $props();
    let cardState = $state("list")
    //on:click={navigate(player)} style="background-image:url({player?.avatar})
    let elemCarousel = $state('')


    function carouselLeft() {
        const x = elemCarousel.scrollLeft === 0 ? elemCarousel.clientWidth * elemCarousel.childElementCount 
            : elemCarousel.scrollLeft - elemCarousel.clientWidth;
        
            elemCarousel.scroll(x,0)
    }

    function carouselRight() {
        const x = elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth ? 0 : elemCarousel.scrollLeft + elemCarousel.clientWidth
        elemCarousel.scroll(x,0)
    }

    function carouselThumbnail(index) {
	    elemCarousel.scroll(elemCarousel.clientWidth * index, 0);
    }   

    function setState(state){
        if(state !== "list"){
            cardState="list"
        }
    }
    
</script>
<a href="/home" class="absolute w-12 h-12 m-6 pt-2 hover:pointer z-[60]">
    <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</a>

<Carousel {data}/>

<style lang="postcss">

</style>


