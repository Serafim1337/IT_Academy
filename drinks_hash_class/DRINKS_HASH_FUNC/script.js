class HashStorageClass {

    constructor() {

    }

    publicHash = {};

    addValue = function (key, value) {
        this.publicHash[key] = value;
    }

    getValue = function (key) {
        return (key in this.publicHash) ? this.publicHash[key] : undefined;
    }

    deleteValue = function (key) {
        if (key in this.publicHash) {
            delete this.publicHash[key];
            return true;
        } else {
            return false;
        }
    }

    getKeys = function () {
        return Object.keys(this.publicHash);
    }
}

const drinkStorage = new HashStorageClass();

const inputButton = document.querySelector('.input-button');
const getDrinkButton = document.querySelector('.get-drink-button');
const deleteDrinkButton = document.querySelector('.delete-drink-button');
const listDrinkButton = document.querySelector('.list-drink-button');

inputButton.addEventListener('click', function (e) {
    let drinkName;
    let hasAlcohol;
    let recipe;

    while (!drinkName) {
        drinkName = prompt('Название напитка:', 'Кровавая Мэри');
    };
    while (!hasAlcohol) {
        hasAlcohol = prompt('Алкогольный:', 'Да');
    };
    while (!recipe) {
        recipe = prompt('Рецепт:', '45 мл водки, 90 мл томатного сока, 15 мл лимонного сока, 2-3 всплеска вустерского соуса, Табаско');
    };

    drinkStorage.addValue(drinkName, [hasAlcohol, recipe]);
});

getDrinkButton.addEventListener('click', function (e) {
    let drinkName;

    while (!drinkName) {
        drinkName = prompt('Название напитка:', 'Кровавая Мэри');
    };

    const drinkInfo = drinkStorage.getValue(drinkName);

    if (drinkInfo) {
        const [hasAlcohol, recipe] = drinkInfo;
        alert(`напиток: ${drinkName}\nалкогольный: ${hasAlcohol}\nрецепт приготовления: ${recipe}`);
    } else {
        alert('Такой напиток отсутствует.')
    }
})

deleteDrinkButton.addEventListener('click', function (e) {
    let drinkName;

    while (!drinkName) {
        drinkName = prompt('Удалить напиток:', 'Кровавая Мэри');
    };

    const isDeleted = drinkStorage.deleteValue(drinkName);

    alert(!isDeleted ? 'Такой напиток отсутствует.' : 'Напиток удален');

})

listDrinkButton.addEventListener('click', function (e) {
    const drinksList = drinkStorage.getKeys().join(', ');
    alert(drinksList ? drinksList : 'Напитки отсутствуют.');

})