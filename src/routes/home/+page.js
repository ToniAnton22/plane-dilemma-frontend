import {getItem, setItem} from "$lib/storage.js" 
import { fetchWithRetry } from "$lib/helpers/fetchWithRetry.js"
import { redirect } from "@sveltejs/kit"

export const load = ({fetch}) =>{
    let resourceUrlList = ['/api/getplayers','/api/getSummary','/api/getnpcs','/api/getTowns','/api/getContext']
    let resourcesList = ['players','summaries','npcs','towns','context']
    const fetchResources = async() =>{
        let resources = getItem('players')
        let data
        if(!resources || !resources?.name){
            for(let i;i < resourceUrlList.length-1;i++){
                const response = await fetchWithRetry(resourceUrlList[0], 8000, 5, fetch)
                data = response
                setItem(resourcesList[i],response)
            }
            if(!data){
                redirect(302,'/')
            }else{
                return {...data}
            }
        }
        return {...resources}
    }
    return fetchResources()
}
