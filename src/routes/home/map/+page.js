import {setItem, getItem} from "$lib/storage.js"

export const load = (({fetch}) =>{
    const fetchTowns = async () =>{
        let towns = getItem("towns")
        console.log(towns)
        if(!towns || towns?.message=="Internal Error"){
    
            let response = await fetch("../api/getTowns")
            
            towns = await response.json()

            setItem('towns', towns)
    
        }
       return towns
    }
    return {
        towns:fetchTowns()
    }
})