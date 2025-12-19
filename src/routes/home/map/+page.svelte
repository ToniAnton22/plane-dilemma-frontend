<script>
	import mapboxgl, { Map } from 'mapbox-gl';
	import { addFilterClasses } from '$lib/addFilterClasses';
	import { onMount } from 'svelte';
	import TownDetails from '$lib/components/TownDetails.svelte';

	let { data } = $props();
	let playerState = $state(false);
	let groupTrack = $state([]);
	let mapContainer = $state()
	let townView = $state(false);
	let selectedTown = $state({});
	let coordinatesPlayers = $state([]);

	function getTheme(name) {
		if (name.includes('Kalahari')) return '#cad0db';
		if (name.includes('Bastion')) return '#7d83a3';
		if (name.includes('Radolack')) return '#f79d03';
		if (name.includes('Jamond')) return '#bd7df5';
		if (name.includes('Vanelis')) return '#436ff2';
		if (name.includes('Fennex')) return '#ed5e25';
	}

	function latest() {
		if (map) {
			map.jumpTo({
				center: coordinatesPlayers[0].coordinates.slice(
					coordinatesPlayers[0].coordinates.length - 1
				)[0]
			});
		}
	}

	const getGroupLatestLocation = (cord) => {
		let trackedCoordinates = [];
		let newCoord = [];
		cord.forEach((playerCord) => {
			if (trackedCoordinates.length == 0) {
				playerCord.coordinates.forEach((coordinate) => {
					trackedCoordinates.push({
						count: 1,
						coordinate: coordinate
					});
				});
			} else {
				playerCord.coordinates.forEach((tracking) => {
					for (let i = 0; i < trackedCoordinates.length; i++) {
						if (
							tracking[0] == trackedCoordinates[i].coordinate[0] &&
							tracking[1] == trackedCoordinates[i].coordinate[1]
						) {
							trackedCoordinates.count = trackedCoordinates.count + 1;
							newCoord.push(tracking);
						} else {
							trackedCoordinates.push({
								count: 1,
								coordinate: tracking
							});
						}
					}
				});
			}
		});
	};

	const playerNameList = () => {
		let playerList = [];
		return playerList;
	};

	function makePath(path, name) {
		path = path.trim();
		let paths = path.split(',');
		let coordinates = [];
		for (let i = 0; i < paths.length; i++) {
			if (paths[i].includes('`')) {
				paths[i] = paths[i].replace('`', "'");
			}
			data?.towns.towns.forEach((town) => {
				if (paths[i].toLowerCase().trim() == town?.name.toLowerCase().trim()) {
					coordinates.push([town.longitude, town.latitude]);
				}
			});
		}
		coordinatesPlayers.push({
			player: name,
			coordinates
		});
	}

	let playerList = playerNameList();
	let map;
	let playerListToggle = $state(true);
	let lng = $state(-51.378679),
		lat = $state(-13.319458),
		zoom = $state(4);
	let markers = $state([]);
	let token = import.meta.env.VITE_PUBLIC_TOKEN;
	let mapStyle = import.meta.env.VITE_MAP_STYLE;

	let towns = $derived(data?.locations);
	if (!towns) {
		throw new Error('Towns data is not available');
	}

	function updateMarkers() {
		markers.forEach((marker) => marker.remove());
		markers = [];
		towns.forEach((town) => applyClasses(town));
	}

	function applyClasses(town) {
		let popupHtml = addFilterClasses(town);
		let el = document.createElement(`div`);
		el.setAttribute('id', `town${town?.id}`);

		let capital = town?.capital?.trim();
		let marker;

		if (capital) {
			marker = new mapboxgl.Marker({ element: el })
				.setLngLat([town?.longitude, town?.latitude])
				.setPopup(new mapboxgl.Popup().setHTML(popupHtml))
				.addClassName('capital')
				.addTo(map);
		}
		if (town?.port && !town?.capital) {
			marker = new mapboxgl.Marker({ element: el })
				.setLngLat([town?.longitude, town?.latitude])
				.setPopup(new mapboxgl.Popup().setHTML(popupHtml))
				.addClassName('port')
				.addTo(map);
		}
		if (!town?.port && !town?.capital && town?.name != 'Druidic Forest') {
			marker = new mapboxgl.Marker({ element: el })
				.setLngLat([town?.longitude, town?.latitude])
				.setPopup(new mapboxgl.Popup().setHTML(popupHtml))
				.addClassName('town')
				.addTo(map);
		}
		if (town?.name == 'Druidic Forest') {
			marker = new mapboxgl.Marker({ element: el })
				.setLngLat([town?.longitude, town?.latitude])
				.setPopup(new mapboxgl.Popup().setHTML(popupHtml))
				.addClassName('treeLife')
				.addTo(map);
		}

		marker.getElement('button').addEventListener('click', (e) => {
			selectedTown = town;
			townView = true;
		});

		return markers.push(marker);
	}

	function playerListOn() {
		playerListToggle = !playerListToggle;
	}

	function getPlayerRoute(e) {
		let path;

		if (e.target.checked) {
			switch (e.target.value) {
				case 'Fennex Stoutwings':
					path = coordinatesPlayers.find((name) => name?.player === 'Fennex Stoutwings');
					break;
				case 'Bastion':
					path = coordinatesPlayers.find((name) => name?.player === 'Bastion');
					break;
				case 'Kalahari':
					path = coordinatesPlayers.find((name) => name?.player === 'Kalahari');
					break;
				case 'Ng`ombe Radolack':
					path = coordinatesPlayers.find((name) => name?.player === 'Ng`ombe Radolack');
					break;
				case 'Vanelis':
					path = coordinatesPlayers.find((name) => name?.player === 'Vanelis');
					break;
				case 'Jamond Carter':
					path = coordinatesPlayers.find((name) => name?.player === 'Jamond Carter');
					break;
			}

			let theme = getTheme(e.target.value);
			map.addSource(e.target.value, {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'LineString',
						coordinates: path.coordinates
					}
				}
			});

			map.addLayer({
				id: e.target.value,
				type: 'line',
				source: e.target.value,
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': theme,
					'line-width': 4
				}
			});
		} else {
			map.removeLayer(e.target.value);
			map.removeSource(e.target.value);
		}
	}

	onMount(() => {
		mapboxgl.accessToken = import.meta.env.VITE_PUBLIC_TOKEN;
		map = new Map({
			container: mapContainer,
			accessToken: token,
			style: mapStyle,
			center: [lng, lat],
			zoom: zoom,
			refreshExpiredTiles: false
		});

		map.on('click', function (e) {
			lat = e.lngLat.lat;
			lng = e.lngLat.lng;
		});

		map.on('zoom', (e) => {
			if (e.type === 'zoom') {
				zoom = e.target.getZoom()
			}
		});

		updateMarkers();

		return () => {
			if (map) {
				map.remove();
			}
		};
	});
