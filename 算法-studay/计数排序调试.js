var arr = [3,4,6,3,6]
function countSort(arr){
    if(arr.lenth<2){
        return
    }
    const maxvalue = findMax(arr)
    const count = new Array(maxvalue+1)
   
    arr.forEach((item)=>{
        if(!count[item]){
            count[item]=0
        }
        count[item]++
    })
    let newarr = []
    let sortindex = 0
    count.forEach((item,index)=>{
        while(item>0){
            newarr[sortindex++]=index
            item--
        }
    })
    return newarr
}
function findMax(arr){
    let max = arr[0]
    for(let i=1;i<arr.length;i++){
        if(arr[i]>max){
            max = arr[i]
        }
    }
    return max
}
countSort(arr)