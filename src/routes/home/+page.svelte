<script>
	import { onDestroy, onMount } from 'svelte';
	import { databaseLoading } from '$lib/loadingStore.js';
	import LoadingScreen from '../LoadingScreen.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import { redirect } from '@sveltejs/kit';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Book from '$lib/components/Book.svelte';
	import DrawerData from '$lib/components/DrawerData.svelte';
	export let data;

	$: currentPathName = (browser && window.location.pathname) || '/home';
	$: $databaseLoading;

	const delay = (ms) => new Promise((res) => setTimeout(checkDb, ms));
	async function checkDb() {
		console.log('In delay');
		invalidateAll();
	}
	onMount(() => {
		if ($databaseLoading == true) {
			console.log('checking db');
			goto('/');
			delay(10000);
		}
	});
	console.log(data);
	const drawerStore = getDrawerStore();
	$: {
		drawerStore.update((currentState) => {
			return { ...currentState, id: '0' || '0' };
		});
	}
</script>

<img
	class="w-full h-screen absolute bg-fixed bg-cover -z-20 brightness-75 blur-0"
	src="Ethereal_plane.jpg"
	alt="Ethereal Plane"
/>
{#if $databaseLoading == true}
	<LoadingScreen />
{/if}
<Book>
	<div class="w-full h-full" slot="page-one">
		<div class="container mx-auto px-2">
			<h1 class="text-3xl uppercase pt-10 text-black text-center">
				<p class="border-4 border-l-0 border-r-0 w-3/4 border-black mx-auto">About</p>
			</h1>
			<div class="flex flex-col m-2 p-8 text-md text-black indent-6">
				<p>
					This campaign unfolds in a richly detailed and mystical world, where players are drawn
					into a complex narrative filled with ancient secrets, powerful artifacts, and sinister
					forces. The main characters include:
				</p>
				<dl class="list-dl">
					<div>
						<span class="badge bg-primary-800" />
						<span class="flex-auto">
							<dt>Jamond</dt>
							<dd>
								- A determined and capable individual with a deep connection to the natural world,
								particularly the druidic forest and the sacred Tree of Life.
							</dd>
						</span>
					</div>
					<div>
						<span class="badge bg-primary-800" />
						<span class="flex-auto">
							<dt>Bastion</dt>
							<dd>
								- A character initially entangled in a plot against the Tree of Life, who eventually
								seeks redemption and allies himself with the party.
							</dd>
						</span>
					</div>
					<div>
						<span class="badge bg-primary-800" />
						<span class="flex-auto">
							<dt>Kalahari</dt>
							<dd>
								- A devout and skilled paladin with strong ties to the deity Sehanine Moonbow, who
								faces both physical and spiritual challenges throughout the journey.
							</dd>
						</span>
					</div>
					<div>
						<span class="badge bg-primary-800" />
						<span class="flex-auto">
							<dt>Radolack</dt>
							<dd>
								- A master smith with a mysterious past, driven by a quest that intertwines with the
								party's broader goals.
							</dd>
						</span>
					</div>
					<div>
						<span class="badge bg-primary-800" />
						<span class="flex-auto">
							<dt>Vanelis</dt>
							<dd>
								- A swift and strategic member of the party, adept at scouting and infiltration,
								whose skills often guide the group through perilous situations.
							</dd>
						</span>
					</div>
					<div>
						<span class="badge bg-primary-800" />
						<span class="flex-auto">
							<dt>Fennex</dt>
							<dd>
								- A childlike and magically gifted character who becomes an unexpected yet crucial
								part of the party, bringing both challenges and aid.
							</dd>
						</span>
					</div>
				</dl>

				<p>
					The campaign is centered around the group's quest to prevent the spread of a corrupting
					force that threatens their world. This journey takes them through a variety of locales,
					from ancient dwarven ruins to enigmatic underwater temples, and pits them against
					formidable foes, including cultists, mercenaries, and mysterious beings from other planes.
					As they navigate these challenges, the characters must unravel the mysteries of powerful
					artifacts, such as the Aquarts and the Shaper, and confront their own personal trials, all
					while dealing with the shadowy machinations of powerful adversaries.
				</p>
			</div>
		</div>
	</div>
	<div slot="page-two">
		<div class="container mx-auto px-2 text-black">
			<h1 class="text-3xl uppercase py-10 text-black text-center">
				<p class="border-4 border-l-0 border-r-0 w-3/4 border-black mx-auto">Content</p>
			</h1>
			<div
				class="flex flex-col xl:flex-row w-full h-full items-center align-centerm-2 p-8 space-y-12"
			>
				<nav class="list-nav w-full">
					<ul>
						<li>
							<a href="/home/players">
								<div class="w-full flex flex-col items-center justify-center">
									<div class="text-2xl mb-4 border-b border-black justify-center">Players</div>
									<div class="hidden sm:block">
										See details on the players, and how they currently stand in the story!
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="/home/npcs">
								<div class="w-full flex flex-col items-center justify-center">
									<div class="text-2xl mb-4 border-b border-black">NPCS</div>

									<div class="hidden sm:block">Details about the NPCS met in this world.</div>
								</div>
							</a>
						</li>
						<li>
							<a href="/home/map">
								<div class="w-full flex flex-col items-center justify-center">
									<div class="text-2xl mb-4 border-b border-black">Maps</div>
									<div class="hidden sm:block">View the map of the continent of Raphal.</div>
								</div>
							</a>
						</li>
						<li>
							<a href="/home/sessions">
								<div class="w-full flex flex-col items-center justify-center">
									<div class="text-2xl mb-4 border-b border-black">Sessions</div>
									<div class="hidden sm:block">
										Give yourself time to remember what happened last session!
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="/home/context">
								<div class="w-full flex flex-col items-center justify-center">
									<div class="text-2xl mb-4 border-b border-black">Context</div>
									<div class="hidden sm:block">Read important bullet points gathered!</div>
								</div>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</Book>
<div class="" />

<style lang="scss">
</style>
