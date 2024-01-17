
import {setItem, getItem} from "$lib/storage.js"

export const load = (({fetch}) =>{
    const getContext = async () =>{
    
        let data = getItem('context')
        if(!data || data?.message=="Internal Error"){
  
            var res = await fetch("/api/getContext")

            data =await res.json()
            setItem('context',data)
        }


        return data
    }

    return{
        context: getContext()
    }
})