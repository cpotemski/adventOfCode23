const {mkdir, readFile, writeFile, cp} = require('node:fs/promises');

(async () => {
    const data = await readFile('.aoc', {encoding: 'utf8'});
    const session = data.trim();

    const year = process.argv[3] ?? new Date().getFullYear().toString();
    const day = process.argv[2] ?? new Date().getDate().toString();

    await mkdir(`${day}`);
    await cp('.template/', `./${day}/`, {recursive: true})

    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
            cookie: `session=${session}`
        }
    });

    const content = await response.text();
    await writeFile(`./${day}/input.txt`, content);
})()

