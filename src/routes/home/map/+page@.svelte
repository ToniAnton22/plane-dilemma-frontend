<script>
	import mapboxgl, { Map } from 'mapbox-gl';
	import { addFilterClasses } from '$lib/addFilterClasses';
	import { onMount } from 'svelte';
	import TownDetails from '$lib/components/TownDetails.svelte';

	let { data, mapContainer } = $props(); // Assuming this is the prop received from load
	let playerState = $state(false);
	let groupTrack = $state([]);
	let townView = $state(false);
	let selectedTown = $state({});
	let coordinatesPlayers = $state([]);
	function getTheme(name) {
		if (name.includes('Kalahari')) {
			return '#cad0db';
		}
		if (name.includes('Bastion')) {
			return '#7d83a3';
		}
		if (name.includes('Radolack')) {
			return '#f79d03';
		}
		if (name.includes('Jamond')) {
			return '#bd7df5';
		}
		if (name.includes('Vanelis')) {
			return '#436ff2';
		}
		if (name.includes('Fennex')) {
			return '#ed5e25';
		}
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
		// data?.towns?.players.forEach((player) => {
		// 	makePath(player?.track, player?.name);
		// });
		//getGroupLatestLocation(coordinatesPlayers)
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
	// Reactive statement to handle towns updates

	const towns = $derived(data?.locations);
	if (!towns) {
		throw new Error('Towns data is not available');
	}
	function updateMarkers() {
		// Clear existing markers first
		markers.forEach((marker) => marker.remove());
		markers = [];

		// Add new markers
		towns.forEach((town) => applyClasses(town));
	}
	// let expandMarker = (town) => {
	// 	drawerStore.update((currentState) => {
	// 		return { ...currentState, id: '2', town };
	// 	});
	// };
	function applyClasses(town) {
		let popup = document.createElement('div');

		let popupHtml = addFilterClasses(town);

		let el = document.createElement(`div`);
		let button = document.createElement('button');
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
			town = town
		});
		return markers.push(marker);
	}
	function playerListOn() {
		if (playerListToggle) {
			playerListToggle = false;
		} else {
			playerListToggle = true;
		}
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
			let theme;
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
			theme = getTheme(e.target.value);
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

		updateMarkers();
		return () => {
			if (map) {
				map.remove();
			}
		};
	});
	if (map) {
	}
</script>

<div>
	<div class="sidebar">
		Longitude: {lng.toFixed(2)} | Latitude: {lat.toFixed(2)} | Zoom: {zoom.toFixed(2)}
	</div>
	<div class="map-wrap">
		<div class="map" bind:this={mapContainer} />
	</div>
</div>
{#if townView}
	<div>
		<TownDetails town={selectedTown}/>
	</div>
{/if}

<div class="absolute right-0 h-160 w-fit bg-transparent overflow-scroll z-20">
	<div class="flex flex-row-reverse w-full h-full">
		<div
			class="grid grid-cols-2 gap-2 h-full w-64 items-center px-4 text-black rounded-l-full rounded-t-none mb-20 pb-20 overflow-scroll"
		>
			<button class="btn preset-filled-primary-500 rounded-full"> Legend </button>
			<label> Toggles Legend </label>
			<button class="btn preset-filled-primary-500 rounded-full"> Map Filter </button>
			<label> Select map filter </label>
			<button class="btn preset-filled-error-500 rounded-full"> Play </button>
			<label> Starts Animation </label>
			<button class="btn preset-filled-success-500 rounded-full" onclick={latest}> Locate </button>
			<label> View most relevant story location </label>
			<button class="btn preset-filled-tertiary-500 rounded-full" onclick={playerListOn}>
				Player
			</button>
			<label> View Character's Journey </label>
			<button class="btn preset-filled-warning-500 rounded-full" onclick={addCityForm}>
				Add
			</button>
			<label> Adds new location </label>
		</div>
		{#if !playerListToggle}
			<ListBox
				multiple
				class="h-full w-fit preset-tonal-surface border border-surface-500 z-10 grid grid-cols-2 gap-4 items-center"
				rounded="rounded-3xl"
				active="preset-filled-success-500"
			>
				{#each data?.towns?.players as player}
					<ListBoxItem
						bind:group={playerList}
						name={player?.name}
						value={player?.name}
						class="w-fit overflow-hidden"
						onchange={(e) => getPlayerRoute(e)}
					>
						<div class="w-32 rounded-full preset-filled-secondary-500">
							<img src={player?.image} alt={player?.name} class="w-32 h-32 rounded-full" />
							<div class="card-footer text-white text-center">{player?.name}</div>
						</div>
					</ListBoxItem>
				{/each}
			</ListBox>
		{/if}
	</div>
</div>

<a href="/home" class="absolute w-12 h-12 m-6 pt-2 hover:pointer">
	<svg
		aria-hidden="true"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round" />
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
