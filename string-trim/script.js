function stringTrim(userString) {

    let startSpaces = 0;
    let endSpaces = 0;
    const stringLength = userString.length;

    for (let pos = 0; pos < stringLength; pos++) {

        const endOfString = pos == stringLength - 1 && userString.charAt(pos) == " ";

        if (endOfString) {
            console.log('All string consists of spaces.');
            return userString;
        }

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

    if (!startSpaces && !endSpaces) {
        console.log('No spaces in string.');
        return userString;
    }

    userString = userString.slice(startSpaces, stringLength - endSpaces);
    return userString;
}

let userString = prompt('Your string:', '          <-Left space. Right space.->           ');
alert("*" + stringTrim(userString) + "*");

userString = prompt('Your string:', '         ');
alert("*" + stringTrim(userString) + "*");

userString = prompt('Your string:', 'No Left space. No Right space.');
alert("*" + stringTrim(userString) + "*");
