export const ssr = false
import {getItem, setItem} from "$lib/storage.js" 
import { loading } from "$lib/helpers/loading.svelte.js";

export const load = ({fetch}) =>{
    if(loading.isMaintanance){
      loading.value = true
      loading.message = "Database under maintenance, if you need details on my abilities contact me at frincucristiananton@gmail.com"
    return
  }
  const sessionStoreInitialized = getItem('npcs');
      if (sessionStoreInitialized && Object.values(sessionStoreInitialized).length > 0) {
        loading.value = false
        console.log("Session storage already initialized, skipping database check.");
        return {open: true};
      }
      
      async function checkDatabase(){
        try{
          loading.message=`Loading in server...`
          const data = await(await fetch('/api/getDetails')).json()
          const printData = []
          if(data || data != 'Error: Error: Request in progress'){
            for(const property in data){
              printData.push({[property]:data[property].value})
              setItem(property,data[property].value)
            }
            console.log(printData)
            loading.value = false
            return {open:true}
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