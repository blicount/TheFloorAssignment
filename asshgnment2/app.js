
 
/* // Javascript code to print all possible
// subarrays for given array using recursion
 
// Recursive function to print all
// possible subarrays for given array
function printSubArrays(arr, start, end){
     console.log('arr > ',arr,'start > ',start, 'end > ',end)
    // Stop if we have reached the end
    // of the array    
    if (end == arr.length){
        return;
    }       
    // Increment the end point and start
    // from 0
    else if (start > end){
        printSubArrays(arr, 0, end + 1);
    }      
    // Print the subarray and increment
    // the starting point
    else {
        let currArr = [];
        for(let i = start; i <= end; i++){
            currArr.push(arr[i]);
        }
        console.log(currArr);
        printSubArrays(arr, start + 1, end);
    }
    return;
} */
 
// Driver code
let arr = [ 1, 2, 3 ];
printSubArrays(arr);


function printSubArrays(arr){
 
    let n=arr.length;
    //This loop will select start element
    for (let i=0; i <n; i++){
        //This loop will select end element
        for (let j=i; j<n; j++) {
            let currArr = []
            //This loop will print element from start to end
            for (let k=i; k<=j; k++){
                currArr.push(arr[k]); 
            }
            console.log(currArr);
        }
    }
}




