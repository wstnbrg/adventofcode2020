const fs = require('fs');

var dataArray = [];
var reqFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    'cid'
];
var dataIndex = 0;
var valid = 0;

try {
    const data = fs.readFileSync('input.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
        var parts = line.split(' ')

        if (dataArray[dataIndex] === undefined)
        {
            dataArray[dataIndex] = [];
        }

        if (parts.length == 1 &&
            parts[0] == ''
        ) {
            dataIndex++;
            return;
        }
        
        parts.forEach((part) => {
            var pData = part.split(':');
            dataArray[dataIndex].push(pData);            
        });
    });
} catch (err) {
    console.error(err);
}

dataArray.forEach((passport) => {
    var notValidFields = [];
    var passportFields = [];
    passport.forEach((pass) => {
        passportFields.push(pass[0])
    });

    reqFields.forEach((r) => {
        if(!passportFields.includes(r))
        {
            notValidFields.push(r);
        }
    });

    if (notValidFields.length == 0 ||
        (notValidFields.length == 1) &&
        notValidFields[0] == 'cid'
    ) {
        valid++;
    }
});

console.log(valid);
