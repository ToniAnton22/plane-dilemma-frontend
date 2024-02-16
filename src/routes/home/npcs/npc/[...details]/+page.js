export const load = ({url}) =>{
    
    const getNpc = async () =>{
     
        let npc = await JSON.parse(url.searchParams.get('detail'))
  
        return npc
    }

    return {
        npc: getNpc()
    }
}