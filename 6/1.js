const fs = require("fs");
const {arraySum, arrayProd} = require("../utils");

const example = [
    [7, 9],
    [15, 40],
    [30, 200]
]

const input = [
    [63, 411],
    [78, 1274],
    [94, 2047],
    [68, 1035],
]

const diffs = input.map(([time, record]) => {
    const min = Array.from(Array(time + 1).keys()).find(sec => {
        return (time - sec) * sec > record;
    })

    max = time - (min - 1);

    return max - min
})

console.log(arrayProd(diffs))

