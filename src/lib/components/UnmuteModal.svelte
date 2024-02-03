<script>
    import {audioMuted} from "$lib/helpers/setAudio.js"
    import { getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore()
    function unmuteAudio() {
        audioMuted.set(false);
        modalStore.close()
    }

    function muteAudio() {
        audioMuted.set(true);
        modalStore.close()
    }
</script>

<div class="flex">
    <button on:click={unmuteAudio} class="button-base-styles" >
        Unmute
    </button>
    <button on:click={muteAudio} class="button-base-styles">
        Keep muted
    </button>
</div>