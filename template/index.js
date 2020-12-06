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

dataArray.forEach((number) => {
    if(found) {
        return;
    }
});

