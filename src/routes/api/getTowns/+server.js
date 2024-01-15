import {DB_HOST} from "$env/static/private"


/**  @type {import('./$types').RequestHandler} */
export async function GET(){
 

    console.log("Resources are being fetched.")
    const data = await fetch(`${DB_HOST}locations`)
    let towns = await data.json()
    


    if(towns == null){
        return new Response({status:404})
    }


    return new Response(JSON.stringify(towns),{status:200})
}