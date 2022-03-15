const arr =  [1,2,2,3,4,5]

function calc (arr) {
  let max = 0;
  let sum = 0;
  let hasShare = false;
  let share;

  for (let i = 0; i < arr.length; i++) {
    hasShare = false;
    if (!hasShare) {
      share = arr[i];
      hasShare = true;
    }
    if (hasShare) { 
      for (let j = i; j < arr.length; j++) {
        if (arr[j] > arr[j + 1]) {
          sum += arr[j] - share;
          break;
        }
        if (j + 1 === arr.length) {
          sum += arr[j] - share;
          i = arr.length;
        }
      }
      if (sum > max) max = sum;
    }
  }
  
  return max;
}

console.log(calc(arr))