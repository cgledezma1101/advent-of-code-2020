const readFileSync = require('fs').readFileSync

const rawInput = readFileSync('./input.txt').toString()

const passwords = rawInput.split('\n')

let totalValid = 0
passwords.forEach(passwordLine => {
    const match = passwordLine.match(/^(\d+)-(\d+) (\w): (\w+)$/)
    const position0 = match[1] - 1
    const position1 = match[2] - 1
    const desiredLetter = match[3]
    const password = match[4]

    if (
        ((password[position0] === desiredLetter) && (password[position1] !== desiredLetter)) ||
        ((password[position0] !== desiredLetter) && (password[position1] === desiredLetter))
    ) {
        ++totalValid
    }
})

console.log(totalValid)