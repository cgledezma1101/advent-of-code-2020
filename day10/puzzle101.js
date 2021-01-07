const readFileSync = require('fs').readFileSync

const initialSeating = readFileSync('input.txt').toString().split('\n')

const seesOccupied = (rowChange, columnChange, startingRow, startingColumn, seating) => {
    let currentRow = startingRow + rowChange
    let currentColumn = startingColumn + columnChange

    while (
        (currentRow >= 0)
        && (currentColumn >= 0)
        && (currentRow < seating.length)
        && (currentColumn < seating[currentRow].length)
    ) {
        if (seating[currentRow][currentColumn] === '#') {
            return true
        }

        if (seating[currentRow][currentColumn] === 'L') {
            return false
        }

        currentRow += rowChange
        currentColumn += columnChange
    }

    return false
}

const transformSeating = (currentSeating) => {
    let stable = true
    const newSeating = currentSeating.map((row, rowIndex) => {
        let newRow = ''
        for (let columnIndex = 0; columnIndex < row.length; ++columnIndex) {
            if (row[columnIndex] === '.') {
                newRow = newRow + '.'
                continue;
            }

            const seenOccupied = [-1, 0, 1].reduce(
                (totalOccupied, checkRowDiff) => {
                    const columnOccupied = [-1, 0, 1].reduce(
                        (adjacentOccupied, checkColumnDiff) => {
                            if (
                                ((checkRowDiff === 0) && (checkColumnDiff == 0))
                                || !seesOccupied(checkRowDiff, checkColumnDiff, rowIndex, columnIndex, currentSeating)
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

            if ((row[columnIndex] === 'L') && (seenOccupied === 0)) {
                newRow = newRow + '#'
                stable = false
            } else if (row[columnIndex] === '#' && (seenOccupied >= 5)) {
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