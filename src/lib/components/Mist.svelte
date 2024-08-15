<script>
    import { onMount, onDestroy } from 'svelte';
    import {slide} from "svelte/transition"
    const numBubbles = 100
    let bubbles = [];
    let bubbleColors = ["purple","pink"]
    let canvas;
    function random(min, max){
        return Math.random() * (max - min) +min
    }
    // Function to create random bubbles

    function createBubble(numBubbles,ctx,canvas){
        for(let i = 0;i< numBubbles;i++){
            bubbles.push({
                x: random(0,canvas.width),
                y: random(0, canvas.height),
                vx: random(-0.2,0.2),
                vy: random(-0.2,0.2),
                radius:random(0.5,0.9),
                color: `rgb(179, 179, 204,0.8)`
            })
        }
    }
    let ctx;

    onMount(() =>{
        const canvas = document.getElementById('bgCanvas')
        ctx = canvas.getContext('2d')
        console.log(ctx)
        createBubble(numBubbles,ctx,canvas)
        animate(ctx,canvas)
    })

    function animate(ctx,tempCanvas){
        canvas = tempCanvas
        ctx.clearRect(0,0,canvas.width,canvas.height)
        let animatedCtx = animate.bind(this,...[ctx,canvas])
        
        bubbles.forEach(bubble =>{
            bubble.x += bubble.vx
            bubble.y += bubble.vy

            if (bubble.x < 0 || bubble.x > canvas.width){
                bubble.vx *=-1
                bubble.x = 1
            }
            if (bubble.y < 0 || bubble.y > canvas.height){
                bubble.vy *= -1
                bubble.y = 1
            }
            ctx.beginPath();
                    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                    ctx.fillStyle = bubble.color;
                 
                    ctx.fill();
                    ctx.closePath();
                });

                requestAnimationFrame(animatedCtx);
            }
// Define bubble properties

</script>
<canvas id="bgCanvas" class="absolute -z-10 w-full h-full" width="w-screen" height="h-screen">
    <div class="bg-white w-24 h-24"></div>
</canvas>

<style lang="postcss">
</style>