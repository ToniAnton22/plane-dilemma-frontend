import {DB_HOST} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */

export async function GET({params}){
    async function dataFetch(retires = 5, delay =8000){
        let response = await fetch(`${DB_HOST}npcs/byId/${params?.id}`)
      if(response.status == 502 && response.status == 504){
    
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

