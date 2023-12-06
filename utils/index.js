const arraySum = (arr) => arr.reduce((a,b) => a + b, 0);
const arrayProd = (arr) => arr.reduce((a,b) => a * b, 1);
const arrayUnique = (value, index, self) => self.indexOf(value) === index;

module.exports = {
    arraySum,
    arrayProd,
    arrayUnique
}
