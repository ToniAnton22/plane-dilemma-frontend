export const ssr = false
import {getItem, setItem} from "$lib/storage.js" 
import { loading } from "$lib/helpers/loading.svelte.js";

export const load = ({fetch}) =>{
    if(loading.isMaintanance){
      loading.value = true
      loading.message = "Database under maintenance, if you need details on my abilities contact me at frincucristiananton@gmail.com"
    return
  }
  loading.value = true
  const sessionStoreInitialized = getItem('sessionSummaries');
      if (sessionStoreInitialized && Object.values(sessionStoreInitialized).length > 0) {
        loading.value = false
        console.log("Session storage already initialized, skipping database check.");
        return {
          sessions: sessionStoreInitialized,
          players: getItem('players'),
          seesionPlayers: getItem('sessionPlayers'),
          sessionNpcs: getItem('sessionNpcs'),
          sessionEvents: getItem('sessionEvents'),
          npcs: getItem('npcs'),
        };
      }
      
      async function checkDatabase(){
        try{
          loading.message=`Loading in server...`
          const data = await(await fetch('/api/getDetails')).json()
          if(data || data != 'Error: Error: Request in progress'){
            for(const property in data){
              setItem(property,data[property].value)
            }
            loading.value = false
            return {
              sessions: data.sessionSummaries,
              players: getItem('players'),
              seesionPlayers: getItem('sessionPlayers'),
              sessionNpcs: getItem('sessionNpcs'),
              sessionEvents: getItem('sessionEvents'),
              npcs: getItem('npcs'),
            }
          }
          
          loading.value = true
          return {open:false}
        }catch(e){
          console.log("Error in checkDatabase",e)
          loading.value = true
          return {open:false}
        }
      }
    return checkDatabase()
};