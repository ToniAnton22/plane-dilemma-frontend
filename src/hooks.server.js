export function handleError({error}){
    console.error(error.stack)

    return {
        message: 'An error has occured, please try again in a bit',
        code: "Database error."
    }
}