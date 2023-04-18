let userString;

while (!userString) {
    userString = prompt('Your string:', ' <-Left space. Right space.-> ');
    if (userString.indexOf(" ") == 0) {
        userString = userString.slice(userString.indexOf(" ") + 1)
        userString = '*' + userString;

    }

    if (userString.lastIndexOf(' ') == userString.length - 1) {
        userString = userString.slice(0, -1);
        userString += '*';
    }

    alert(userString);
}