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
        // const label = lines.shift();


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

            // console.log(`${label}(val: ${val}) => ${res}`);

            return res
        }
    })

    const pairs = seeds.reduce((result, value, index, array) => {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);

    // console.log(pairs);

    let minimum = 100000000000000000000;


    pairs
        //.slice(0, 1) // input - 529350000 100000
        .forEach(([seed, count]) => {
        // console.log(count);
        // console.log(seed, count, seed+count);
        for (let i = 0; i < count; i = i + 1) {
            // if (i % 1000000 === 0) {
            //     console.log(i / count);
            // }

            let res = seed + i;
            mapperFns.forEach(mapper => {
                res = mapper(res);
            })

            if (res < minimum) {
                console.log(seed + i, res);
            }

            minimum = Math.min(minimum, res);

        }
    })

    console.log(minimum);
});
