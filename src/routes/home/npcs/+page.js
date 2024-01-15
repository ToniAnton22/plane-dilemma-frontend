import {setItem, getItem} from '$lib/storage.js'
export const load= (({fetch}) =>{
    const fetchNpcs = async () =>{
        let npcs = getItem('npcs')
        if(!npcs){
            const res = await fetch('/api/getnpcs');
            npcs = await res.json()
            
            setItem('npcs',npcs)
        }
        return npcs
    }
    
    return{
        npcs:fetchNpcs()
    }
})