import {setItem, getItem} from "$lib/storage.js"
import { fetchWithRetry } from '$lib/helpers/fetchWithRetry.js'

export const load = (({fetch}) =>{
    const fetchTowns = async () =>{
        let towns = getItem("towns")
        if(!towns || towns?.message=="Internal Error"){
    
            let response = await fetchWithRetry("../api/getTowns",8000,5,fetch)
            
            towns = response

            setItem('towns', towns)
    
        }
        if(towns?.errorType == "LambdaTimeout"){
            setTimeout(() => fetchTowns(),3000)
        }
        console.log(towns[0]?.image)
       return towns
    }
    return {
        towns:fetchTowns()
    }
})
