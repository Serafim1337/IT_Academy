class LocStorageClass {
    constructor(storageName) {
        this.storageName = storageName;
    }

    #localObj = {};

    #checkLocalStorage() {
        if(localStorage[this.storageName]) {
            this.#localObj =  JSON.parse(localStorage[this.storageName]);
        } 
    }

    addValue(key, value) {
        this.#checkLocalStorage();
        this.#localObj[key] = value;
        localStorage[this.storageName] = JSON.stringify(this.#localObj);
    }

    getValue(key) {
        this.#checkLocalStorage();
        return (key in this.#localObj) ? this.#localObj[key] : undefined;
    }

    deleteValue(key) {
        this.#checkLocalStorage();
        if (key in this.#localObj) {
            delete this.#localObj[key];
            localStorage[this.storageName] = JSON.stringify(this.#localObj);
            return true;
        } else {
            return false;
        }
    }

    getKeys() {
        this.#checkLocalStorage();
        return Object.keys(this.#localObj);
    }
}

const drinkStorage = new LocStorageClass('drinks');

const inputDrinkButton = document.querySelector('.input-drink-button');
const getDrinkButton = document.querySelector('.get-drink-button');
const deleteDrinkButton = document.querySelector('.delete-drink-button');
const listDrinkButton = document.querySelector('.list-drink-button');

inputDrinkButton.addEventListener('click', function (e) {
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

const mealsStorage = new LocStorageClass('meals');

const inputMealButton = document.querySelector('.input-meal-button');
const getMealButton = document.querySelector('.get-meal-button');
const deleteMealButton = document.querySelector('.delete-meal-button');
const listMealButton = document.querySelector('.list-meal-button');

inputMealButton.addEventListener('click', function (e) {
    let mealName;
    let glucoseAmount;
    let recipe;

    while (!mealName) {
        mealName = prompt('Название Блюда:', 'Яичница');
    };  
    while (!glucoseAmount) {
        glucoseAmount = prompt('Содержание глюкозы:', '0.37 г');
    };
    while (!recipe) {
        recipe = prompt('Рецепт:', '1 яйцо, соль по вкусу');
    };

    mealsStorage.addValue(mealName, [glucoseAmount, recipe]);
});

getMealButton.addEventListener('click', function (e) {
    let mealName;

    while (!mealName) {
        mealName = prompt('Название Блюда:', 'Яичница');
    };

    const mealInfo = mealsStorage.getValue(mealName);

    if (mealInfo) {
        const [glucoseAmount, recipe] = mealInfo;
        alert(`Блюдо: ${mealName}\nГлюкоза: ${glucoseAmount}\nрецепт приготовления: ${recipe}`);
    } else {
        alert('Такоe блюдо отсутствует.')
    }
})

deleteMealButton.addEventListener('click', function (e) {
    let mealName;

    while (!mealName) {
        mealName = prompt('Удалить блюдо:', 'Яичница');
    };

    const isDeleted = mealsStorage.deleteValue(mealName);

    alert(!isDeleted ? 'Такое блюдо отсутствует.' : 'Блюдо удалено');

})

listMealButton.addEventListener('click', function (e) {
    const mealsList = mealsStorage.getKeys().join(', ');
    alert(mealsList ? mealsList : 'Блюда отсутствуют.');

})