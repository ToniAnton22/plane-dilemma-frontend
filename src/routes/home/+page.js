import {databaseLoading} from "$lib/loadingStore.js"
import {getItem} from "$lib/storage.js" 

export const load = ({fetch}) =>{
  const sessionStoreInitialized = getItem('players');
      if (sessionStoreInitialized) {
        console.log("Session storage already initialized, skipping database check.");
        return {};
      }
      async function checkDatabaseResponsiveness(retryDelay = 5000, maxRetries = 5) {
        let retries = 0;
        
        while (retries < maxRetries) {
            try {
                const response = await fetch(`/api/getplayers`);
                
                if (response.ok) {
                    // Database responded successfully, mark as initialized and stop retrying
                    sessionStorage.setItem('sessionStorageInitialized', 'true');
                    databaseLoading.set(false);
                    console.log("Database is responsive.");
                    return;
                } else if (response.status === 502) {
                    // Database is not ready, retry after delay
                    console.log(`Database not ready, retrying... (${retries + 1}/${maxRetries})`);
                    databaseLoading.set(true)
                    retries++;
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                } else {
                    // Handle other responses
                    throw new Error(`Database returned status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error checking database responsiveness:", error);
                break; // Exit the loop on errors other than 502
            }
        }

        // Max retries reached without success
        databaseLoading.set(false);
        console.error("Max retries reached, database did not become responsive.");
    }

    // Start the check, but don't wait for it to finish - non-blocking
    checkDatabaseResponsiveness().catch(console.error);

    return {};
};