

const defaultValue = 'summer';

export const initialValue = !import.meta.env.SSR ? sessionStorage.getItem('sessionStorageInitialized') ?? defaultValue : defaultValue;


export const setItem = (key,value) =>{
    if(!import.meta.env.SSR){
        return sessionStorage.setItem(key,JSON.stringify(value))
    }
    return 
}

export const getItem = (key) =>{
    if(!import.meta.env.SSR){
        const item = sessionStorage?.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    return 
}

