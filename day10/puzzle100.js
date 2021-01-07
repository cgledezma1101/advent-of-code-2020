const readFileSync = require('fs').readFileSync

const initialSeating = readFileSync('input.txt').toString().split('\n')

const transformSeating = (currentSeating) => {
    let stable = true
    const newSeating = currentSeating.map((row, rowIndex) => {
        let newRow = ''
        for (let columnIndex = 0; columnIndex < row.length; ++columnIndex) {
            if (row[columnIndex] === '.') {
                newRow = newRow + '.'
                continue;
            }

            const occupiedAdjacent = [-1, 0, 1].reduce(
                (totalOccupied, checkRowDiff) => {
                    const checkedRow = rowIndex + checkRowDiff
                    if ((checkedRow < 0) || (checkedRow >= currentSeating.length)) {
                        return totalOccupied
                    }

                    const columnOccupied = [-1, 0, 1].reduce(
                        (adjacentOccupied, checkColumnDiff) => {
                            const checkedColumn = checkColumnDiff + columnIndex
                            if (
                                ((checkRowDiff === 0) && (checkColumnDiff == 0))
                                || (checkedColumn < 0)
                                || (checkedColumn >= row.length)
                                || (currentSeating[checkedRow][checkedColumn] !== '#')
                            ) {
                                return adjacentOccupied
                            }

                            return adjacentOccupied + 1
                        },
                        0
                    )

                    return totalOccupied + columnOccupied
                },
                0
            )

            if ((row[columnIndex] === 'L') && (occupiedAdjacent === 0)) {
                newRow = newRow + '#'
                stable = false
            } else if (row[columnIndex] === '#' && (occupiedAdjacent >= 4)) {
                newRow = newRow + 'L'
                stable = false
            } else {
                newRow = newRow + row[columnIndex]
            }
        }

        return newRow
    })

    return [newSeating, stable]
}

const countOccupied = seating => seating.reduce(
    (totalOccupied, row) => totalOccupied + row.replace(/[^#]/g, '').length,
    0
)

let currentSeating = initialSeating
let stabilized = false
while (!stabilized) {
    const [newSeating, isStable] = transformSeating(currentSeating)
    currentSeating = newSeating
    stabilized = isStable
}

console.log(countOccupied(currentSeating))