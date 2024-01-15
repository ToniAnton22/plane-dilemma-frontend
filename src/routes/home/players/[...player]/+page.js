export const load = ({url}) =>{
    
    const getPlayer = async () =>{
        
        let player = await JSON.parse(url.searchParams.get('detail'))

        
        return player
    }

    return {
        player: getPlayer()
    }
}