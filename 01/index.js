const fs = require('fs');

var dataArray = [];
var found = false;

try {
    const data = fs.readFileSync('input.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
        dataArray.push(parseInt(line));
    });
} catch (err) {
    console.error(err);
}

dataArray.forEach((number1) => {
    if(found) {
        return;
    }
    dataArray.forEach((number2) => {
        if (number1 + number2 == 2020 &&
            number1 !== number2
        ) {
            console.log('Answer: ' + number1 * number2);
            found = true;
            return;
        }
    });
});

