const readFileSync = require('fs').readFileSync

const rawInput = readFileSync('./input.txt').toString()

const passwords = rawInput.split('\n')

let totalValid = 0
passwords.forEach(passwordLine => {
    const match = passwordLine.match(/^(\d+)-(\d+) (\w): (\w+)$/)
    const minRepeat = match[1]
    const maxRepeat = match[2]
    const repeatLetter = match[3]
    const password = match[4]

    const letterCount = password.replace(new RegExp(`[^${repeatLetter}]`, 'g'), '').length

    if (letterCount >= minRepeat && letterCount <= maxRepeat) {
        ++totalValid
    }
})

console.log(totalValid)