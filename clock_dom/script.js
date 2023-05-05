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


const createButton = document.querySelector('.input-button');
createButton.addEventListener('click', createClockHandler);

function createClockHandler(e) {
    const inputNumber = document.querySelector('.input-number').value;

    if (inputNumber >= 200 && inputNumber <= 1000) {
        createClockFace(inputNumber);
    }

}

function createClockFace(currentSize) {

    const clockFace = document.querySelector('.clock-face');
    const hoursBlock = document.querySelector('.hours-block');

    clockFace.style.width = currentSize + 'px';
    clockFace.style.height = currentSize + 'px';

    if (hoursBlock.children.length > 0) {
        hoursBlock.innerHTML = '';
    }

    createHourPoints(clockFace, hoursBlock, currentSize);
    createTimeField(clockFace, currentSize);
    createHourArrow(clockFace, currentSize);
    createMinuteArrow(clockFace, currentSize);
    createSecondArrow(clockFace, currentSize);
}

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

function createTimeField(clockFace, currentSize) {
    const timeField = clockFace.querySelector('.time-field');
    timeField.hidden = false;
    timeField.style.top = currentSize / 2 + 'px';
    timeField.style.left = clockFace.offsetLeft + clockFace.offsetWidth / 2 - timeField.offsetWidth / 2 + 'px';

    const hour = timeField.querySelector('#hour');
    const minute = timeField.querySelector('#minute');
    const second = timeField.querySelector('#second');
    updateTime(hour, minute, second);
    setInterval(() => { updateTime(hour, minute, second) }, CLOCK_REFRESH_INTERVAL);
}

function updateTime(hour, minute, second) {
    const currentTime = new Date();
    const hourValue = validateTime(currentTime.getHours());
    const minuteValue = validateTime(currentTime.getMinutes());
    const secondValue = validateTime(currentTime.getSeconds());
    hour.textContent = hourValue;
    minute.textContent = minuteValue;
    second.textContent = secondValue;
    console.log(hourValue + ":" + minuteValue + ":" + secondValue);
}


function validateTime(timer) {
    return timer < 10 ? `0${timer}` : timer;
}

function createHourArrow(clockFace, currentSize) {
    const arrow = clockFace.querySelector('.hour-arrow');
    arrow.hidden = false;

    arrow.style.height = currentSize / HOUR_ARROW_SCALE + 'px';

    arrow.style.left = clockFace.offsetLeft + clockFace.offsetWidth / 2 + 'px';
    arrow.style.top = clockFace.offsetTop + clockFace.offsetHeight / 2 - arrow.offsetHeight + 'px';

    const shift = DEG_IN_CIRCLE / MINUTES_IN_DAY;
    const hours = new Date().getHours() > CLOCK_SYSTEM ? new Date().getHours() - CLOCK_SYSTEM : new Date().getHours();
    const minutes = hours * MINUTES_IN_HOUR + new Date().getMinutes();

    let currentPos = minutes * shift;

    arrow.style.transform = `rotate(${currentPos}deg)`;

    setInterval(() => {
        if (currentPos == DEG_IN_CIRCLE) {
            currentPos = 0;
        }
        currentPos += shift;
        arrow.style.transform = `rotate(${currentPos}deg)`;
    }, HOUR_ARROW_INTERVAL)
}

function createMinuteArrow(clockFace, currentSize) {
    const arrow = clockFace.querySelector('.minute-arrow');
    arrow.hidden = false;

    arrow.style.height = currentSize / MINUTE_ARROW_SCALE + "px";

    arrow.style.left = clockFace.offsetLeft + clockFace.offsetWidth / 2 + 'px';
    arrow.style.top = clockFace.offsetTop + clockFace.offsetHeight / 2 - arrow.offsetHeight + 'px';

    const shift = DEG_IN_CIRCLE / MINUTES_IN_HOUR;
    let currentPos = new Date().getMinutes() * shift;

    arrow.style.transform = `rotate(${currentPos}deg)`;

    setInterval(() => {
        if (currentPos == DEG_IN_CIRCLE) {
            currentPos = 0;
        }
        currentPos += shift;
        arrow.style.transform = `rotate(${currentPos}deg)`;
    }, MINUTE_ARROW_INTERVAL)

}

function createSecondArrow(clockFace, currentSize) {
    const arrow = clockFace.querySelector('.second-arrow');
    arrow.hidden = false;

    arrow.style.height = currentSize / SECOND_ARROW_SCALE + 'px';

    arrow.style.left = clockFace.offsetLeft + clockFace.offsetWidth / 2 + 'px';
    arrow.style.top = clockFace.offsetTop + clockFace.offsetHeight / 2 - arrow.offsetHeight + 'px';

    const shift = DEG_IN_CIRCLE / SECONDS_IN_MINUTE;
    let currentPos = new Date().getSeconds() * shift;

    arrow.style.transform = `rotate(${currentPos}deg)`;

    setInterval(() => {
        if (currentPos == DEG_IN_CIRCLE) {
            currentPos = 0;
        }
        currentPos += shift;
        arrow.style.transform = `rotate(${currentPos}deg)`;
    }, SECOND_ARROW_INTERVAL);
}
