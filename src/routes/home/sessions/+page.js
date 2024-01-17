import { getItem,setItem } from '$lib/storage.js';

export const load= ({fetch}) =>{
    const fetchSummaries = async () =>{
        let summaries = getItem('summaries')
        if(!summaries || summaries?.message=="Internal Error"){
            console.log('Fetching from server')
            const res = await fetch('/api/getSummary');
            summaries = await res.json()
            setItem('summaries',summaries)
        
        }
        return summaries
    }
    
    return{
        summaries:fetchSummaries()
    }
}