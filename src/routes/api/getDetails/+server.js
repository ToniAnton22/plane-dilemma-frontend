import {DB_HOST, X_API_KEY} from "$env/static/private"
import { starter } from "$lib/helpers/starter.js";

/** @type {import('./$types').RequestHandler} */

export async function GET(){
    async function dataFetch(retires = 3, delay =6000){

      let response = await starter(DB_HOST, X_API_KEY)

      if(response.status == 502 || response.status == 504){
    
        await new Promise(resolve => setTimeout(resolve,delay))
        return dataFetch(retires-1, delay)
      }

      const details = response

      if(details == undefined){
          return new Response({status:404})
      }
      return new Response(JSON.stringify(details),{status:200})
    }
    return await dataFetch()
    
}

