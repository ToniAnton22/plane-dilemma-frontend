import {getItem} from "$lib/storage.js" 
import { fetchWithRetry } from "../lib/helpers/fetchWithRetry.js";
import { setItem } from "$lib/storage.js";

export const load = ({fetch}) =>{
  const sessionStoreInitialized = getItem('players');
      if (sessionStoreInitialized) {
        console.log("Session storage already initialized, skipping database check.");
        return {open: true};
      }
      
      async function checkDatabase(){
        const npcs = await fetchWithRetry('/api/getnpcs',8000,5,fetch)
        setItem('npcs',npcs)
        return {open:false}
      }

      checkDatabase()
    return {open: true};
};