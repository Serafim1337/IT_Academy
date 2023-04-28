

catalogForm.addEventListener('submit', submitValidation);

function submitValidation(e) {
    e = e || window.event;

    const catalogForm = document.forms.catalogForm;
    const devName = catalogForm.elements.devName;

    if (!devNameValidator(devName)) {
        e.preventDefault();
    }

}

function devNameValidator(devName) {
    const value = devName.value.trim();

    if (value.length > 30 || value == '') {

        throwCustomError(devName);
        return false;
    }
    clearCustomError(devName);
    return true;
}

function throwCustomError(element) {
    const parentLabel = element.closest('.outer-label');
    const currentError = parentLabel.querySelector('.error');
    currentError.hidden = false;
}

function clearCustomError(element) {
    const parentLabel = element.closest('.outer-label');
    const currentError = parentLabel.querySelector('.error');
    currentError.hidden = true;
}