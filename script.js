const userString = prompt("Your string?");

function vowels1(str) {
  const rusVowels = ["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"];

  let counter = 0;

  for (let i = 0; i < str.length; i++) {
    if (rusVowels.includes(str[i])) {
      counter++;
    }
  }

  return counter;
}

function vowels2(str) {
  let set = new Set(["а", "я", "у", "ю", "о", "е", "ё", "э", "и", "ы"]);

  let counter = 0;

  for (let item of str) {
    if (set.has(item)) {
      counter++;
    }
  }

  return counter;
}

console.log("vovels1 result : " + vowels1(userString));

console.log("vovels2 result : " + vowels2(userString));
