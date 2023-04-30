(function createEventListeners() {
    catalogForm.addEventListener('submit', submitValidation);
    catalogForm.elements.devName.addEventListener('blur', devNameValidator);
    catalogForm.elements.siteName.addEventListener('blur', siteNameValidator);
    catalogForm.elements.siteURL.addEventListener('blur', siteURLValidator);
    catalogForm.elements.launchDate.addEventListener('blur', launchDateValidator);
    catalogForm.elements.visitsNumber.addEventListener('blur', visitsNumberValidator);
    catalogForm.elements.contactEmail.addEventListener('blur', contactEmailValidator);
    catalogForm.elements.catalogTopic.addEventListener('blur', catalogTopicValidator);
    catalogForm.elements.siteDesc.addEventListener('blur', siteDescValidator);

    const hostingTypeButtons = document.querySelectorAll('[name=hostingType]');
    for (let button of hostingTypeButtons) {
        button.addEventListener('click', clearCustomError)
    }

    const feedbackCheck = catalogForm.elements.feedbackCheck;
    feedbackCheck.addEventListener('change', function (e) {
        if (this.checked == true) {
            clearCustomError(this);
        } else {
            throwCustomError(this)
        }
    })
}());

function submitValidation(e) {
    e = e || window.event;

    const catalogForm = document.forms.catalogForm;
    const devName = catalogForm.elements.devName;
    const siteName = catalogForm.elements.siteName;
    const siteURL = catalogForm.elements.siteURL;
    const launchDate = catalogForm.elements.launchDate;
    const visitsNumber = catalogForm.elements.visitsNumber;
    const contactEmail = catalogForm.elements.contactEmail;
    const catalogTopic = catalogForm.elements.catalogTopic;
    const hostingType = catalogForm.elements.hostingType;
    const feedbackCheck = catalogForm.elements.feedbackCheck;
    const siteDesc = catalogForm.elements.siteDesc;

    if (!siteDescValidator(siteDesc, true)) {
        e.preventDefault();
    }

    if (!feedbackCheckValidator(feedbackCheck, true)) {
        e.preventDefault();
    }

    if (!hostingTypeValidator(hostingType, true)) {
        e.preventDefault();
    }

    if (!catalogTopicValidator(catalogTopic, true)) {
        e.preventDefault();
    }

    if (!contactEmailValidator(contactEmail, true)) {
        e.preventDefault();
    }

    if (!visitsNumberValidator(visitsNumber, true)) {
        e.preventDefault();
    }

    if (!launchDateValidator(launchDate, true)) {
        e.preventDefault();
    }

    if (!siteURLValidator(siteURL, true)) {
        e.preventDefault();
    }

    if (!siteNameValidator(siteName, true)) {
        e.preventDefault();
    }

    if (!devNameValidator(devName, true)) {
        e.preventDefault();
    }

}

function devNameValidator(devName, submitValidation = false) {
    if (submitValidation) {

        const value = devName.value;

        value.trim();

        if (value.length > 30 || value == '') {
            return validationFailHandler(devName, true);
        }

        return validationSuccessHandler(devName);

    } else {

        const value = window.event.target.value;

        value.trim();

        if (value.length > 30 || value == '') {
            return validationFailHandler(window.event.target);
        }

        return validationSuccessHandler(window.event.target);
    }

}

function siteNameValidator(siteName, submitValidation = false) {
    if (submitValidation) {

        const value = siteName.value.trim().toLowerCase();

        if (value == "" || !value.includes('global')) {
            return validationFailHandler(siteName, true);
        }

        return validationSuccessHandler(siteName);

    } else {

        const value = window.event.target.value.trim().toLowerCase();

        if (value == "" || !value.includes('global')) {
            return validationFailHandler(window.event.target);
        }

        return validationSuccessHandler(window.event.target);
    }
}

function siteURLValidator(siteURL, submitValidation = false) {
    if (submitValidation) {
        const value = siteURL.value.trim();

        if (value == '' || !value.includes('https://') || !value.endsWith('.com')) {
            return validationFailHandler(siteURL, true);
        }

        return validationSuccessHandler(siteURL);
    } else {
        const value = window.event.target.value.trim();

        if (value == '' || !value.includes('https://') || !value.endsWith('.com')) {
            return validationFailHandler(window.event.target);
        }

        return validationSuccessHandler(window.event.target);
    }


}

