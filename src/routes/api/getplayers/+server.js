import {DB_HOST} from "$env/static/private"



/** @type {import('./$types').RequestHandler} */
export async function GET() {
    
    console.log("Resources are being fetched.")
    const data = await fetch(`${DB_HOST}players`)
    const players = await data.json()
   
    if(players == undefined){
        return new Response({status:404})
    }
    
    return new Response(JSON.stringify(players),{status:200})
    
};