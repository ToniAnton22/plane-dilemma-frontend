export const load = (({fetch}) =>{
    const getContext = async () =>{
        var res = await fetch("/api/getContext")

        var data = res.json()

        return data
    }

    return{
        context: getContext()
    }
})