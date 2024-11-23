import {DB_HOST,X_API_KEY} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    async function dataFetch(retires = 3, delay =6000){
        const response = await fetch(`${DB_HOST}locations`,   {
          headers:{
            'X-API-KEY':X_API_KEY
          }
        })

      if(response?.status == 502 || response?.status == 504 || response?.status==500){
    
        await new Promise(resolve => setTimeout(resolve,delay))
        return dataFetch(retires-1, delay)
      }

      const towns = await response.json()
  
      if(towns == undefined){
          return new Response({status:404})
      }
      return new Response(JSON.stringify(towns),{status:200})
    }
    return await dataFetch()
    
};