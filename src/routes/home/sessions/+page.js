
export const load= ({fetch}) =>{
    const fetchSummaries = async () =>{
        const res = await fetch('/api/getSummary');
        const summaries = await res.json()
        
        return summaries
    }
    
    return{
        summaries:fetchSummaries()
    }
}