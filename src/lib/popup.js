export const popupString = (filter) =>{
    return( `<div class="flex-row-reverse overflow-hidden justify-center items-center align-center w-full h-full bg-gradient-to-br variant-gradient-primary-secondary rounded-tr-full rounded-tl-full border-red-300 border-4 ">
        <div class="bg-[url(${filter?.image})] rounded-full mx-auto bg-cover bg-center justify-center align-center w-full h-24"></div>
        <div class="flex w-full text-lg py-2 mx-auto justify-center items-center">${filter?.name}</div>
        <div class="card-body text-lg mx-auto px-2">Population: ${filter?.population}</div>
        <div class="card-footer"> Give yourself time to remember what happened last session! </div>
    </div>`
    )
}