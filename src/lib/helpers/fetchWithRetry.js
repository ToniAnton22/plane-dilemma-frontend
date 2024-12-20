import { databaseLoading, setMessage } from "$lib/loadingStore"

export const fetchWithRetry = async(url, retryDelay=5000, maxRetries=5,fetch) =>
{
    databaseLoading.set(true)
    try{
        const response = await fetch(url)

        if(response.status== 200){
            databaseLoading.set(false)
            setMessage("Loading...")
            return await response.json()
        }else if (response.status === 502 && maxRetries != 0){
 
            console.log(`Attempt has been exhausted, ${maxRetries-1} more to go....`)
            setMessage(`Database is still sleepy, bare with us for a moment! Retrying... (${maxRetries -1} remaining)`)
            await new Promise(resolve => (setTimeout(async () =>{
                await fetchWithRetry(url,retryDelay,maxRetries-1,fetch)
                resolve("OK")
            },retryDelay))) 
        }else if (response.status === 504 && maxRetries != 0){
 
            console.log(`Attempt has been exhausted, ${maxRetries-1} more to go....`)
            setMessage(`Database is still sleepy, bare with us for a moment! Retrying... (${maxRetries -1} remaining)`)
            await new Promise(resolve => (setTimeout(async () =>{
                await fetchWithRetry(url,retryDelay,maxRetries-1,fetch)
                resolve("OK")
            },retryDelay))) }
        else if (response.status == 500 && maxRetries !=0){
            console.log(`Attempt has been exhausted, ${maxRetries-1} more to go....`)
            setMessage(`Database is still sleepy, bare with us for a moment! Retrying... (${maxRetries -1} remaining)`)
            await new Promise(resolve => (setTimeout(async () =>{
                await fetchWithRetry(url,retryDelay,maxRetries-1,fetch)
                resolve("OK")
            },retryDelay)))
        }
        else{
 
            setMessage(`Database didn't wake up in time, please refresh the page or come back a bit later!`)
            throw new Error(`Request failed with status: ${response.status}`)
        }
    }catch(e){
        setMessage('Database experiences an unexpected error. Please refresh and try again')
        console.error(e)
    }
}