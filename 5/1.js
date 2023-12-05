const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const groups = data.split("\n\n");

    const seedString = groups.shift()
    const seeds = seedString.split(' ').map(Number);
    seeds.shift() // remove label

    const mapperFns = groups.map(group => {
        const lines = group.split('\n');
        const label = lines.shift();


        return (val) => {
            let res = val;
            lines.some(line => {
                const [destinationStart, sourceStart, length] = line.split(' ').map(Number);
                const diff = destinationStart - sourceStart;
                if (val >= sourceStart && val < sourceStart + length) {
                    res = val + diff;

                    return true;
                }
            })

            console.log(`${label}(val: ${val}) => ${res}`);

            return res
        }
    })

    const results = seeds.map(seed => {
        let res = seed;
        mapperFns.forEach(mapper => {
            res = mapper(res);
        })

        return res;
    })

    console.log(Math.min(...results));
});
