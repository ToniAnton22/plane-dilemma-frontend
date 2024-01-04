import {DB_HOST} from "$env/static/private"

/**  @type {import('./$types').RequestHandler} */
export async function GET(){

    const data = await fetch(`${DB_HOST}summary`)

    const summaries = await data.json()
    if(summaries == null){
        return new Response({status:404})
    }

    return new Response(JSON.stringify(summaries),{status:200})
}