<!-- Map.svelte -->
<script>
    import mapboxgl, {Map} from 'mapbox-gl'
	import { onMount, onDestroy } from 'svelte';
	import {addFilterClasses} from "$lib/addFilterClasses"
	import {popupString} from "$lib/popup"
	
	export let data;
	console.log(data)
	let markers = []
	let marker;

	let showMarkers= true;
    const url = import.meta.env.VITE_URL
    const token = import.meta.env.VITE_PUBLIC_TOKEN
	const terrain = import.meta.env.MAPBOX_TERRAIN
    let map;
    export let mapContainer;
    let lng, lat, zoom;

    lng = -51.378679;
    lat = -13.319458;
    zoom = 4;

	$: markers.forEach(marker =>{
		const element = marker.getElement();
		
		if(showMarkers){
			element.style.display= "block"
		}else{
			element.style.display= "none"
		}
	})
    // Your Mapbox access token
    function updateData() {
    	zoom = map.getZoom();
    	lng = map.getCenter().lng;
    	lat = map.getCenter().lat;
	}

	function applyCLasses(town, filter){
		console.log(town.image)
		let popupHtml = addFilterClasses(town,town?.image)

		let el = document.createElement("div")
		if(town?.capital){
			marker = new mapboxgl.Marker({element:el})
			.setLngLat([town?.longitude, town?.latitude])
			.addClassName("capital")
			.setPopup(new mapboxgl.Popup().setHTML(`${popupHtml}`))
			.addTo(map)

			markers.push(marker)
			return
		}
		if(town?.port){
			marker = new mapboxgl.Marker({element:el})
			.setLngLat([town?.longitude, town?.latitude])
			.addClassName("port")
			.setPopup(new mapboxgl.Popup().setHTML(`${popupHtml}`))
			.addTo(map)
			markers.push(marker)
			return
		}
	
		marker = new mapboxgl.Marker({element:el})
		.setLngLat([town?.longitude, town?.latitude])
		.addClassName("town")
		.setPopup(new mapboxgl.Popup().setHTML(`${popupHtml}`))
		.addTo(map)

		markers.push(marker)
	}

	onMount(async() => {
		const initialState = { lng: lng, lat: lat, zoom: zoom };
		map = new Map({
			container: mapContainer,
			accessToken: token,
			style: `mapbox://styles/tonianton22/clpyc1via01jg01qtemq9c4ao`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom,
			refreshExpiredTiles:false,
		});
		map.on('move', () => {
			updateData();
		})
		map.on("load", async () =>{
			data?.towns?.forEach(town =>{
			
			let filters = [{
				capital:town?.capital,
				shanty:town?.shanty_Town,
				port:town?.port,
				icon:town?.icon
			}]

			applyCLasses(town,filters)
	
		});

		markers = markers
		})
	});
	onDestroy(()=>{
		if (map){
			map.remove()
		}
	})
</script>

<div>
	<div class="sidebar">
		Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom: {zoom.toFixed(
			2
		)}
		
	</div>
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