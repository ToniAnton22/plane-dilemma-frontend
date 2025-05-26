<script>
	let scale = $state(1);
	let offset = $state({ x: 0, y: 0 });
	let isDragging = $state(false);
	let pointerStart = $state({ x: 0, y: 0 });
	let offsetStart = $state({ x: 0, y: 0 });
	let canvasEl;
	let wrapper;
	let frameId;
	let img;
	let wheelHandler;

	$effect(() => {
		if (canvasEl) {
			const ctx = canvasEl.getContext('2d');
			resizeCanvasBitmap(ctx);
			img = new Image();
			img.src = '/images/players/Jamond.png';
			wheelHandler = (e) => handleWheel(e);
			canvasEl.addEventListener('wheel', wheelHandler, { passive: false });

			const observer = new ResizeObserver(() => resizeCanvasBitmap(ctx));
			observer.observe(wrapper); // observe the wrapper, not the canvas

			frameId = requestAnimationFrame(() => drawFrame(ctx));
			return () => {
				cancelAnimationFrame(frameId);
				canvasEl.removeEventListener('wheel', wheelHandler);
				observer.disconnect();
			};
		}
	});

	function resizeCanvasBitmap(ctx) {
		const w = wrapper.clientWidth;
		const h = wrapper.clientHeight;
		const dpr = window.devicePixelRatio ?? 1;

		canvasEl.width = w * dpr;

		canvasEl.height = h * dpr;

		canvasEl.style.width = w + 'px';
		canvasEl.style.height = h + 'px';
		ctx.resetTransform();
		ctx.scale(dpr, dpr);

		drawFrame(ctx);
	}
	function handleWheel(e) {
		e.preventDefault(); // also stops the page from scrolling

		const zoom = e.deltaY > 0 ? 1 / 1.1 : 1.1;
		const rect = canvasEl.getBoundingClientRect();
		const pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };

		const newScale = scale * zoom;

		// === keep world-point under the cursor ===
		const newOffset = {
			x: pointer.x - (pointer.x - offset.x) * zoom,
			y: pointer.y - (pointer.y - offset.y) * zoom
		};

		scale = newScale; // primitives update fine
		offset = newOffset; // <- *full* reassignment makes it reactive
	}
	function handlePointerDown() {}
	function handlePointerMove() {}
	function handlePointerUp() {}
	function drawFrame(ctx) {
		frameId = requestAnimationFrame(() => drawFrame(ctx));
		// 1. wipe absolutely everything, in device-pixel space
		ctx.save(); // keep current transform stack
		ctx.setTransform(1, 0, 0, 1, 0, 0); // reset to identity
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
		ctx.restore(); // back to the Hi-DPI baseline (dpr scale)

		// 2. now apply your per-frame transform & draw
		ctx.save();
		ctx.translate(offset.x, offset.y);
		ctx.scale(scale, scale);

		if (img && img.complete) ctx.drawImage(img, 0, 0);
		ctx.restore();
	}
</script>

<div class="wrapper" bind:this={wrapper}>
	<canvas bind:this={canvasEl}></canvas>
</div>

<style>
	.wrapper {
		position: fixed;
		inset: 0;
		overflow: hidden;
		height: 100vh;
		width: 100vw;
	}
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
