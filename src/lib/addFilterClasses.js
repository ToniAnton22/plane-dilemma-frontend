

export const addFilterClasses = ((filter) =>{

    // eslint-disable-next-line no-debugger

    if(filter?.capital){
        return( `<div class="flex-row-reverse overflow-hidden justify-center items-center align-center w-full h-full bg-gradient-to-br variant-gradient-primary-secondary rounded-lg border-red-300 border-4 ">
        <div class="flex w-full text-lg py-2 mx-auto justify-center items-center">${filter?.name}</div>
        <div class="card-body text-lg mx-auto px-2">Population: ${filter?.population}</div>
        <div class="card-footer"> Give yourself time to remember what happened last session! </div>
        <button class="btn variant-filled-surface flex justify-center w-full" id="expand">Expand</button>
    </div>`
    )
    }
    else if(filter?.shanty_Town){
        
        return( `<div class="flex-row-reverse overflow-hidden justify-center items-center align-center w-full h-full bg-gradient-to-br from-gray-600 to-slate-400 rounded-lg border-stone-600 border-4 ">
        <div class="flex w-full text-lg py-2 mx-auto justify-center items-center">${filter?.name}</div>
        <div class="card-body text-lg mx-auto px-2">Population: ${filter?.population}</div>
        <div class="card-footer"> Give yourself time to remember what happened last session! </div>
    </div>`
    
    )
    }
    else if(filter?.port){

        return( `<div class="flex-row-reverse overflow-hidden justify-center items-center align-center w-full h-full bg-gradient-to-br from-cyan-700 to-blue-400 rounded-lg border-cyan-900 border-4 ">
        <div class="flex w-full text-lg py-2 mx-auto justify-center items-center">${filter?.name}</div>
        <div class="card-body text-lg mx-auto px-2">Population: ${filter?.population}</div>
        <div class="card-footer"> Give yourself time to remember what happened last session! </div>
    </div>`
    )
    }
    else{
        return( `<div class="flex-row-reverse overflow-hidden justify-center items-center align-center w-full h-full bg-gradient-to-br variant-gradient-primary-secondary rounded-lg border-red-600 border-4 ">
    <div class="flex w-full text-lg py-2 mx-auto justify-center items-center">${filter?.name}</div>
    <div class="card-body text-lg mx-auto px-2">Population: ${filter?.population}</div>
    <div class="card-footer"> Give yourself time to remember what happened last session! </div>
    </div>`
)
    }
    
    
})