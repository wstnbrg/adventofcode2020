const fs = require('fs');
const { setUncaughtExceptionCaptureCallback } = require('process');

var dataArray = [];
var seatIds = [];

try {
    const data = fs.readFileSync('input.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
        dataArray.push(line);
    });
} catch (err) {
    console.error(err);
}

dataArray.forEach((line) => {
    var seatPos = line.split('');
    var seatRow;
    var seatCol;
    var range = {
        min: 0,
        max: 127
    }

    seatPos.forEach((rangeHalf, index) => {
        if (index < 7) {
            range = checkHalf(rangeHalf, range);
        }
        if (index == 6) {
            seatRow = range.min;
            range = {
                min: 0,
                max: 7
            }
        }
        if (index > 6) {
            range = checkHalf(rangeHalf, range);
        }
    });
    
    seatCol = range.min;

    var seatId = seatRow * 8 + seatCol;

    seatIds.push(seatId);
});

seatIds.forEach((seat) => {
    if (seatIds.includes(seat - 2) &&
        !seatIds.includes(seat - 1)
    ) {
        console.log('try: ', seat -1);
    }
});


function checkHalf(halfIndikator, range) {
    half = parseInt(((range.max +1) - range.min) / 2);
    if (halfIndikator == 'F' ||
        halfIndikator == 'L'
    ) {
        range.max = range.max - half;
    }
    if (halfIndikator == 'B' ||
        halfIndikator == 'R'
    ) {
        range.min = (range.max + 1) - half;
    }
    return range;
}
