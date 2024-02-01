import {DB_HOST} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    async function dataFetch(retires = 5, delay =8000){
        const data = await fetch(`${DB_HOST}locations`)

      if(data?.status == 502){
    
        await new Promise(resolve => setTimeout(resolve,delay))
        return dataFetch(retires-1, delay)
      }

      const towns = await data.json()
  
      if(towns == undefined){
          return new Response({status:404})
      }
      return new Response(JSON.stringify(towns),{status:200})
    }
    return await dataFetch()
    
};