import {DB_HOST,X_API_KEY} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    async function dataFetch(retires = 3, delay =6000){
        const response = await fetch(`${DB_HOST}npcs`,   {
          headers:{
            'X-API-KEY':X_API_KEY
          }
        })
      if(response?.status == 502 || response?.status == 504 || response?.status==500){
        await new Promise(resolve => setTimeout(resolve,delay))
        return dataFetch(retires-1, delay)
      }

      const npcs = await response.json()
  
      if(npcs == undefined){
          return new Response({status:404})
      }
      return new Response(JSON.stringify(npcs),{status:200})
    }
    return await dataFetch()
    
};