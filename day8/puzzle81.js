const readFileSync = require('fs').readFileSync

const sequence = readFileSync('input.txt').toString().split('\n').map(entry => parseInt(entry))

const hasPairAdding = (target, sequence) => {
    if (sequence.length === 1) {
        return false
    }

    const anchor = sequence[0]
    const test = sequence.slice(1)
    if (anchor === target) {
        return hasPairAdding(target, test)
    }

    const hasAdding = test.find(candidate => (candidate !== target) && ((candidate + anchor) === target))
    if (hasAdding !== undefined) {
        return true
    }

    return hasPairAdding(target, test)
}

const findFlaw = (window, sequence) => {
    for (let i = window; i < sequence.length; ++i) {
        if (!hasPairAdding(sequence[i], sequence.slice(i - window, i))) {
            return sequence[i]
        }
    }
}

const flaw = findFlaw(25, sequence)

for (let windowSize = 2; windowSize < sequence.length; ++windowSize) {
    sequence.find((_, windowStart) => {
        const subWindow = sequence.slice(windowStart, windowStart + windowSize)
        const sum = subWindow.reduce((result, element) => result + element, 0)

        if (sum === flaw) {
            const max = subWindow.reduce((max, element) => Math.max(max, element), Number.MIN_SAFE_INTEGER)
            const min = subWindow.reduce((min, element) => Math.min(min, element), Number.MAX_SAFE_INTEGER)

            console.log(max + min)

            return true
        }

        return false
    })
}