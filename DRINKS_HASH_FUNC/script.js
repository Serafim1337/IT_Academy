function HashStorageFunc() {
    const self = this;

    const privateHash = {};

    self.addValue = function (key, value) {
        privateHash[key] = value;
    }

    self.getValue = function (key) {
        return (key in privateHash) ? privateHash[key] : undefined;
    }

    self.deleteValue = function (key) {
        if (key in privateHash) {
            delete privateHash[key];
            return true;
        } else {
            return false;
        }
    }

    self.getKeys = function () {
        return Object.keys(privateHash);
    }
}

const drinkStorage = new HashStorageFunc();

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

    if (drinkStorage.getValue(drinkName)) {
        const [hasAlcohol, recipe] = drinkStorage.getValue(drinkName);
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