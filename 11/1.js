const {readFile} = require('node:fs/promises');
const {arraySum} = require("../utils");

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);

    let emptyX = [...Array(lines[0].length).keys()];
    let emptyY = [...Array(lines.length).keys()];

    let galaxies = []

    lines.forEach((line, y) => {
        line.split('').forEach((elem, x) => {
            if (elem === '#') {
                galaxies.push({
                    x,
                    y
                });
                emptyX = emptyX.filter(i => i !== x);
                emptyY = emptyY.filter(i => i !== y);
            }
        })
    })

    galaxies = galaxies.map(galaxy => ({
        x: galaxy.x + emptyX.filter(x => x < galaxy.x).length,
        y: galaxy.y + emptyY.filter(y => y < galaxy.y).length
    }))

    const distances = {};

    galaxies.forEach((a) => {
        galaxies.forEach(b => {
            const key = `${a.x}-${a.y}|${b.x}-${b.y}`;
            const keyInverted = `${b.x}-${b.y}|${a.x}-${a.y}`;
            if(!distances[keyInverted]) {
                distances[key] = Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
            }
        })
    })

    // console.log(distances);

    console.log(arraySum(Object.values(distances)));
}

main();
