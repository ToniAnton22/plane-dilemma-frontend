export default function quicksort(arr,low,high){
    if(low < high){
        let pi = partition(arr,low,high)

        quicksort(arr,low,pi-1)
        quicksort(arr,pi+1,high)
    }else{
        return arr
    }
}

function partition(arr, low, high){
    let pivot = arr[high]

    let i = low - 1

    for(let j = low; j <= high; j++){
        if(arr[j] < pivot){
            i++
            [arr[i],arr[j]] = [arr[j],arr[i]]
        }
    }
    [arr[i+1],arr[high]] = [arr[high],arr[i+1]]
    return i+1
}