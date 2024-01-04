import {MAPBOX_UPLOAD} from "$env/static/private"



/** @type {import('./$types').RequestHandler} */
export async function POST() {
    const data = await fetch(`${MAPBOX_UPLOAD}`)
    const npcs = await data.json()
  
    if(npcs[0] == undefined){
        return new Response({status:404})
    }
    
    return new Response(JSON.stringify(npcs),{status:200})
    
};