</script>

<div class="scroll-container">
	<div class="scroll-background">
		<img src="/map/map_scroll.png" alt="Ancient Scroll" class="scroll-image" />
	</div>

	<a href="/home" class="back-button-scroll group" aria-label="Return to home">
		<div class="back-button-inner-scroll">
			<svg
				class="w-7 h-7 text-amber-100 group-hover:text-amber-50 transition-all duration-300
				       group-hover:-translate-x-1"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"
				></path>
			</svg>
		</div>
		<span class="back-tooltip-scroll">Return to Table of Contents</span>
	</a>


	<div class="scroll-title-container">
		<h1 class="scroll-title">
			<span class="title-ornament">✦</span>
			Raphal
			<span class="title-ornament">✦</span>
		</h1>
	</div>


	<div class="map-content-area">
		<div class="map-wrap">
			<div class="map" bind:this={mapContainer}></div>
		</div>
	</div>


	<div class="coordinates-display">
		<span class="coordinate-label">Longitude:</span>
		{lng.toFixed(2)}
		<span class="coordinate-separator">|</span>
		<span class="coordinate-label">Latitude:</span>
		{lat.toFixed(2)}
		<span class="coordinate-separator">|</span>
		<span class="coordinate-label">Zoom:</span>
		{zoom.toFixed(2)}
	</div>
</div>

