function stringTrim(userString) {

    let startSpaces = 0;
    let endSpaces = 0;
    const stringLength = userString.length;

    for (let pos = 0; pos < stringLength; pos++) {
        if (userString.charAt(pos) == " ") {
            startSpaces++;
        } else {
            break;
        }
    }

    for (let pos = stringLength - 1; pos > 0; pos--) {
        if (userString.charAt(pos) == " ") {
            endSpaces++;
        } else {
            break;
        }
    }

    userString = userString.slice(startSpaces, stringLength - endSpaces);
    return "*" + userString + "*";
}

const userString = prompt('Your string:', '          <-Left space. Right space.->           ');
alert(stringTrim(userString));
