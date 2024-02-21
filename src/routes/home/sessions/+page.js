import { getItem,setItem } from '$lib/storage.js';

export const load= ({fetch}) =>{
    const fetchSummaries = async () =>{
        let summaries = getItem('summaries')
        if(!summaries || summaries?.message=="Internal Error" || summaries?.errorType == "LambdaTimeout"){
            console.log('Fetching from server')
            const res = await fetch('/api/getSummary');
            summaries = await res.json()
            setItem('summaries',summaries)
        
        }
        if(summaries?.errorType == "LambdaTimeout"){
            setTimeout(() => fetchSummaries(),3000)
        }

        return summaries
    }
    
    return{
        summaries:fetchSummaries()
    }
}