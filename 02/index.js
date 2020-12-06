const fs = require('fs');
const { ppid } = require('process');

var dataArray = [];
var found = 0;

try {
    const data = fs.readFileSync('input.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
        lineData = line.split(':');
        policyData = lineData[0].trim().split(' ');
        policyRange = policyData[0].split('-');

        dataArray.push({
            policy: {
                min: policyRange[0],
                max: policyRange[1],
                letter: policyData[1]
            },
            password: lineData[1].trim()
        });
    });
} catch (err) {
    console.error(err);
}

dataArray.forEach((pw) => {
    let string = String(pw.password);
    let regex = new RegExp(pw.policy.letter, 'g');
 
    if ((string.match(regex) || []).length >= pw.policy.min) {
        if ((string.match(regex) || []).length <= pw.policy.max) {
            found++;
        }
    }
});

console.log('Answer: ', found);
