const readFileSync = require('fs').readFileSync

const adapters = readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(joltage => parseInt(joltage))

adapters.sort((joltage0, joltage1) => joltage0 <= joltage1 ? -1 : 1)

const sequence = [0, ...adapters, adapters[adapters.length -1 ] + 3]

const evaluatedSequences = []

const countCombinations = (sequence, overallIndex) => {
    if (sequence.length === 1) {
        return 1
    }

    const anchor = sequence[0]
    let total = 0
    let index = 1
    while (sequence[index] <= anchor + 3) {
        const targetIndex = overallIndex + index
        const foundCombinations = evaluatedSequences[targetIndex] || countCombinations(sequence.slice(index), targetIndex)

        total += foundCombinations

        ++index
    }

    evaluatedSequences[overallIndex] = total

    return total
}

console.log(countCombinations(sequence, 0))