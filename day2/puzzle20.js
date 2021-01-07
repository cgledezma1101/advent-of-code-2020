const readFileSync = require('fs').readFileSync

const input = readFileSync('./input.txt').toString()
    .split('\n')

const extended = input
    .map(inputLine => inputLine.repeat(input.length * 3))

let trees = 0
let currentX = 3

extended.slice(1, extended.length).forEach(currentLine => {
    if (currentLine[currentX] === '#') {
        ++trees
    }

    currentX += 3
})

console.log(trees)