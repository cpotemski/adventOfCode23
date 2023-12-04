const { arraySum } = require("../utils");
const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const MAXIMUM = {
    red: 12,
    green: 13,
    blue: 14
  }

  const everyDrawPossible = (draws) => draws.every(draw => {
    let possible = true;
    draw.split(',').map(cubes => {
          const [amount, color] = cubes.trim().split(' ');
          if(Number(amount) > MAXIMUM[color]) {
            possible = false;
          }
    })

    return possible
  })

  let sum = 0;

  const lines = data.split("\n").filter(a => a !== '');

  lines.map(line => {
    const [gameStr, rest] = line.split(':');
    const gameId = Number(gameStr.split(' ')[1]);
    const draws = rest.split(';');
    if(everyDrawPossible(draws)) {
      sum += gameId;
    }
  })

  console.log(sum);
});
