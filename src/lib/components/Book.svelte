<script>
	let { data = {}, snippetLeft, snippetRight, textLeft = {}, textRight = {} } = $props();
	let page = $state(1);
	let isAnimating = $state(false);
	let animationDirection = $state('none'); // 'forward' or 'backward'
	
	let pageCount = $derived.by(() => {
		return Math.ceil((textLeft.length + textRight.length) / 2) || 1;
	});

	function nextPage() {
		if (isAnimating) return;
		
		if (page < pageCount) {
			animationDirection = 'forward';
			isAnimating = true;
			setTimeout(() => {
				page += 1;
				setTimeout(() => {
					isAnimating = false;
					animationDirection = 'none';
				}, 800);
			}, 400);
		} else {
			page = 1;
		}
	}
	
	function prevPage() {
		if (isAnimating) return;
		
		if (page > 1) {
			animationDirection = 'backward';
			isAnimating = true;
			setTimeout(() => {
				page -= 1;
				setTimeout(() => {
					isAnimating = false;
					animationDirection = 'none';
				}, 800);
			}, 400);
		} else {
			page = pageCount;
		}
	}
	
	function selectPage(newPage) {
		if (isAnimating || newPage === page) return;
		
		animationDirection = newPage > page ? 'forward' : 'backward';
		isAnimating = true;
		setTimeout(() => {
			page = newPage;
			setTimeout(() => {
				isAnimating = false;
				animationDirection = 'none';
			}, 800);
		}, 400);
	}
</script>

<div class="book">
	<button class="edge-left" onclick={prevPage} disabled={isAnimating}></button>
	
	<div class="content-left" class:page-turn-left={animationDirection === 'backward'}>
		{@render snippetLeft(page - 1)}
	</div>
	
	<div class="divider"></div>
	
	<div class="content-right" class:page-turn-right={animationDirection === 'forward'}>
		{@render snippetRight(page - 1)}
	</div>
	
	<button class="edge-right" onclick={nextPage} disabled={isAnimating}></button>
	
	{#if pageCount > 1}
		<div class="absolute top-2 right-1/2 z-50 page-selector-container">
			<div class="bookmark-ribbon">
				<select
					class="page-selector"
					value={page}
					onchange={(e) => selectPage(Number(e.target.value))}
					disabled={isAnimating}
				>
					{#each textLeft as _, index}
						<option value={index + 1}>
							Page {index + 1}
						</option>
					{/each}
				</select>
				
				<div class="bookmark-tail"></div>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes pageTurnRight {
		0% {
			transform: perspective(2000px) rotateY(0deg);
			transform-origin: left center;
			box-shadow: 1vw 0px 0.5vw 0px black;
			z-index: 10;
		}
		50% {
			transform: perspective(2000px) rotateY(-90deg);
			transform-origin: left center;
			box-shadow: 0vw 0px 1vw 0.5vw rgba(0, 0, 0, 0.5);
			z-index: 10;
		}
		100% {
			transform: perspective(2000px) rotateY(-180deg);
			transform-origin: left center;
			box-shadow: -1vw 0px 0.5vw 0px black;
			z-index: 10;
		}
	}

	@keyframes pageTurnLeft {
		0% {
			transform: perspective(2000px) rotateY(0deg);
			transform-origin: right center;
			box-shadow: -1vw 0px 0.5vw 0px black;
			z-index: 10;
		}
		50% {
			transform: perspective(2000px) rotateY(90deg);
			transform-origin: right center;
			box-shadow: 0vw 0px 1vw 0.5vw rgba(0, 0, 0, 0.5);
			z-index: 10;
		}
		100% {
			transform: perspective(2000px) rotateY(180deg);
			transform-origin: right center;
			box-shadow: 1vw 0px 0.5vw 0px black;
			z-index: 10;
		}
	}

	.page-turn-right {
		animation: pageTurnRight 0.8s ease-in-out;
		backface-visibility: hidden;
	}

	.page-turn-left {
		animation: pageTurnLeft 0.8s ease-in-out;
		backface-visibility: hidden;
	}

	button:disabled {
		pointer-events: none;
		opacity: 0.7;
	}

	.page-selector-container {
		filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3));
	}

	.bookmark-ribbon {
		position: relative;
		display: inline-block;
	}

	.page-selector {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		
		min-width: 160px;
		padding: 12px 40px 12px 20px;
		
		background: linear-gradient(135deg, 
			#d4af37 0%,
			#f4d03f 45%,
			#f4d03f 55%,
			#d4af37 100%
		);
		
		border: 2px solid #8b6914;
		border-radius: 8px 8px 0 0;
		box-shadow: 
			inset 0 1px 0 rgba(255, 255, 255, 0.4),
			inset 0 -2px 4px rgba(0, 0, 0, 0.2),
			0 2px 4px rgba(0, 0, 0, 0.3);
		
		font-family: 'Courgette', cursive;
		font-size: 16px;
		font-weight: bold;
		color: #3d2817;
		text-align: center;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
		
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.page-selector:hover:not(:disabled) {
		background: linear-gradient(135deg, 
			#e0be4d 0%,
			#ffdd55 45%,
			#ffdd55 55%,
			#e0be4d 100%
		);
		transform: translateY(-2px);
		box-shadow: 
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			inset 0 -2px 4px rgba(0, 0, 0, 0.2),
			0 4px 8px rgba(0, 0, 0, 0.4);
	}

	.page-selector:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.page-selector:focus {
		outline: none;
		border-color: #a57c1b;
		box-shadow: 
			inset 0 1px 0 rgba(255, 255, 255, 0.4),
			inset 0 -2px 4px rgba(0, 0, 0, 0.2),
			0 2px 4px rgba(0, 0, 0, 0.3),
			0 0 0 3px rgba(212, 175, 55, 0.3);
	}

	.page-selector {
		background-image: 
			linear-gradient(135deg, 
				#d4af37 0%,
				#f4d03f 45%,
				#f4d03f 55%,
				#d4af37 100%
			),
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%233d2817' d='M1 1l5 5 5-5' stroke='%233d2817' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat, no-repeat;
		background-position: center, right 12px center;
	}

	.bookmark-tail {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -12px;
		width: 0;
		height: 0;
		border-left: 80px solid transparent;
		border-right: 80px solid transparent;
		border-top: 12px solid #d4af37;
		filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
	}

	.bookmark-tail::before {
		content: '';
		position: absolute;
		left: -80px;
		top: -12px;
		width: 160px;
		height: 2px;
		background: #8b6914;
	}

	.page-selector::before {
		content: '✦';
		position: absolute;
		left: 8px;
		top: 50%;
		transform: translateY(-50%);
		color: #8b6914;
		font-size: 14px;
		animation: shimmer 3s ease-in-out infinite;
	}

	.page-selector::after {
		content: '✦';
		position: absolute;
		right: 32px;
		top: 50%;
		transform: translateY(-50%);
		color: #8b6914;
		font-size: 14px;
		animation: shimmer 3s ease-in-out infinite 1.5s;
	}

	@keyframes shimmer {
		0%, 100% { opacity: 0.5; }
		50% { opacity: 1; }
	}

	.page-selector option {
		background: #f5e6d3;
		color: #3d2817;
		padding: 8px;
		font-family: 'Courgette', cursive;
	}

	.book {
		perspective: 2000px;
		perspective-origin: center;
	}

	.content-left,
	.content-right {
		transform-style: preserve-3d;
		backface-visibility: hidden;
	}
</style>