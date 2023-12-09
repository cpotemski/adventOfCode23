const {readFile} = require('node:fs/promises');
const {arraySum} = require("../utils");

const calculateHistory = (numbers) => {
    if(numbers.every(num => num === 0)) {
        return 0
    }

    const diffs = numbers.map((num, index) => {
        if(index === 0) {
            return undefined;
        }
        return num - numbers[index - 1];
    }).filter(a => a !== undefined)

    // console.log(diffs);

    return diffs[diffs.length -1] + calculateHistory(diffs);
}

(async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);
    const res = lines.map(line => {
        const numbers = line.split(' ').map(Number);
        return calculateHistory(numbers) + numbers[numbers.length -1];
    })
    console.log(arraySum(res));
})()
