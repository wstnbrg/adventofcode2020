const fs = require('fs');

var treesPerRun = [];
var runsRight = [
    1,
    3,
    5,
    7,
    1
];
var runsDown = [
    1,
    1,
    1,
    1,
    2
];

runsRight.forEach((spacing, index) => {
    var down = index;
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
            tmpLeft += spacing;
    
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
        if (index % runsDown[down] === 0) {
            var nextPos = {
                left: currentPos.left + spacing,
                top: currentPos.top + runsDown[down]
            }
        
            if (row[currentPos.left] == '#')
            {
                treesEncountered++;
            }
        
            currentPos.left = nextPos.left;
            currentPos.top = nextPos.top;
        }
    });
    treesPerRun.push(treesEncountered);
});

var answer = 1;

console.log(treesPerRun);

treesPerRun.forEach((trees) => {
    answer *= trees;
});

console.log('encountered trees: ', answer);
