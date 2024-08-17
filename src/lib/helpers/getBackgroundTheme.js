export const getTheme= (player) =>{
    let theme
    let textTheme
    let background
    if(player?.name === "Vanelis"){
        theme = "bg-gradient-to-br from-black via-slate-500 to-cyan-800 w-full h-full"
        textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-blue-600 "
        background = "/images/background/Vanelis-bg.webp"

    }
    else if(player?.name === "Ng`ombe Radolack"){
        theme="bg-gradient-to-tr from-stone-900 via-orange-950 to-yellow-800 w-full h-full"
        textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-stone-100 "
        background = "/images/background/Radolak-bg.webp"
    }
    else if(player?.name === "Jamond Carter"){
        theme="bg-gradient-to-br from-indigo-900 via-rose-950 to-blue-800 w-full h-full"
        textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-blue-400 "
        background = "/images/background/Jamond-bg.webp"
    
    }
    else if(player?.name === "Kalahari"){
        theme=`bg-gradient-to-b from-gray-500 via-rose-100 to-slate-800 w-full h-full`
        textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400  "
        background = "/images/background/Kalahari-bg.webp"
    }
    else if(player?.name === "Fennex Stoutwings"){
        theme="bg-gradient-to-t from-amber-700 via-orange-700 to-red-700 w-full h-full overflow-hidden"
        textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-orange-100 to-amber-100 "
        background = "/images/background/Fennex-bg.webp"
    }
    else if(player?.name === "Bastion"){
        theme="bg-gradient-to-r from-cyan-900 via-slate-600 to-zinc-800 w-full h-full "
        textTheme="font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-neutral-100 "
        background = "/images/background/Bastion-bg.webp"
    }
    return {theme,textTheme,background}
}