import { getItem,setItem } from '$lib/storage.js'
import { fetchWithRetry } from '$lib/helpers/fetchWithRetry.js'
export const load = ({fetch}) =>{
    const fetchPlayers = async() =>{
        let players = getItem('players')
      
        if(!players || players?.message=="Internal Error" || players?.errorType == "LambdaTimeout"){

             
            const res = await fetchWithRetry('/api/getplayers',8000,5,fetch)
            
            players = res
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