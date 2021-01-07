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

    const hasAdding = test
        .find(candidate => (candidate !== target) && ((candidate + anchor) === target))

    if (hasAdding !== undefined) {
        return true
    }

    return hasPairAdding(target, test)
}

const window = 25
for (let i = window; i < sequence.length; ++i) {
    if (!hasPairAdding(sequence[i], sequence.slice(i - window, i))) {
        console.log(sequence[i])
        break
    }
}