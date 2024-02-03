import {setItem, getItem} from "$lib/storage.js"

export const load = (({fetch}) =>{
    const fetchTowns = async () =>{
        let towns = getItem("towns")
        if(!towns || towns?.message=="Internal Error"){
    
            let response = await fetch("../api/getTowns")
            
            towns = await response.json()

            setItem('towns', towns)
    
        }
        if(towns?.errorType == "LambdaTimeout"){
            setTimeout(() => fetchTowns(),3000)
        }

       return towns
    }
    return {
        towns:fetchTowns()
    }
})