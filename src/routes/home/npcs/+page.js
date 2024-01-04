export const load= (({fetch}) =>{
    const fetchNpcs = async () =>{
        const res = await fetch('/api/getnpcs');
        const npcs = await res.json()
        
        return npcs
    }
    
    return{
        npcs:fetchNpcs()
    }
})