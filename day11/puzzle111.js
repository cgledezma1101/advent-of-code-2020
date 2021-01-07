const readFileSync = require('fs').readFileSync

const directions = readFileSync('input.txt').toString().split('\n')

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
    ([shipX, shipY, waypointX, waypointY], direction) => {
        const directionMatch = direction.match(/^(\w)(\d+)$/)
        const movement = directionMatch[1]
        const change = parseInt(directionMatch[2])

        if (movement === 'L') {
            let newWaypoint = [waypointX, waypointY]
            for (let i = 0; i < change / 90; i++) {
                newWaypoint = [-newWaypoint[1], newWaypoint[0]]
            }
            return [shipX, shipY, newWaypoint[0], newWaypoint[1]]
        }

        if (movement === 'R') {
            let newWaypoint = [waypointX, waypointY]
            for (let i = 0; i <  change / 90; ++ i) {
                newWaypoint = [newWaypoint[1], -newWaypoint[0]]
            }
            return [shipX, shipY, newWaypoint[0], newWaypoint[1]]
        }

        if (movement === 'F') {
            return [shipX + change * waypointX, shipY + change * waypointY, waypointX, waypointY]
        }

        const pointIndex = transformCardinalPoint(movement)
        const [factorX, factorY] = cardinalPoints[pointIndex]

        return [shipX, shipY, waypointX + change * factorX, waypointY + change * factorY]
    },
    [0, 0, 10, 1]
)

console.log(Math.abs(finalDirection[0]) + Math.abs(finalDirection[1]))