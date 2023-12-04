const {arraySum, arrayUnique} = require("../utils");
const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    data = data.replaceAll('   ', ' ');
    data = data.replaceAll('  ', ' ');

    const lines = data.split("\n").filter(a => a !== '');

    let count = 0;
    const extraDraws = {}

    const addExtraDraws = (cardId, amountOfCards, duplicates) => {
        // console.log(`add ${duplicates} to the next ${amountOfCards} cards`);
        for (let i = 1; i <= amountOfCards; i++) {
            let id = cardId + i;
            if (extraDraws[id] === undefined) {
                extraDraws[id] = duplicates;
            } else {
                extraDraws[id] += duplicates;
            }
        }
    }

    lines
        // .slice(0, 10)
        .forEach(line => {
        const [roundString, rest] = line.split(':');
        const cardId = Number(roundString.split(' ')[1]);

        const [winningString, cardString] = rest.split('|');
        const matches = cardString
            .trim()
            .split(' ')
            .filter(num => winningString.trim().split(' ').includes(num)).length;

        // console.log(`${cardId} has ${matches} matches`);

        let numberOfCardsWithThisId = 1;

        if (extraDraws[cardId]) {
            numberOfCardsWithThisId += extraDraws[cardId];
        }

        // console.log(`${cardId} - ${numberOfCardsWithThisId} draws`);

        if(matches) {
            addExtraDraws(cardId, matches, numberOfCardsWithThisId);
            // console.log(extraDraws);
        }

        count += numberOfCardsWithThisId;
    })

    console.log(count);
});
