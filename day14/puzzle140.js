const readFileSync = require('fs').readFileSync

const turnsTaken = readFileSync('sample.txt').toString().split(',')

const occurrences = turnsTaken.reduce(
    (result, number, index) => {
        const currentOccurrences = result[number] || []
        const oldPosition = currentOccurrences[1]

        return { ...result, [number]: [oldPosition, index] }
    },
    {}
)

let currentPosition = turnsTaken.length - 1
let evaluatedNumber = turnsTaken[currentPosition]

while (currentPosition !== 2020) {
    console.log(evaluatedNumber)
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