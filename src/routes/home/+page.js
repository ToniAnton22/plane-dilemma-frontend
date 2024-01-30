import {databaseLoading,sessionStorageInitialized} from "$lib/loadingStore.js"
import {get} from 'svelte/store'
export const load = ({fetch}) =>{
    async function checkDatabaseResponsiveness() {
        try {
          // Perform a database query or ping here
          // You can use fetch or any appropriate method
            const sessionStore = get(sessionStorageInitialized)
            console.log(sessionStore)
     
          if(!sessionStore){
            databaseLoading.set(true)
            const isLoading = get(databaseLoading)
            console.log("Database check " + isLoading )
            if(isLoading == true){
              const response = await fetch(`/api/getplayers`);
      
              if (response.status == 502) {
                  databaseLoading.set(true)
                  throw new Error('Database not responsive'); 
              }
              sessionStorageInitialized.set(true)
              databaseLoading.set(false)
              return false
            }
          }
          return false
        } catch (error) {
          console.error('Database responsiveness check failed:', error);
          databaseLoading.set(true)
          return true
        }
    }
    return{
        data:checkDatabaseResponsiveness()
    }
}