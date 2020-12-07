const fs = require('fs');

var map = [];
var treesEncountered = 0;
var currentPos = {
    left: 0,
    top: 0
};

try {
    const data = fs.readFileSync('input.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);
    var tmpLeft = currentPos.left;

    lines.forEach((line) => {
        // # = tree
        // . = square
        column = line.split('');
        tmpLeft += 3;

        if (line.length / tmpLeft < 1)
        {
            for (let index = 0; index < (tmpLeft - line.length); index++) {
                column.push(column[index]);        
            }
        }

        map.push(column);
    });
} catch (err) {
    console.error(err);
}

map.forEach((row, index) => {
    var nextPos = {
        left: currentPos.left + 3,
        top: currentPos.top + 1
    }

    if (row[currentPos.left] == '#')
    {
        treesEncountered++;
    }

    currentPos.left = nextPos.left;
    currentPos.top = nextPos.top;
});

console.log('encountered trees: ', treesEncountered);
