import {DB_HOST} from "$env/static/private"



/** @type {import('./$types').RequestHandler} */
export async function GET() {
    
    console.log("Resources are being fetched.")
    const data = await fetch(`${DB_HOST}npcs`)
    const npcs = await data.json()
  
    if(npcs[0] == undefined){
        return new Response({status:404})
    }
    
    return new Response(JSON.stringify(npcs),{status:200})
    
};