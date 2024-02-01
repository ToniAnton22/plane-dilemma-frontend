import {DB_HOST} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    async function dataFetch(retires = 5, delay =8000){
        const data = await fetch(`${DB_HOST}players`)

      if(data?.status == 502){
    
        await new Promise(resolve => setTimeout(resolve,delay))
        return dataFetch(retires-1, delay)
      }

      const players = await data.json()
  
      if(players == undefined){
          return new Response({status:404})
      }
      return new Response(JSON.stringify(players),{status:200})
    }
    return await dataFetch()
    
};