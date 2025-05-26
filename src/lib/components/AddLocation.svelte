<script>
    let {parent, lat, lng} = $props()


  
    const submitInfo = async(event) =>{
        event.preventDefault()
        const formData={
            
        }
    }

</script>

{#if false}
    <form class="flex flex-col" method="POST" action="/api/addLocation">
        <div class="grid grid-cols-3 gap-2">
            <label for="lat">Latitude</label>
            <label for="lon">Longitude</label>
            <label for="el">Elevation</label>
            <input value={lat} disabled class="bg-black" name="lat"/>

            <input value={lng} disabled class="bg-black" name="lon"/>
            <input value=441 disabled class="bg-black" name="el"/>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <label for="x">X</label>
            <label for="y">Y</label>
            <input value={((1920/360.0)*(180+parseInt(lng)))} disabled class="bg-black" name="x"/>
       
            <input value={((955/180.0)*(90-parseInt(lat)))} disabled class="bg-black" name="y"/>
        </div>
        <div class="grid grid-cols-3 gap-2">
            <label for="cityName">Location Name</label>
            <label for="province">Province</label>
            <label for="provinceFN">Province Full Name</label>
            <input type='text' class="bg-black" name="cityName"/>
            <input type='text' class="bg-black" name="province"/>
            <input type='text' class="bg-black" name="provinceFN"/>
        </div>

        <div class="grid grid-cols-3 gap-2">
            <label for="religion">Religion</label>
            <label for="population">Population</label>
            <label for="culture">Culture</label>
            <input type='text' class="bg-black" name="religion"/>
            <input type='text' class="bg-black" name="population"/>
            <input type='text' class="bg-black" name="culture"/>   
        </div>

        <div class="grid grid-cols-4 w-56 py-2">
            <input type="checkbox" value="capital" name="capital"/>
            <label for="capital">capital</label>
            <input type="checkbox" value="walls" name="walls"/>
            <label for="walls">walls</label>
            <input type="checkbox" value="plaza" name="plaza"/>
            <label for="plaza">plaza</label>
            <input type="checkbox" value="temple" name="temple"/>
            <label for="temple">temple</label>
            <input type="checkbox" value="shanty_town" name="Shanty_town"/>
            <label for="Shanty_town">shanty town</label>
            <input type="checkbox" value="port" name="port"/>
            <label for="port">Port</label>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <label for="img">Image Path</label>
            <label for="track">Tracked?</label>
            <input type='text' class="bg-black" name="img"/>
            <input type="checkbox" value=1 name="track"/>
        </div>
        <label for="events">Town events</label>
        <textarea type='textarea' class="bg-black h-32" name="events" rows=4 cols=50>

        </textarea>
        <div class="flex justify-end my-2">
            <input type="submit" value="Submit" 
            on:submit|preventDefault={submitInfo}
            class="preset-filled-success-500 w-24 h-12 rounded-lg hover:preset-filled-surface-500 hover:variant-outline-warning hover:shadow-xl"/>
        </div>
        
    </form>
{/if}
