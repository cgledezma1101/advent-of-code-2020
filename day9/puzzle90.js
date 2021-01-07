const readFileSync = require('fs').readFileSync

const adapters = readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(joltage => parseInt(joltage))

adapters.sort((joltage0, joltage1) => joltage0 <= joltage1 ? -1 : 1)

const differences = [0, 0, 0, 0]

const sequence = [0, ...adapters, adapters[adapters.length - 1] + 3]
for (let i = 1; i < sequence.length; ++i) {
    const difference = sequence[i] - sequence[i - 1]

    differences[difference] = differences[difference] + 1
}

console.log(differences)
console.log(differences[1], differences[3])
console.log(differences[1] * differences[3])