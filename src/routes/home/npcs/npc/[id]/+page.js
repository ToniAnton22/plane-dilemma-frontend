export const load = ({fetch,params}) =>{
    
    const getNpc = async () =>{
        
        var data = await fetch(`/api/getNpc/${params?.id}`)

        var npc = await data.json()
        
        return npc
    }

    return {
        npc: getNpc()
    }
}