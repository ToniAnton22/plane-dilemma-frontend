<script>
    import {page} from "$app/stores";
    import {goto} from "$app/navigation"

    setTimeout(() =>{
        goto("/home")
    },10000)
</script>

<div class="flex h-screen items-center justify-center w-screen bg-[url('/Ethereal_plane.jpg')]">
    <h1 class="text-3xl mx-auto justify-center items-center h-1/2 ">{$page.status} : {$page.Error.message}</h1>
    <span class="text-xl h-1/2"> We will be redirecting you shortly back to the homepage. Please try again once there.</span>
</div>

<style>
    h1{
        height:screen;
        
    }
</style>