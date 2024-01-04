export const load = ({fetch,params}) =>{
    
    const getPlayer = async () =>{
        
        var data = await fetch(`/api/getPlayer/${params?.id}`)

        var player = await data.json()
        
        return player
    }

    return {
        player: getPlayer()
    }
}