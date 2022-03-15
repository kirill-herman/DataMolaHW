const arr = [-2,1,-3,4,-1,2,1,-5,4];

function calc (arr) {
  let max = -Infinity;
  let sum = 0;
  
  for (let i = 0; i < arr.length; i++) {
    sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      if (sum > max) max = sum;
    }
  }

  return max;
}

console.log(calc(arr));