import { getItem,setItem } from '$lib/storage.js'

export const load = ({fetch}) =>{
    const fetchPlayers = async() =>{
        let players = getItem('players')
      
        if(!players || players?.message=="Internal Error" || players?.errorType == "LambdaTimeout"){

       
            const res = await fetch('/api/getplayers')
            players = await res.json()

            setItem('players',players)
        }
        if(players?.errorType == "LambdaTimeout"){
            setTimeout(() => fetchPlayers(),3000)
        }

        
        return players
    }
    return{
        players:fetchPlayers()
    }
}