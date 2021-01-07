const readFileSync = require('fs').readFileSync

const input = readFileSync('./input.txt').toString()
    .split('\n')

const testAdvances = [
    { rightIncrement: 1, downIncrement: 1 },
    { rightIncrement: 3, downIncrement: 1 },
    { rightIncrement: 5, downIncrement: 1 },
    { rightIncrement: 7, downIncrement: 1 },
    { rightIncrement: 1, downIncrement: 2 },
]

let result = 1
testAdvances.forEach(({ rightIncrement, downIncrement }) => {
    let trees = 0
    let currentX = 0
    let currentY = 0

    const fullMap = input.map(inputLine => inputLine.repeat(input.length * rightIncrement))

    while (currentY + downIncrement < fullMap.length) {
        currentX += rightIncrement
        currentY += downIncrement

        if (fullMap[currentY][currentX] === '#') {
            ++trees
        }
    }

    console.log(`Result for ${rightIncrement}/${downIncrement} is ${trees}`)

    result = result * trees
})

console.log(result)