
import {setItem, getItem} from "$lib/storage.js"
import { fetchWithRetry } from '$lib/helpers/fetchWithRetry.js'
import { redirect } from "@sveltejs/kit"
export const load = (({fetch}) =>{
    const getContext = async () =>{
    
        let data = getItem('context')
   
        if(!data || data?.message=="Internal Error"){
      
            var res = await fetchWithRetry("/api/getContext",8000,5,fetch)

            data = res
            setItem('context',res)
        }
        if(data?.errorType == "LambdaTimeout"){
            setTimeout(() => getContext(),3000)
        }

        if(!data){
            redirect(302,'/')
        }

        return data
    }

    return{
        context: getContext()
    }
})