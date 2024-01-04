import {DB_HOST} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */

export async function GET({params}){
    
    let response = await fetch(`${DB_HOST}npcs/byId/${params?.id}`)

    let data = await response.json()

    if(data == null){
        return new Response.status(404) 
    }

    return new Response(JSON.stringify(data), {status:201})
}