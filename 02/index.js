const { error } = require('console');
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
                pos1: policyRange[0],
                pos2: policyRange[1],
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

    if (string.charAt(pw.policy.pos1 - 1) == pw.policy.letter ||
        string.charAt(pw.policy.pos2 - 1) == pw.policy.letter
    ) {
        if (string.charAt(pw.policy.pos1 - 1) != string.charAt(pw.policy.pos2 - 1)) {
            found++;
        }
    }
});

console.log('Answer: ', found);
