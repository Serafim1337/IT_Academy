function createDynamicForm(currentForm, description) {
    const formElements = [];

    for (let item of description) {
        // проверить есть ли данные поля
        const itemVariants = item.variants;
        const itemCaption = item.caption;

        // в любом случае создается инпут определенного типа
        const itemType = setType(item.kind);
        let input;
        if (itemType == 'textarea') {
            input = document.createElement('textarea');
            input.type = itemType;
        } else if (itemType == 'select') {
            input = document.createElement('select');
            input.type = itemType;
        } else if (itemType == 'radio') {
            input = document.createElement('div');
        }
        else {
            input = document.createElement('input');
            input.type = itemType;

        }

        // если нет данного поля то это не кнопка
        if (!itemCaption) {

            // в любом случае есть лейбл 
            const label = document.createElement('label');
            label.textContent = item.label;

            // обрабатывается содержимое инпута
            if (itemType !== 'radio') {
                input.name = item.name;
            }

            if (itemVariants) {
                switch (itemType) {
                    case 'select':
                        for (let option of itemVariants) {
                            console.log(option);
                            const opt = document.createElement('option');
                            opt.value = option.value;
                            opt.textContent = option.text;
                            input.append(opt);
                        }
                        break;
                    case 'radio':
                        for (let option of itemVariants) {

                            const radio = document.createElement('input');
                            radio.type = itemType;
                            radio.name = item.name;
                            radio.value = option.value;

                            const span = document.createElement('span');
                            span.textContent = option.text;

                            input.append(radio);
                            input.append(span);
                        }
                        break;
                }
            }


            label.append(input);



            // сохранение элемента
            formElements.push(label);

            // создание кнопки в случае наличия поля
        } else {
            input.value = itemCaption;
            formElements.push(input);
        }

    }

    console.log(formElements);

    // добавление элементов
    const fieldSet = document.createElement('fieldset');
    currentForm.append(fieldSet);

    for (let element of formElements) {
        fieldSet.append(element);
    }
}

function setType(itemKind) {
    switch (itemKind) {
        case 'longtext': return 'text';
        case 'shorttext': return 'text';
        case 'number': return itemKind;
        case 'combo': return 'select';
        case 'radio': return itemKind;
        case 'memo': return 'textarea';
        case 'check': return 'checkbox';
        case 'submit': return itemKind;
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