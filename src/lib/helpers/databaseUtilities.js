import {databaseLoading} from "$lib/loadingStore.js"

export async function checkDatabaseResponsiveness() {
    try {
      // Perform a database query or ping here
      // You can use fetch or any appropriate method
      const isLoading = get(databaseLoading)
      console.log("Database check " + isLoading )
      if(isLoading == true){
        const response = await fetch(`${DB_HOST}players`);

        if (response.status == 502) {
            isLoading.set(true)
            throw new Error('Database not responsive'); 
        }
        isLoading.set(false)
      }
    } catch (error) {
      console.error('Database responsiveness check failed:', error);
     
    }
  }