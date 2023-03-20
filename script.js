let firstName;
let lastName;
let secondName;
let age = 0;
let gender;

while (firstName == "" || firstName == null) {
  firstName = prompt("*Ваше имя:");
}

while (secondName == "" || secondName == null) {
  secondName = prompt("*Ваше отчество:");
}

while (lastName == "" || lastName == null) {
  lastName = prompt("*Ваша фамилия:");
}

do {
  age = +prompt("*Ваш возраст:");
} while (!isFinite(age) || age < 0 || age > 100 || age == "" || age == null);

gender = confirm("*Ваш пол мужской? (ОК - да, Отмена - нет)");

alert(`ваше ФИО: ${firstName} ${secondName} ${lastName}
ваш возраст в годах: ${age}
ваш возраст в днях: ${age * 365} 
через 5 лет вам будет: ${age + 5} 
ваш пол: ${gender === true ? "мужской" : "женский"} 
вы на пенсии: ${isRetired(age, gender) ? "да" : "нет"}`);

function isRetired(age, gender) {
  switch (gender) {
    case true:
      if (age > 60) {
        return true;
      } else {
        return false;
      }
    case false:
      if (age > 55) {
        return true;
      } else {
        return false;
      }
  }
}
