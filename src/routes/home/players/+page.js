export const load = ({fetch}) =>{
    const fetchPlayers = async() =>{
        const res = await fetch('/api/getplayers')
        const players = await res.json()
        
        return players
    }
    return{
        players:fetchPlayers()
    }
}