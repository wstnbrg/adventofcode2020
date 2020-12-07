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
        var fieldValue = {
            key: pass[0],
            val: pass[1]
        }
        passportFields.push(fieldValue)
    });

    reqFields.forEach((r) => {
        var fieldExists = false;
        var fieldValid = false;

        passportFields.forEach((f) => {
            if (r == f.key)
            {
                fieldExists = true;
                switch (r) {
                    case 'byr':
                        if (f.val.length == 4 &&
                            f.val >= 1920 &&
                            f.val <= 2020
                        ) {
                            fieldValid = true;
                        }
                        break;
                    case 'iyr':
                        if (f.val.length == 4 &&
                            f.val >= 2010 &&
                            f.val <= 2020
                        ) {
                            fieldValid = true;
                        }
                        break;
                    case 'eyr':
                        if (f.val.length == 4 &&
                            f.val <= 2030 &&
                            f.val >= 2020
                        ) {
                            fieldValid = true;
                        }
                        break;
                    case 'hgt':
                        var unit = f.val.substr(f.val.length - 2, f.val.length);
                        var val = f.val.substr(0, f.val.length - 2);

                        if ((unit == 'cm' &&
                            val >= 150 &&
                            val <= 193) ||
                            (unit == 'in' &&
                            val >= 59 &&
                            val <= 76)
                        ) {
                            fieldValid = true;
                        }
                        break;
                    case 'hcl':
                        var match = f.val.match(/#[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g);
                        if (match) {
                            fieldValid = true;
                        }
                        break;
                    case 'ecl':
                        var validEcl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
                        if (validEcl.includes(f.val)) {
                            fieldValid = true;
                        }
                        break;
                    case 'pid':
                        if (f.val.length == 9) {
                            fieldValid = true;
                        }
                        break;
                }
            }
        })

        if (!fieldExists ||
            !fieldValid
        ) {
            notValidFields.push(r);
        }
    });

    if (notValidFields.length == 0 ||
        (notValidFields.length == 1 &&
        notValidFields[0] == 'cid')
    ) {
        valid++;
    }
});

console.log(valid);
