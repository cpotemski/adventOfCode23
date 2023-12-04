const { arraySum } = require("../utils");
const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n").filter(a => a !== '');

  const res = lines.map(line => {

    const matchesIterator = line.matchAll(/(?=((one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|\d))/gi, '')

    // console.log([...matchesIterator]);

    const matches = [...matchesIterator].map(a => a[1]);

    const mappedMatches = matches.map(match => {
      match = match.replaceAll('one', '1');
      match = match.replaceAll('two', '2');
      match = match.replaceAll('three', '3');
      match = match.replaceAll('four', '4');
      match = match.replaceAll('five', '5');
      match = match.replaceAll('six', '6');
      match = match.replaceAll('seven', '7');
      match = match.replaceAll('eight', '8');
      return match.replaceAll('nine', '9');
    })

    const string = `${mappedMatches[0]}${mappedMatches[mappedMatches.length - 1]}`;

    console.log(line, matches, mappedMatches, string)
    console.log('\n');
    // console.log(string);

    return parseInt(string, 0);
  }).reduce((prev, current) => prev + current, 0);

  console.log(res);
});
