import {DB_HOST} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    async function dataFetch(retires = 3, delay =6000){
        const response = await fetch(`${DB_HOST}context`)
        console.log("response is being Fetched")
      if(response?.status == 502 || response?.status == 504 || response?.status==500){
        console.log("502, Attempt to retry the fetch.")
        await new Promise(resolve => setTimeout(resolve,delay))
        return dataFetch(retires-1, delay)
      }

      const context = await response.json()
  
      if(context == undefined){
          return new Response({status:404})
      }
      return new Response(JSON.stringify(context),{status:200})
    }
    return await dataFetch()
    
};