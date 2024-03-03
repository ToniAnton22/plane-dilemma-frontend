import {setItem, getItem} from '$lib/storage.js'
import { redirect } from '@sveltejs/kit'
import { fetchWithRetry } from '$lib/helpers/fetchWithRetry.js'
export const load= (({fetch}) =>{
    const fetchNpcs = async () =>{
        let npcs = getItem('npcs')
        if(!npcs || npcs?.message=="Internal Error" || npcs?.errorType == "LambdaTimeout" || npcs == undefined){
            const res = await fetchWithRetry('/api/getnpcs',8000,5,fetch);
            npcs = res
            if(!npcs){
                throw redirect(307,'/home')
            }
            setItem('npcs',npcs)
        }
        if(npcs?.errorType == "LambdaTimeout"){
            setTimeout(() => fetchNpcs(),3000)
        }
        
        return npcs

    }
    return{
        npcs:fetchNpcs()
    }
})