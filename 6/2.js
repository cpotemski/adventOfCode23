const fs = require("fs");
const {arraySum, arrayProd} = require("../utils");

const example = [
    [71530, 940200]
]

const input = [
    [63789468, 411127420471035],
]

const diffs = input.map(([time, record]) => {
    const min = Array.from(Array(time + 1).keys()).find(sec => {
        return (time - sec) * sec > record;
    })

    max = time - (min - 1);

    return max - min
})

console.log(arrayProd(diffs))

