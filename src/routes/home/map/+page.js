export const load = (({fetch}) =>{
    const fetchTowns = async () =>{
        let response = await fetch("../api/getTowns")

        let towns = await response.json()

        return towns
    } 

    return {
        towns:fetchTowns()
    }
})