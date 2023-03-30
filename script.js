const userString = prompt("Your string?");

function vowels1(str) {
  const rusVowels = ["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"];
  const checkString = str.toLowerCase();
  let counter = 0;

  for (let i = 0; i < checkString.length; i++) {
    if (rusVowels.includes(checkString[i])) {
      counter++;
    }
  }

  return counter;
}

function vowels2(str) {
  let set = new Set(["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"]);
  const checkString = str.toLowerCase();
  let counter = 0;

  for (let item of checkString) {
    if (set.has(item)) {
      counter++;
    }
  }

  return counter;
}

console.log("vovels1 result : " + vowels1(userString));

console.log("vovels2 result : " + vowels2(userString));
