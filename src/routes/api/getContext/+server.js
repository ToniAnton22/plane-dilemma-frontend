import {DB_HOST} from "$env/static/private"

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    async function dataFetch(retires = 5, delay =8000){
        const data = await fetch(`${DB_HOST}context`)
        console.log("Data is being Fetched")
      if(data?.status == 502){
        console.log("502, Attempt to retry the fetch.")
        await new Promise(resolve => setTimeout(resolve,delay))
        return dataFetch(retires-1, delay)
      }

      const context = await data.json()
  
      if(context == undefined){
          return new Response({status:404})
      }
      return new Response(JSON.stringify(context),{status:200})
    }
    return await dataFetch()
    
};