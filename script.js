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
