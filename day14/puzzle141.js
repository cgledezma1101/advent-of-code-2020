const readFileSync = require('fs').readFileSync

const startingTurns = readFileSync('input.txt').toString().split(',').map(number => parseInt(number))

const occurrences = startingTurns.reduce(
    (result, number, index) => {
        const currentOccurrences = result[number] || []
        const oldPosition = currentOccurrences[1]

        return { ...result, [number]: [oldPosition, index] }
    },
    {}
)


let currentPosition = startingTurns.length - 1
let evaluatedNumber = startingTurns[currentPosition]

while (currentPosition !== (30000000 - 1)) {
    if (!occurrences[evaluatedNumber]) {
        occurrences[evaluatedNumber] = [undefined, currentPosition]
        ++currentPosition
        evaluatedNumber = 0
        continue;
    }

    occurrences[evaluatedNumber] = [occurrences[evaluatedNumber][1], currentPosition]
    ++currentPosition

    evaluatedNumber = occurrences[evaluatedNumber][1] - occurrences[evaluatedNumber][0]
}

console.log(evaluatedNumber)