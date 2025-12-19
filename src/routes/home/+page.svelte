<script>
	import Book from '$lib/components/Book.svelte';
</script>

<img
	class="w-full h-screen fixed bg-cover -z-20 brightness-75 blur-sm"
	src="Ethereal_plane.jpg"
	alt="Ethereal Plane"
/>

{#snippet snippetLeft()}
	<div class="w-full h-full overflow-auto">
		<div class="container mx-auto px-8 py-6">
			<h1 class="text-5xl pt-8 pb-6 text-center font-serif tracking-wider" style="font-family: 'Great Vibes', cursive; color: #3d2817;">
				<div class="relative inline-block">
					<span class="before:content-['✦'] before:absolute before:-left-12 before:top-1/2 before:-translate-y-1/2 before:text-3xl
					           after:content-['✦'] after:absolute after:-right-12 after:top-1/2 after:-translate-y-1/2 after:text-3xl">
						About
					</span>
				</div>
			</h1>
			
			<div class="prose prose-amber max-w-none">
				<p class="first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1" 
				   style="font-family: 'Abril Fatface', serif; color: #4a3728; text-align: justify; line-height: 1.8;">
					This campaign unfolds in a richly detailed and mystical world, where players are drawn
					into a complex narrative filled with ancient secrets, powerful artifacts, and sinister
					forces. The main characters include:
				</p>

				<div class="my-6 space-y-4" style="color: #4a3728;">
					<div class="border-l-4 border-amber-800 pl-4 py-2 bg-gradient-to-r from-amber-50/30 to-transparent">
						<dt class="font-bold text-lg mb-1" style="font-family: 'Courgette', cursive;">Jamond</dt>
						<dd class="text-base leading-relaxed">
							A determined and capable individual with a deep connection to the natural world,
							particularly the druidic forest and the sacred Tree of Life.
						</dd>
					</div>

					<div class="border-l-4 border-amber-800 pl-4 py-2 bg-gradient-to-r from-amber-50/30 to-transparent">
						<dt class="font-bold text-lg mb-1" style="font-family: 'Courgette', cursive;">Bastion</dt>
						<dd class="text-base leading-relaxed">
							A character initially entangled in a plot against the Tree of Life, who eventually
							seeks redemption and allies himself with the party.
						</dd>
					</div>

					<div class="border-l-4 border-amber-800 pl-4 py-2 bg-gradient-to-r from-amber-50/30 to-transparent">
						<dt class="font-bold text-lg mb-1" style="font-family: 'Courgette', cursive;">Kalahari</dt>
						<dd class="text-base leading-relaxed">
							A devout and skilled paladin with strong ties to the deity Sehanine Moonbow, who
							faces both physical and spiritual challenges throughout the journey.
						</dd>
					</div>

					<div class="border-l-4 border-amber-800 pl-4 py-2 bg-gradient-to-r from-amber-50/30 to-transparent">
						<dt class="font-bold text-lg mb-1" style="font-family: 'Courgette', cursive;">Radolack</dt>
						<dd class="text-base leading-relaxed">
							A master smith with a mysterious past, driven by a quest that intertwines with the
							party's broader goals.
						</dd>
					</div>

					<div class="border-l-4 border-amber-800 pl-4 py-2 bg-gradient-to-r from-amber-50/30 to-transparent">
						<dt class="font-bold text-lg mb-1" style="font-family: 'Courgette', cursive;">Vanelis</dt>
						<dd class="text-base leading-relaxed">
							A swift and strategic member of the party, adept at scouting and infiltration,
							whose skills often guide the group through perilous situations.
						</dd>
					</div>

					<div class="border-l-4 border-amber-800 pl-4 py-2 bg-gradient-to-r from-amber-50/30 to-transparent">
						<dt class="font-bold text-lg mb-1" style="font-family: 'Courgette', cursive;">Fennex</dt>
						<dd class="text-base leading-relaxed">
							A childlike and magically gifted character who becomes an unexpected yet crucial
							part of the party, bringing both challenges and aid.
						</dd>
					</div>
				</div>

				<p class="mt-6" style="color: #4a3728; text-align: justify; line-height: 1.8;">
					The campaign is centered around the group's quest to prevent the spread of a corrupting
					force that threatens their world. This journey takes them through a variety of locales,
					from ancient dwarven ruins to enigmatic underwater temples, and pits them against
					formidable foes, including cultists, mercenaries, and mysterious beings from other planes.
				</p>
			</div>
		</div>
	</div>
{/snippet}

{#snippet snippetRight(page)}
	<div class="w-full h-full overflow-auto">
		<div class="container mx-auto px-8 py-6">
			<h1 class="text-5xl pt-8 pb-6 text-center font-serif tracking-wider" style="font-family: 'Great Vibes', cursive; color: #3d2817;">
				<div class="relative inline-block">
					<span class="before:content-['✦'] before:absolute before:-left-12 before:top-1/2 before:-translate-y-1/2 before:text-3xl
					           after:content-['✦'] after:absolute after:-right-12 after:top-1/2 after:-translate-y-1/2 after:text-3xl">
						Content
					</span>
				</div>
			</h1>

			<nav class="space-y-6 mt-8">
				<a href="/home/players" 
				   class="block group hover:scale-105 transition-transform duration-300">
					<div class="border-2 border-amber-900/40 rounded-lg p-6 bg-gradient-to-br from-amber-50/20 to-amber-100/10 
					            hover:shadow-xl hover:border-amber-700/60 transition-all">
						<div class="text-3xl mb-3 text-center font-bold" 
						     style="font-family: 'Courgette', cursive; color: #3d2817;">
							Players 
						</div>
						<div class="text-center text-sm" style="color: #5a4a3a;">
							See details on the players, and how they currently stand in the story!
						</div>
					</div>
				</a>

				<a href="/home/npcs" 
				   class="block group hover:scale-105 transition-transform duration-300">
					<div class="border-2 border-amber-900/40 rounded-lg p-6 bg-gradient-to-br from-amber-50/20 to-amber-100/10 
					            hover:shadow-xl hover:border-amber-700/60 transition-all">
						<div class="text-3xl mb-3 text-center font-bold" 
						     style="font-family: 'Courgette', cursive; color: #3d2817;">
							NPCs
						</div>
						<div class="text-center text-sm" style="color: #5a4a3a;">
							Details about the NPCs met in this world.
						</div>
					</div>
				</a>

				<a href="/home/map" 
				   class="block group hover:scale-105 transition-transform duration-300">
					<div class="border-2 border-amber-900/40 rounded-lg p-6 bg-gradient-to-br from-amber-50/20 to-amber-100/10 
					            hover:shadow-xl hover:border-amber-700/60 transition-all">
						<div class="text-3xl mb-3 text-center font-bold" 
						     style="font-family: 'Courgette', cursive; color: #3d2817;">
							Maps
						</div>
						<div class="text-center text-sm" style="color: #5a4a3a;">
							View the map of the continent of Raphal.
						</div>
					</div>
				</a>

				<a href="/home/sessions" 
				   class="block group hover:scale-105 transition-transform duration-300">
					<div class="border-2 border-amber-900/40 rounded-lg p-6 bg-gradient-to-br from-amber-50/20 to-amber-100/10 
					            hover:shadow-xl hover:border-amber-700/60 transition-all">
						<div class="text-3xl mb-3 text-center font-bold" 
						     style="font-family: 'Courgette', cursive; color: #3d2817;">
							Sessions
						</div>
						<div class="text-center text-sm" style="color: #5a4a3a;">
							Give yourself time to remember what happened last session!
						</div>
					</div>
				</a>

				<a href="/home/context" 
				   class="block group hover:scale-105 transition-transform duration-300">
					<div class="border-2 border-amber-900/40 rounded-lg p-6 bg-gradient-to-br from-amber-50/20 to-amber-100/10 
					            hover:shadow-xl hover:border-amber-700/60 transition-all">
						<div class="text-3xl mb-3 text-center font-bold" 
						     style="font-family: 'Courgette', cursive; color: #3d2817;">
							Context
						</div>
						<div class="text-center text-sm" style="color: #5a4a3a;">
							Read important bullet points gathered!
						</div>
					</div>
				</a>
			</nav>
		</div>
	</div>
{/snippet}

<Book {snippetLeft} {snippetRight} />