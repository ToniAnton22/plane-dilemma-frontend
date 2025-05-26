import {DB_HOST} from "$env/static/private"


export async function POST(){
    const jsonData = JSON.stringify({
        model: "creation-llama:latest",
        prompt: "Explain the concept of a black mole"
    })
    const response = await fetch("http://localhost:11434/api/generate",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept": "application/json"
        },
        body:jsonData
    })

}