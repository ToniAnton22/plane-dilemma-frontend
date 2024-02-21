<script>
    import mapboxgl, { Map } from 'mapbox-gl';
    import { onMount, onDestroy } from 'svelte';
    import { addFilterClasses } from "$lib/addFilterClasses";
    import { goto, afterNavigate } from "$app/navigation";
    import {getDrawerStore} from "@skeletonlabs/skeleton"
    export let data; // Assuming this is the prop received from load

    const drawerStore = getDrawerStore()
    let map;
    export let mapContainer;
    let lng = -51.378679, lat = -13.319458, zoom = 4;
    let markers = [];
	let token = import.meta.env.VITE_PUBLIC_TOKEN
    let mapStyle = import.meta.env.VITE_MAP_STYLE
    // Reactive statement to handle towns updates

    const towns = data?.towns
    function updateMarkers() {
        // Clear existing markers first
        markers.forEach(marker => marker.remove());
        markers = [];

        // Add new markers
        towns.forEach(town => applyClasses(town));
    }

    function applyClasses(town) {
        
		let popupHtml = addFilterClasses(town, town?.image);

        let el = document.createElement(`div`);
        el.setAttribute("id",`town${town?.id}`)
		let capital = town?.capital?.trim()
		let marker;
        console.log(town?.image)
		if(capital){
			marker = new mapboxgl.Marker({ element: el })
            .setLngLat([town?.longitude, town?.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
            .addClassName('capital')
            .addTo(map);
		}
		if(town?.port && !town?.capital){
			marker = new mapboxgl.Marker({ element: el })
            .setLngLat([town?.longitude, town?.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
			.addClassName('port')
            .addTo(map);

		}
		if(!town?.port && !town?.capital){
			marker = new mapboxgl.Marker({ element: el })
            .setLngLat([town?.longitude, town?.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
			.addClassName('town')
            .addTo(map);
		}

        marker.getElement().addEventListener('click',(e) => {
            console.log(town) 
            console.log(e)
            drawerStore.update(currentState =>{
                console.log(town?.image)
                return {...currentState, id: '2', town}
            })
            })
 
        return markers.push(marker);
    }

    onMount(() => {
        mapboxgl.accessToken = import.meta.env.VITE_PUBLIC_TOKEN;
        map = new Map({
            container: mapContainer,
			accessToken: token,
            style: mapStyle,
            center: [lng, lat],
            zoom: zoom,
            refreshExpiredTiles: false,
        });
        updateMarkers()
    });
	if(map){
	
	}
    onDestroy(() => {
        if (map) map.remove();
    });
</script>

<div>
    <div class="sidebar">Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom: {zoom.toFixed(2)}</div>
    <div class="map-wrap">
        <div class="map" bind:this={mapContainer} />
    </div>
</div>

<a href="/home" class="absolute w-12 h-12 m-6 pt-2 hover:pointer">
	<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"></path>
	</svg>
</a> 

<style>
	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.sidebar {
		background-color: rgb(35 55 75 / 90%);
		color: #fff;
		padding: 6px 12px;
		font-family: monospace;
		z-index: 1;
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 12px;
		border-radius: 4px;
	}
</style>