
function getAllSubArrays(arr){

    let finalArray = [];
    let counter = Math.pow(2,arr.length);

    for(let i=0; i<counter; i++){
        let binary = i.toString(2).padStart(arr.length,"0");
        console.log(binary)
        let currentSubArr = [];
        for(let j=0; j<binary.length; j++ ){
            if(binary[j] === "1"){
                currentSubArr.push(arr[j])
            } 
        }
        if(currentSubArr.length > 0){
            finalArray.push(currentSubArr);
        }
        
    }

    return finalArray;
}

let arr = [ 1, 2, 3, 4 , 5];
let allSubArrays = getAllSubArrays(arr);
console.log(allSubArrays); 



