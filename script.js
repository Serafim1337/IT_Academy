function treeSum(arr) {
  let sum = 0;
  for (let item of arr) {
    if (!Array.isArray(item)) {
      console.log("number : " + item);
      sum += +item;
    } else {
      console.log("array : " + item);
      sum += treeSum(item);
    }
  }
  return sum;
}

console.log("sum= " + treeSum([5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8]));
