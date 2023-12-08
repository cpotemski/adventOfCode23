const fs = require("fs");
const {arraySum} = require("../utils");

const values = ['J','2','3','4','5','6','7','8','9','T','Q','K','A'];

const tie = (a,b) => {
    let res = 0;

    a.split('').forEach((card, index) => {
        if(card !== b[index] && res === 0) {
            res = values.indexOf(card) > values.indexOf(b[index]) ? 1 : -1;
        }
    })
    return res;
}

const getValue = (hand) => {
    const sortedHand = hand.split('').sort().join('').replaceAll('J','');
    const amountOfJoker = 5 - sortedHand.length

    const fiveOfKind = sortedHand.match(/(.)\1{4}/g) !== null;
    const fourOfKind = sortedHand.match(/(.)\1{3}/g) !== null;
    const fullHouse = sortedHand.match(/(.)\1{2}(.)\2/g) !== null || sortedHand.match(/(.)\1(.)\2{2}/g) !== null;
    const threeOfKind = sortedHand.match(/(.)\1{2}/g) !== null;
    const twoPairs = sortedHand.match(/(.)\1.*(.)\2/g) !== null;
    const twoOfKind = sortedHand.match(/(.)\1/g) !== null;


    switch (true) {
        case fiveOfKind || fourOfKind && amountOfJoker === 1 || threeOfKind && amountOfJoker === 2 || twoOfKind && amountOfJoker === 3 || amountOfJoker > 3:
            // five of kind
            return 6;
        case fourOfKind || threeOfKind && amountOfJoker === 1 || twoOfKind && amountOfJoker === 2 || amountOfJoker === 3:
            // four of kind
            return 5;
        case fullHouse || twoPairs && amountOfJoker === 1:
            // full house
            return 4;
        case threeOfKind|| twoOfKind && amountOfJoker === 1 || amountOfJoker === 2:
            // three of kind
            return 3;
        case twoPairs:
            // two pairs
            return 2;
        case twoOfKind || amountOfJoker === 1:
            // two of kind
            return 1;
        default:
            return 0
    }
}

const compareHands = (a, b) => {
    const valueA = getValue(a);
    const valueB = getValue(b);

    if (valueA > valueB) {
        return 1;
    }
    if (valueB > valueA) {
        return -1;
    }

    return tie(a,b);
}

fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split("\n").filter(a => !!a);

    const sortedHands = lines.sort((a, b) => {
        const [handA] = a.split(' ');
        const [handB] = b.split(' ');

        return compareHands(handA, handB)
    });

    fs.writeFile("./sortedInput.txt", sortedHands.join('\n'), () => {})

    const res = sortedHands.map((line, index) => {
        const [_, bid] = line.split(' ');

        return Number(bid) * (index + 1)
    })

    console.log(arraySum(res));
});
