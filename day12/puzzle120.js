const readFileSync = require('fs').readFileSync

const input = readFileSync('input.txt').toString().split('\n')

const arrivalTime = parseInt(input[0])
const busIds = input[1].split(',').filter(id => id !== 'x').map(id => parseInt(id))

const minimumWait = busIds.reduce(
    (currentResult, busId) => {
        const [_, currentMinimum] = currentResult
        console.log(arrivalTime, busId)

        const waitTime = (Math.ceil(arrivalTime / busId) * busId) - arrivalTime

        return waitTime < currentMinimum ? [busId, waitTime] : currentResult
    },
    [0, Number.MAX_VALUE]
)

console.log(minimumWait)
console.log(minimumWait[0] * minimumWait[1])