import {error} from '@sveltejs/kit'

export function load(){
    throw error(501, 'Timeout, please retry')
}