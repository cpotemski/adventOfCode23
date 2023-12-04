const {arraySum} = require("../utils");
const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split("\n");

    const checkSurroundingForSymbols = (lineNumber, startIndex, endIndex) => {
        // line before
        if (lineNumber > 0) {
            const match = checkStringForSymbol(lines[lineNumber - 1], startIndex, endIndex);
            if (match) {
                // console.log('before', match);
                return true;
            }
        }

        // left and right
        const match = checkStringForSymbol(lines[lineNumber], startIndex, endIndex);
        if (match) {
            // console.log('left and right', match);
            return true;
        }

        //line after
        if (lineNumber < lines.length - 1) {
            const match = checkStringForSymbol(lines[lineNumber + 1], startIndex, endIndex);
            if (match) {
                // console.log('after', match);
                return true;
            }
        }


        return false;
    }

    const checkStringForSymbol = (line, startIndex, endIndex) => {
        const from = Math.max(0, startIndex - 1);
        const to = Math.min(line.length, endIndex + 2);
        // console.log(line.substring(from, to), from, to, line.substring(from, to).match(SYMBOL_REGEX))
        return line.substring(from, to).match(/[^\d.]/g)
    }


    let sum = 0;

    lines.forEach((line, lineNumber) => {
        const iterator = line.matchAll(/\d+/g);
        const numbers = [...iterator]
        numbers.forEach(numberMatch => {
            const number = numberMatch[0];
            const startIndex = numberMatch['index'];
            // console.log(`found number ${number} in line ${lineNumber} at index ${startIndex}`);
            if (checkSurroundingForSymbols(lineNumber, startIndex, startIndex + number.length - 1)) {
                // console.log(`number ${number} is valid`);
                sum += Number(numberMatch);
            }
        })
    })

    console.log(sum)
});
