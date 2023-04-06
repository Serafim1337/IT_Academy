function treeSum(arr) {
  let sum = 0;
  for (let item of arr) {
    if (!Array.isArray(item)) {
      sum += +item;
    } else {
      sum += treeSum(item);
    }
  }
  return sum;
}

console.log("sum = " + treeSum([5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8]));
