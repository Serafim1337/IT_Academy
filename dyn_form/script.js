function createDynamicForm(currentForm, description) {
    const formElementsArray = [];

    for (let item of description) {

        // проверить есть ли данные поля
        const itemVariants = item.variants;
        const itemCaption = item.caption;

        // в любом случае создается элемент формы определенного типа
        let formElement = document.createElement('input');

        switch (item.kind) {
            case 'longtext':
            case 'shorttext':
                formElement.type = 'text';
                break;
            case 'number':
                formElement.type = 'number';
                break;
            case 'combo':
                // перезапись элемента формы, если необходим другой тег
                formElement = document.createElement('select');
                break;
            case 'radio':
                formElement = document.createElement('div');
                break;
            case 'memo':
                formElement = document.createElement('textarea');
                break;
            case 'check':
                formElement.type = 'checkbox';
                break;
            case 'submit':
                formElement.type = 'submit';
                break;
        }

        // если нет поля caption то это не кнопка
        if (!itemCaption) {

            // в любом случае есть лейбл 
            const label = document.createElement('label');
            label.textContent = item.label;

            // обрабатывается содержимое элемента формы
            if (item.kind !== 'radio') {
                formElement.name = item.name;
            }

            // в случае если есть свойство с массивом вариантов
            if (itemVariants) {
                switch (item.kind) {
                    case 'combo':
                        for (let option of itemVariants) {
                            const opt = document.createElement('option');
                            opt.value = option.value;
                            opt.textContent = option.text;
                            formElement.append(opt);
                        }
                        break;
                    case 'radio':
                        for (let option of itemVariants) {

                            const radio = document.createElement('input');
                            radio.type = item.kind;
                            radio.name = item.name;
                            radio.value = option.value;

                            const span = document.createElement('span');
                            span.textContent = option.text;

                            formElement.append(radio);
                            formElement.append(span);
                        }
                        break;
                }
            }

            label.append(formElement);

            // сохранение элемента
            formElementsArray.push(label);

            // создание кнопки в случае наличия поля caption
        } else {
            formElement.value = itemCaption;
            formElementsArray.push(formElement);
        }

    }

    // добавление элементов
    const fieldSet = document.createElement('fieldset');
    currentForm.append(fieldSet);

    for (let element of formElementsArray) {
        fieldSet.append(element);
    }
}


const form = document.forms.dynForm;

const formDef1 =
    [
        { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
        { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
        { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
        { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
        },
        { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
        { label: 'Описание сайта:', kind: 'memo', name: 'description' },
        { caption: 'Опубликовать', kind: 'submit' },
    ];

const formDef2 =
    [
        { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
        { label: 'Имя:', kind: 'longtext', name: 'firstname' },
        { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
        { label: 'Возраст:', kind: 'number', name: 'age' },
        { caption: 'Зарегистрироваться', kind: 'submit' },
    ];

createDynamicForm(form, formDef1);
createDynamicForm(form, formDef2);