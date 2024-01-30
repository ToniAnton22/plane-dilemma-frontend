import { browser } from "$app/environment";
import { writable } from "svelte/store";


const defaultValue = 'summer';

const initialValue = browser ? sessionStorage.getItem('theme') ?? defaultValue : defaultValue;


export const content = writable(initialValue)


export const setItem = (key,value) =>{
    content.subscribe(() =>{
        if(browser){
            return sessionStorage.setItem(key,JSON.stringify(value))
        }
    })
    return 
}

export const getItem = (key) =>{
    if(browser){
        const item = sessionStorage?.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    return 
}

