// N.05 Treesum

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

console.log("------------------------------------------");

// N.07 Vowels

function vowels1() {
  let str = prompt("Your string?");
  const rusVowels = ["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"];
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (rusVowels.includes(str[i])) {
      counter++;
    }
  }
  alert("Vowels here : " + counter);
  return counter;
}

console.log("vovels1 result : " + vowels1());

function vowels2() {
  const str = prompt("Your string?");

  let set = new Set(["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"]);

  let counter = 0;

  for (let item of str) {
    if (set.has(item)) {
      counter++;
    }
  }

  alert("Vowels here : " + counter);

  return counter;
}

console.log("vovels2 result : " + vowels2());
