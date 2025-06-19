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
  const sessionStoreInitialized = getItem('players');
      if (sessionStoreInitialized && Object.values(sessionStoreInitialized).length > 0) {
        loading.value = false
        console.log("Session storage already initialized, skipping database check.");
 
        return {
          players: sessionStoreInitialized,
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
              players: data.players
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