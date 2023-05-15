const DEG_IN_CIRCLE = 360;

const HOURS_POS_ANGLE = 30;
const HOURS_POS_RADIUS_SCALE = 2.3;

const HOUR_ARROW_SCALE = 4;
const HOUR_ARROW_INTERVAL = 1000 * 60;
const MINUTE_ARROW_SCALE = 3;
const MINUTE_ARROW_INTERVAL = 1000 * 60;
const SECOND_ARROW_SCALE = 2.3;
const SECOND_ARROW_INTERVAL = 1000;

const CLOCK_SYSTEM = 12;
const CLOCK_REFRESH_INTERVAL = 1000;
const MINUTES_IN_DAY = 720;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
const SECONDS_IN_DAY = MINUTES_IN_DAY * SECONDS_IN_MINUTE;


const createButton = document.querySelector('.input-button');
createButton.addEventListener('click', createClockHandler);

// вызов создания часов
function createClockHandler(e) {
    const inputNumber = document.querySelector('.input-number').value;

    if (inputNumber >= 200 && inputNumber <= 1000) {
        createClockFace(inputNumber);
    }

}

// создание циферблата
function createClockFace(currentSize) {

    const clockFace = document.querySelector('.clock-face');
    const hoursBlock = document.querySelector('.hours-block');

    clockFace.style.width = currentSize + 'px';
    clockFace.style.height = currentSize + 'px';

    if (hoursBlock.children.length > 0) {
        hoursBlock.innerHTML = '';
    }

    clockFace.hidden = false;

    createHourPoints(clockFace, hoursBlock, currentSize);
    createTimeField(clockFace, currentSize);
    createHourArrow(clockFace, currentSize);
    createMinuteArrow(clockFace, currentSize);
    createSecondArrow(clockFace, currentSize);

    globalTimeHandler();
    const timerId = setInterval(globalTimeHandler,1000);
}

// определение общего таймера
function globalTimeHandler() {
    const currentTime = new Date();
    const hourValue = currentTime.getHours();
    const minuteValue = currentTime.getMinutes();
    const secondValue = currentTime.getSeconds();

    updateTime(hourValue, minuteValue, secondValue);

    posHourArrow(hourValue,minuteValue,secondValue);
    posMinuteArrow(minuteValue,secondValue);
    posSecondArrow(secondValue);
}

// создание цифр на часах
function createHourPoints(clockFace, hoursBlock, currentSize) {
    let angle = HOURS_POS_ANGLE;

    for (let i = 1; i <= CLOCK_SYSTEM; i++) {
        const hourPoint = document.createElement('div');
        hourPoint.textContent = i;
        hourPoint.className = 'clock-hour-point'
        hourPoint.style.width = currentSize / 10 + 'px';
        hourPoint.style.height = currentSize / 10 + 'px';

        const radius = currentSize / HOURS_POS_RADIUS_SCALE;

        hoursBlock.append(hourPoint);

        const clockFaceCenterX = clockFace.offsetLeft + clockFace.offsetWidth / 2;
        const clockFaceCenterY = clockFace.offsetTop + clockFace.offsetHeight / 2;

        const hourPointCenterX = clockFaceCenterX + radius * Math.sin(angle / 180 * Math.PI)
        const hourPointCenterY = clockFaceCenterY - radius * Math.cos(angle / 180 * Math.PI)

        hourPoint.style.left = Math.round(hourPointCenterX - hourPoint.offsetWidth / 2) + 'px';
        hourPoint.style.top = Math.round(hourPointCenterY - hourPoint.offsetHeight / 2) + 'px';

        angle += HOURS_POS_ANGLE;
    }
}

// создание поля цифрового времени
function createTimeField(clockFace, currentSize) {
    const timeField = clockFace.querySelector('.time-field');
    timeField.hidden = false;
    timeField.style.top = currentSize / 2 + 'px';
    timeField.style.left = clockFace.offsetLeft + clockFace.offsetWidth / 2 - timeField.offsetWidth / 2 + 'px';
}

// обновление цифрового времени
function updateTime(hourValue, minuteValue, secondValue) {
    const hourField = document.querySelector('#hour');
    const minuteField = document.querySelector('#minute');
    const secondField = document.querySelector('#second');
    
    const hourValidated = validateTime(hourValue);
    const minuteValidated = validateTime(minuteValue);
    const secondValidated = validateTime(secondValue);

    hourField.textContent = hourValidated;
    minuteField.textContent = minuteValidated;
    secondField.textContent = secondValidated;

    console.log(hourValidated + ":" + minuteValidated + ":" + secondValidated);
}

// добавление "0" к цифре времени
function validateTime(timer) {
    return timer < 10 ? `0${timer}` : timer;
}

