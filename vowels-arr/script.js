const userString = prompt("Your string?");

<<<<<<< HEAD:vowels/script.js
function vowels1(str) {
  const rusVowels = ["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"];
  const checkString = str.toLowerCase();
  let counter = 0;

  for (let i = 0; i < checkString.length; i++) {
    if (rusVowels.includes(checkString[i])) {
      counter++;
    }
  }
=======
function vowels3(str) {
  const set = new Set(["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"]);
  const checkString = str.toLowerCase();
  let counter = 0;

  checkString.split('').forEach(item => {
    if(set.has(item)) {
      counter++
    }
  });
>>>>>>> vowels-arr:vowels-arr/script.js

  return counter;
}

<<<<<<< HEAD:vowels/script.js
function vowels2(str) {
  let set = new Set(["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"]);
  const checkString = str.toLowerCase();
  let counter = 0;

  for (let item of checkString) {
    if (set.has(item)) {
      counter++;
    }
  }
=======
function vowels4(str) {
  const set = new Set(["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"]);
  const checkString = str.toLowerCase();

  const filterResults = checkString.split('').filter(item=>set.has(item));

  const vowelsCount = filterResults.length;

  return vowelsCount;
}

function vowels5(str) {
  let set = new Set(["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"]);
  const checkString = str.toLowerCase();
  
  const counter = checkString.split('').reduce((acc,curr)=>{
    if(set.has(curr)) {
      acc++;
    }
    return acc;
  },0);
>>>>>>> vowels-arr:vowels-arr/script.js

  return counter;
}

<<<<<<< HEAD:vowels/script.js
console.log("vovels1 result : " + vowels1(userString));

console.log("vovels2 result : " + vowels2(userString));

=======
console.log("vovels3 result : " + vowels3(userString));
>>>>>>> vowels-arr:vowels-arr/script.js

