const readFileSync = require('fs').readFileSync

const passes = readFileSync('input.txt').toString().split('\n')

const binarySearch = (size, pattern) => {
    let start = 0
    let end = size

    for (let index = 0; index < pattern.length; ++index) {
        const movement = pattern[index]
        const middle = Math.floor((start + end) / 2)
        if (movement === 'F' || movement === 'L') {
            end = middle
        } else {
            start = middle
        }
    }

    const last = pattern[pattern.length]
    if (last === 'F' || last === 'L') {
        return start
    }

    return end
}

const seatIds = passes.map(
    pass => {
        const rowMovement = pass.slice(0, 7)
        const seatMovement = pass.slice(7, 10)

        const rowIndex = binarySearch(127, rowMovement)
        const seatIndex = binarySearch(7, seatMovement)

        const seatId = rowIndex*8 + seatIndex

        return seatId
    },
    0
)

seatIds.sort((index0, index1) => parseInt(index0) <= parseInt(index1) ? -1 : 1)

console.log(seatIds)

seatIds.forEach((id, index) => {
    if (seatIds[index + 1] !== id + 1) {
        console.log(id + 1)

        return
    }
})