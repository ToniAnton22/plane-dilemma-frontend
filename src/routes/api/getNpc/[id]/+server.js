import {DB_HOST, X_API_KEY} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */

export async function GET({params}){
    async function dataFetch(retires = 3, delay =6000){
        let response = await fetch(`${DB_HOST}npcs/byId/${params?.id}`,
          {
            headers:{
              'X-API-KEY':X_API_KEY
            }
          }
        )

      if(response.status == 502 || response.status == 504){
    
        await new Promise(resolve => setTimeout(resolve,delay))
        return dataFetch(retires-1, delay)
      }

      const npc = await response.json()
  
      if(npc == undefined){
          return new Response({status:404})
      }
      return new Response(JSON.stringify(npc),{status:200})
    }
    return await dataFetch()
    
}

