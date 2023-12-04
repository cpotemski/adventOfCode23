const {arraySum} = require("../utils");
const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const gearMap = {};

    const lines = data.split("\n");

    const checkSurroundingForSymbols = (lineNumber, startIndex, endIndex) => {
        // line before
        if (lineNumber > 0) {
            const gearIndex = checkStringForSymbol(lines[lineNumber - 1], startIndex, endIndex);
            if (gearIndex) {
                // console.log('before', gearIndex);
                return `${lineNumber - 1} - ${gearIndex}`;
            }
        }

        // left and right
        const gearIndex = checkStringForSymbol(lines[lineNumber], startIndex, endIndex);
        if (gearIndex) {
            // console.log('left and right', gearIndex);
            return `${lineNumber} - ${gearIndex}`;
        }

        //line after
        if (lineNumber < lines.length - 1) {
            const gearIndex = checkStringForSymbol(lines[lineNumber + 1], startIndex, endIndex);
            if (gearIndex) {
                // console.log('after', gearIndex);
                return `${lineNumber + 1} - ${gearIndex}`;
            }
        }


        return null;
    }

    const checkStringForSymbol = (line, startIndex, endIndex) => {
        const from = Math.max(0, startIndex - 1);
        const to = Math.min(line.length, endIndex + 2);
        // console.log(line.substring(from, to), from, to, line.substring(from, to).match(SYMBOL_REGEX))
        const res = [...line.substring(from, to).matchAll(/[*]/g)];
        if(res.length < 1) {
            return null;
        }
        if(res.length > 1) {
            console.error('found multiple gears at one number');
        }

        return res[0]['index'] + from;
    }


    let sum = 0;

    lines.forEach((line, lineNumber) => {
        const iterator = line.matchAll(/\d+/g);
        const numbers = [...iterator]
        numbers.forEach(numberMatch => {
            const number = numberMatch[0];
            const startIndex = numberMatch['index'];
            const gearIdentifier = checkSurroundingForSymbols(lineNumber, startIndex, startIndex + number.length - 1)
            // console.log(`found number ${number} in line ${lineNumber} at index ${startIndex}`);
            if (gearIdentifier) {
                // console.log(`number ${number} is valid`);
                if(!gearMap[gearIdentifier]) {
                    gearMap[gearIdentifier] = [Number(number)]
                } else {
                    gearMap[gearIdentifier].push(Number(number))
                }
            }
        })
    })

    Object.values(gearMap).forEach(gear => {
        if(gear.length === 2) {
            sum += gear[0] * gear[1];
        }
    })

    console.log(sum)
});