// создание часовой стрелки
function createHourArrow(clockFace, currentSize) {
    const arrow = clockFace.querySelector('.hour-arrow');
    arrow.hidden = false;

    arrow.style.height = currentSize / HOUR_ARROW_SCALE + 'px';

    arrow.style.left = clockFace.offsetLeft + clockFace.offsetWidth / 2 + 'px';
    arrow.style.top = clockFace.offsetTop + clockFace.offsetHeight / 2 - arrow.offsetHeight + 'px';

    // const shift = DEG_IN_CIRCLE / MINUTES_IN_DAY;
    // const hours = new Date().getHours() > CLOCK_SYSTEM ? new Date().getHours() - CLOCK_SYSTEM : new Date().getHours();
    // const minutes = hours * MINUTES_IN_HOUR + new Date().getMinutes();

    // let currentPos = minutes * shift;

    // arrow.style.transform = `rotate(${currentPos}deg)`;

    // setInterval(() => {
    //     if (currentPos == DEG_IN_CIRCLE) {
    //         currentPos = 0;
    //     }
    //     currentPos += shift;
    //     arrow.style.transform = `rotate(${currentPos}deg)`;
    // }, HOUR_ARROW_INTERVAL)
}

function posHourArrow(hourValue,minuteValue,secondValue){
    const arrow = document.querySelector('.hour-arrow');

    const shift = DEG_IN_CIRCLE / SECONDS_IN_DAY;

    const hours = hourValue > CLOCK_SYSTEM ? hourValue - CLOCK_SYSTEM : hourValue;
    const minutes = hours * MINUTES_IN_HOUR + minuteValue;
    const seconds = minutes * SECONDS_IN_MINUTE + secondValue;

    const currentPos = seconds * shift;
    if (currentPos == DEG_IN_CIRCLE) {
        currentPos = 0;
    }
    arrow.style.transform = `rotate(${currentPos}deg)`;
}

function createMinuteArrow(clockFace, currentSize) {
    const arrow = clockFace.querySelector('.minute-arrow');
    arrow.hidden = false;

    arrow.style.height = currentSize / MINUTE_ARROW_SCALE + "px";

    arrow.style.left = clockFace.offsetLeft + clockFace.offsetWidth / 2 + 'px';
    arrow.style.top = clockFace.offsetTop + clockFace.offsetHeight / 2 - arrow.offsetHeight + 'px';

    // const shift = DEG_IN_CIRCLE / MINUTES_IN_HOUR;
    // let currentPos = new Date().getMinutes() * shift;

    // arrow.style.transform = `rotate(${currentPos}deg)`;

    // setInterval(() => {
    //     if (currentPos == DEG_IN_CIRCLE) {
    //         currentPos = 0;
    //     }
    //     currentPos += shift;
    //     arrow.style.transform = `rotate(${currentPos}deg)`;
    // }, MINUTE_ARROW_INTERVAL)

}

function posMinuteArrow(minuteValue,secondValue) {
    const arrow = document.querySelector('.minute-arrow');

    const shift = DEG_IN_CIRCLE / SECONDS_IN_HOUR;

    const seconds = minuteValue * SECONDS_IN_MINUTE + secondValue;
    
    const currentPos = seconds * shift;
    if (currentPos == DEG_IN_CIRCLE) {
        currentPos = 0;
    }
    arrow.style.transform = `rotate(${currentPos}deg)`;
}

function createSecondArrow(clockFace, currentSize) {
    const arrow = clockFace.querySelector('.second-arrow');
    arrow.hidden = false;

    arrow.style.height = currentSize / SECOND_ARROW_SCALE + 'px';

    arrow.style.left = clockFace.offsetLeft + clockFace.offsetWidth / 2 + 'px';
    arrow.style.top = clockFace.offsetTop + clockFace.offsetHeight / 2 - arrow.offsetHeight + 'px';

    // const shift = DEG_IN_CIRCLE / SECONDS_IN_MINUTE;
    // let currentPos = new Date().getSeconds() * shift;

    // arrow.style.transform = `rotate(${currentPos}deg)`;

    // setInterval(() => {
    //     if (currentPos == DEG_IN_CIRCLE) {
    //         currentPos = 0;
    //     }
    //     currentPos += shift;
    //     arrow.style.transform = `rotate(${currentPos}deg)`;
    // }, SECOND_ARROW_INTERVAL);
}

function posSecondArrow(secondValue) {
    const arrow = document.querySelector('.second-arrow');

    const shift = DEG_IN_CIRCLE / SECONDS_IN_MINUTE;

    const currentPos = secondValue * shift;
    if (currentPos == DEG_IN_CIRCLE) {
        currentPos = 0;
    }
    arrow.style.transform = `rotate(${currentPos}deg)`;
}
