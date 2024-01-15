import {DB_HOST} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */

export async function GET(){
    console.log("Fetching resources")
    let response = await fetch(`${DB_HOST}context`)

    let data = await response.json()
 
    if(data == null){
        return new Response.status(404) 
    }

    return new Response(JSON.stringify(data), {status:201})
}