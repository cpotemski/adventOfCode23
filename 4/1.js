const {arraySum, arrayUnique} = require("../utils");
const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    data = data.replaceAll('  ', ' ');

    const lines = data.split("\n").filter(a => a !== '');
    const sum = lines.map(line => {
        const [roundString, rest] = line.split(':');

        const [winningString, cardString] = rest.split('|');
        const res = cardString.trim().split(' ').filter(num => winningString.trim().split(' ').includes(num));
        console.log(res)
        return res.reduce((prev) => {
            if(prev === 0) {
                return 1;
            }
            return prev * 2;
        }, 0);
    }).reduce((a, b) => a + b, 0)
    console.log(sum);
});
