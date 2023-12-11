const {readFile, writeFile} = require('node:fs/promises');
const {arrayUnique} = require("../utils");


const DIRECTIONS = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
}

const DIRECTIONS_MOVEMENT = {
    UP: {
        x: 0,
        y: -1,
        inside: {
            x: 1,
            y: 0
        }
    },
    DOWN: {
        x: 0,
        y: 1,
        inside: {
            x: -1,
            y: 0
        }
    },
    LEFT: {
        x: -1,
        y: 0,
        inside: {
            x: 0,
            y: -1
        }
    },
    RIGHT: {
        x: 1,
        y: 0,
        inside: {
            x: 0,
            y: 1
        }
    },
}

const PIPES = {
    'S': {
        [DIRECTIONS.UP]: DIRECTIONS.UP,
        [DIRECTIONS.DOWN]: DIRECTIONS.DOWN,
        [DIRECTIONS.LEFT]: DIRECTIONS.LEFT,
        [DIRECTIONS.RIGHT]: DIRECTIONS.RIGHT,
    },
    '|': {
        [DIRECTIONS.UP]: DIRECTIONS.UP,
        [DIRECTIONS.DOWN]: DIRECTIONS.DOWN,
    },
    '-': {
        [DIRECTIONS.LEFT]: DIRECTIONS.LEFT,
        [DIRECTIONS.RIGHT]: DIRECTIONS.RIGHT,
    },
    'F': {
        [DIRECTIONS.UP]: DIRECTIONS.RIGHT,
        [DIRECTIONS.LEFT]: DIRECTIONS.DOWN,
    },
    'L': {
        [DIRECTIONS.DOWN]: DIRECTIONS.RIGHT,
        [DIRECTIONS.LEFT]: DIRECTIONS.UP,
    },
    'J': {
        [DIRECTIONS.RIGHT]: DIRECTIONS.UP,
        [DIRECTIONS.DOWN]: DIRECTIONS.LEFT,
    },
    '7': {
        [DIRECTIONS.UP]: DIRECTIONS.LEFT,
        [DIRECTIONS.RIGHT]: DIRECTIONS.DOWN,
    },
}

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);

    const start = lines.map((line, y) => {
        const index = line.indexOf('S');

        if (index === -1) {
            return null;
        }

        return {y, x: index}
    }).filter(a => !!a)[0];

    // console.log('start', start);

    let currentPipe = {
        pipeType: '',
        ...start
    };
    const pipeSegements = [`${start.x}-${start.y}`];
    const insideSegments = [];

    const traverse = () => {
        const newX = currentPipe.x + DIRECTIONS_MOVEMENT[currentPipe.direction].x;
        const newY = currentPipe.y + DIRECTIONS_MOVEMENT[currentPipe.direction].y;
        let insideX = newX + DIRECTIONS_MOVEMENT[currentPipe.direction].inside.x;
        let insideY = newY + DIRECTIONS_MOVEMENT[currentPipe.direction].inside.y;

        if (newX < 0 || newY < 0 || newX >= lines[0].length || newY >= lines.length) {
            return;
        }
        const pipeType = lines[newY][newX];
        const newDirection = PIPES[pipeType][DIRECTIONS[currentPipe.direction]]
        if (Object.keys(PIPES).includes(pipeType) && newDirection) {
            currentPipe = {
                pipeType,
                y: newY,
                x: newX,
                direction: newDirection
            }
            pipeSegements.push(`${newX}-${newY}`);

            insideSegments.push(`${insideX}-${insideY}`);
            insideX = newX + DIRECTIONS_MOVEMENT[newDirection].inside.x;
            insideY = newY + DIRECTIONS_MOVEMENT[newDirection].inside.y;
            insideSegments.push(`${insideX}-${insideY}`);
        }
    }

    //findStartPipes
    for (let direction of Object.keys(DIRECTIONS)) {
        if (currentPipe.pipeType) {
            continue;
        }
        currentPipe.direction = direction
        traverse()
    }

    // console.log('startPipe', currentPipe);

    let loopFinished = false;
    let count = 1;
    while (!loopFinished) {
        traverse();
        count++;
        // console.log(currentPipes);
        if (currentPipe.pipeType === 'S') {
            loopFinished = true
        }
    }

    // console.log(pipeSegements);
    const filteredInside = insideSegments.filter(arrayUnique).filter(segment => !pipeSegements.includes(segment));
    // console.log(filteredInside.length)


    const areaData = lines.map((line, y) => {
        let newLine = line.split('').map((char, x) => {
            if (pipeSegements.find(segment => segment === `${x}-${y}`)) {
                return '#';
            } else if (insideSegments.find(segment => segment === `${x}-${y}`)) {
                return 'X';
            } else {
                return ' ';
            }
        }).join('')

        const matches = [...newLine.matchAll(/X\s+X/g)];
        if (matches.length > 0) {
            matches.forEach(([match]) => {
                newLine = newLine.replace(match, match.replaceAll(' ', 'X'))
            })
        }
        return newLine;
    })
        .join('')
    //     .join('\n')
    //
    // await writeFile('area.txt', areaData);

    console.log([...areaData.matchAll(/X/g)].length)

}

main();
