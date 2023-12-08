const {readFile} = require('node:fs/promises');

(async () => {
    const data = await readFile('example.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);
})()

