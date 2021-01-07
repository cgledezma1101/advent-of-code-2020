const readFileSync = require('fs').readFileSync

const directions = readFileSync('sample.txt').toString().split('\n')

const cardinalPoints = [
    [1, 0], // E
    [0, -1], // S
    [-1, 0], // W
    [0, 1], // N
]

const transformCardinalPoint = point =>
    point === 'E' ? 0
    : point === 'S' ? 1
    : point === 'W' ? 2
    : point === 'N' ? 3
    : undefined

const finalDirection = directions.reduce(
    ([currentX, currentY, currentDirection], direction) => {
        const directionMatch = direction.match(/^(\w)(\d+)$/)
        const movement = directionMatch[1]
        const change = parseInt(directionMatch[2])

        if (movement === 'L') {
            const rotations = change / 90
            return [currentX, currentY, (((currentDirection - rotations) % 4) + 4) % 4]
        }

        if (movement === 'R') {
            const rotations = change / 90
            return [currentX, currentY, (currentDirection + rotations) % 4]
        }

        const pointIndex = movement === 'F' ? currentDirection : transformCardinalPoint(movement)
        console.log(currentX, currentY, currentDirection, movement, change, pointIndex)
        const [factorX, factorY] = cardinalPoints[pointIndex]

        return [currentX + change * factorX, currentY + change * factorY, currentDirection]
    },
    [0, 0, 0]
)

console.log(finalDirection)

console.log(Math.abs(finalDirection[0]) + Math.abs(finalDirection[1]))