{#if townView}
	<div class="town-details-overlay">
		<button
			class="close-town-details"
			onclick={() => (townView = false)}
			aria-label="Close town details"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2.5"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
		<TownDetails {data} town={selectedTown} />
	</div>
{/if}

<style>
	.scroll-container {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: linear-gradient(135deg, #1a1410 0%, #2d1810 50%, #1a1410 100%);
	}

	.scroll-background {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		z-index: 1;
	}

	.scroll-image {
		width: 98%;
		height: 98%;
		object-fit: contain;
		filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.8));
	}


	.back-button-scroll {
		position: absolute;
		top: 2rem;
		left: 2rem;
		z-index: 50;
		width: 4rem;
		height: 4rem;
	}

	.back-button-inner-scroll {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(101, 48, 10, 0.95));
		border: 2px solid rgba(212, 175, 55, 0.8);
		border-radius: 50%;
		box-shadow:
			0 6px 20px rgba(0, 0, 0, 0.6),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		transition: all 0.3s ease;
		cursor: pointer;
		position: relative;
	}

	.back-button-inner-scroll::before,
	.back-button-inner-scroll::after {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		border: 2px solid rgba(212, 175, 55, 0.8);
		transition: all 0.3s ease;
	}

	.back-button-inner-scroll::before {
		top: -4px;
		left: -4px;
		border-right: none;
		border-bottom: none;
	}

	.back-button-inner-scroll::after {
		bottom: -4px;
		right: -4px;
		border-left: none;
		border-top: none;
	}

	.back-button-scroll:hover .back-button-inner-scroll {
		background: linear-gradient(135deg, rgba(180, 83, 9, 1), rgba(139, 69, 19, 1));
		transform: scale(1.1);
		box-shadow:
			0 8px 28px rgba(212, 175, 55, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.back-tooltip-scroll {
		position: absolute;
		left: 5rem;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(28, 25, 23, 0.95);
		color: #fef3c7;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-family: 'Courgette', cursive;
		font-size: 0.875rem;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
	}

	.back-button-scroll:hover .back-tooltip-scroll {
		opacity: 1;
	}


	.scroll-title-container {
		position: absolute;
		top: 6.5%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.scroll-title {
		font-family: 'Great Vibes', cursive;
		font-size: 3.5rem;
		color: #2d1810;
		text-align: center;
		text-shadow:
			0 2px 4px rgba(255, 255, 255, 0.3),
			1px 1px 2px rgba(0, 0, 0, 0.5);
		letter-spacing: 0.1em;
	}

	.title-ornament {
		display: inline-block;
		font-size: 2rem;
		color: #8b4513;
		animation: pulse-ornament 3s ease-in-out infinite;
	}

	.title-ornament:first-child {
		margin-right: 1rem;
	}

	.title-ornament:last-child {
		margin-left: 1rem;
		animation-delay: 1.5s;
	}

	@keyframes pulse-ornament {
		0%,
		100% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	.map-content-area {
		position: absolute;
		top: 15%;
		left: 50%;
		transform: translateX(-50%);
		width: 65%;
		height: 75%;
		z-index: 5;
		border-radius: 8px;
		overflow: hidden;
		box-shadow:
			inset 0 4px 12px rgba(0, 0, 0, 0.4),
			0 4px 20px rgba(0, 0, 0, 0.3);
	}

	.map-wrap {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 4px;
	}

	.coordinates-display {
		position: absolute;
		bottom: 3%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		background: rgba(61, 40, 23, 0.95);
		backdrop-filter: blur(8px);
		padding: 0.75rem 2rem;
		border-radius: 9999px;
		border: 2px solid rgba(139, 69, 19, 0.6);
		box-shadow:
			0 4px 16px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		font-family: 'Courgette', cursive;
		font-size: 0.875rem;
		color: #f5e6d3;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}

	.coordinate-label {
		font-weight: bold;
		color: #d4af37;
		margin-right: 0.25rem;
	}

	.coordinate-separator {
		margin: 0 0.75rem;
		color: rgba(245, 230, 211, 0.5);
	}

	.town-details-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.95);
		animation: fadeIn 0.4s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.close-town-details {
		position: fixed;
		top: 2rem;
		right: 2rem;
		z-index: 110;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(101, 48, 10, 0.95));
		border: 2px solid rgba(212, 175, 55, 0.8);
		border-radius: 50%;
		color: #fef3c7;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
	}

	.close-town-details:hover {
		background: linear-gradient(135deg, rgba(180, 83, 9, 1), rgba(139, 69, 19, 1));
		transform: rotate(90deg) scale(1.1);
		box-shadow: 0 8px 28px rgba(212, 175, 55, 0.5);
	}
	
	:global(.mapboxgl-popup-content) {
		background: linear-gradient(135deg, #f5e6d3, #f0ddc1) !important;
		border: 2px solid #8b6914 !important;
		border-radius: 8px !important;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
		font-family: 'Quicksand', sans-serif !important;
		padding: 1rem !important;
	}

	:global(.mapboxgl-popup-tip) {
		border-top-color: #8b6914 !important;
	}

	:global(.town:hover),
	:global(.port:hover),
	:global(.capital:hover),
	:global(.treeLife:hover) {
		transform: scale(1.2);
		filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.8));
	}

	@keyframes bouncy-markers {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
</style>