function launchDateValidator(launchDate, submitValidation = false) {
    if (submitValidation) {
        const value = new Date(launchDate.value);

        const startDate = new Date(2016, 0, 1);
        const currentDate = new Date();

        if (value == 'Invalid Date' || value < startDate || value > currentDate) {
            return validationFailHandler(launchDate, true);
        }

        return validationSuccessHandler(launchDate);
    } else {
        const value = new Date(window.event.target.value);

        const startDate = new Date(2016, 0, 1);
        const currentDate = new Date();

        if (value == 'Invalid Date' || value < startDate || value > currentDate) {
            return validationFailHandler(window.event.target);
        }

        return validationSuccessHandler(window.event.target);
    }

}

function visitsNumberValidator(visitsNumber, submitValidation = false) {

    if (submitValidation) {
        const value = + visitsNumber.value;

        if (value == '' || value < 0 || value > 1000000) {
            return validationFailHandler(visitsNumber, true);
        }

        return validationSuccessHandler(visitsNumber);
    } else {
        const value = + window.event.target.value;

        if (value == '' || value < 0 || value > 1000000) {
            return validationFailHandler(window.event.target);
        }

        return validationSuccessHandler(window.event.target);
    }

}

function contactEmailValidator(contactEmail, submitValidation = false) {
    if (submitValidation) {
        const value = contactEmail.value;

        if (value == "" || !value.includes('@') || !value.endsWith('.com')) {
            return validationFailHandler(contactEmail);
        }

        return validationSuccessHandler(contactEmail);
    } else {
        const value = window.event.target.value;

        if (value == "" || !value.includes('@') || !value.endsWith('.com')) {
            return validationFailHandler(window.event.target);
        }

        return validationSuccessHandler(window.event.target);
    }

}

function catalogTopicValidator(catalogTopic, submitValidation = false) {
    if (submitValidation) {
        const value = catalogTopic.value;

        if (value == '') {
            return validationFailHandler(catalogTopic, true);
        }

        return validationSuccessHandler(catalogTopic);
    } else {
        const value = window.event.target.value;

        if (value == '') {
            return validationFailHandler(window.event.target);
        }

        return validationSuccessHandler(window.event.target);
    }

}

function hostingTypeValidator(hostingType, submitValidation = false) {
    const value = hostingType.value;

    if (value == '') {
        return validationFailHandler(hostingType, true);
    }

    return validationSuccessHandler(hostingType);
}

function feedbackCheckValidator(feedbackCheck, submitValidation = false) {
    const isChecked = feedbackCheck.checked;

    if (!isChecked) {
        return validationFailHandler(feedbackCheck, true);
    }

    return validationSuccessHandler(feedbackCheck);
}

function siteDescValidator(siteDesc, submitValidation = false) {
    if (submitValidation) {
        const value = siteDesc.value.trim();

        if (value.length < 100 || value.length > 1000) {
            return validationFailHandler(siteDesc, true);
        }

        return validationSuccessHandler(siteDesc);
    } else {
        const value = window.event.target.value.trim();

        if (value.length < 100 || value.length > 1000) {
            return validationFailHandler(window.event.target);
        }

        return validationSuccessHandler(window.event.target);
    }

}

function throwCustomError(object) {
    try {
        const element = object
        const parentLabel = element.closest('.outer-label');
        const currentError = parentLabel.querySelector('.error');
        currentError.hidden = false;
        return;
    } catch (error) {

    }
    try {
        const event = element;
        const parentLabel = event.target.closest('.outer-label');
        const currentError = parentLabel.querySelector('.error');
        currentError.hidden = false;
        return;
    } catch (error) {

    }

}

function clearCustomError(object) {
    try {
        const element = object;
        const parentLabel = element.closest('.outer-label');
        const currentError = parentLabel.querySelector('.error');
        currentError.hidden = true;

        return;
    } catch (error) {

    }

    try {
        const element = object;
        const parentLabel = element[0].closest('.outer-label');
        const currentError = parentLabel.querySelector('.error');
        currentError.hidden = true;
        return;
    } catch (error) {

    }

    try {
        const event = object;
        const parentLabel = event.target.closest('.outer-label');
        const currentError = parentLabel.querySelector('.error');
        currentError.hidden = true;
        return;
    } catch (error) {

    }

}

function validationFailHandler(element, SubmitValidation = false) {
    if (SubmitValidation) {

        try {
            element.focus()
            throwCustomError(element)
        } catch (error) {

        }

        try {
            element[0].focus();
            throwCustomError(element[0])
        } catch (error) {

        }

        try {
            element.scrollIntoView();
            throwCustomError(element);
        } catch (error) {

        }

        return false;
    } else {
        throwCustomError(element);
    }

}

function validationSuccessHandler(element) {
    clearCustomError(element);
    return true;
}