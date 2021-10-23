
 
// Javascript code to print all possible
// subarrays for given array using recursion
 
// Recursive function to print all
// possible subarrays for given array
/* function getAllSubArrays(arr, start, end){
    // Stop if we have reached the end
    // of the array    
    if (end == arr.length){
        return;
    }       
    // Increment the end point and start
    // from 0
    else if (start > end){
        getAllSubArrays(arr, 0, end + 1);
    }      
    // Print the subarray and increment
    // the starting point
    else {
        let currArr = [];
        for(let i = start; i <= end; i++){
            currArr.push(arr[i]);
        }
        console.log(currArr);
        getAllSubArrays(arr, start + 1, end);
    }
    return;
}  */
 
let arr = [ 1, 2, 3, 4, 5, 6 ];
let allSubArrays = getAllSubArrays(arr);
console.log(allSubArrays); 

function getAllSubArrays(arr){
    let finalArray = []
    let n = arr.length;
    //This loop will select start element
    for (let i=0; i <n; i++){
        //This loop will select end element
        for (let j=i; j<n; j++) {
            let currArr = []
            //This loop will print element from start to end
            for (let k=i; k<=j; k++){
                currArr.push(arr[k]); 
            }
            finalArray.push(currArr);
        }
    }

    return finalArray;
}




