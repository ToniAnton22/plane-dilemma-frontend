import {DB_HOST,X_API_KEY} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */

export async function GET({params}){
    
    console.log("Resources are being fetched.")
    let response = await fetch(`${DB_HOST}players/byId/${params?.id}`,
        {
            headers:{
              'X-API-KEY':X_API_KEY
            }
        }
    )

    let data = await response.json()
  
    if(data == null){
        return new Response.status(404) 
    }

    return new Response(JSON.stringify(data), {status:201})
}