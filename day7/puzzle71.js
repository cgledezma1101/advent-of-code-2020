const readFileSync = require('fs').readFileSync

const instructions = readFileSync('input.txt').toString().split('\n')

const calculateAccumulator = instructions => {
    let accumulator = 0
    const visited = {}
    let instructionPointer = 0

    while(instructionPointer < instructions.length) {
        if (visited[instructionPointer]) {
            return undefined
        }

        visited[instructionPointer] = true

        const currentInstruction = instructions[instructionPointer]
        const instructionMatch = currentInstruction.match(/^(\w{3}) ([+-]\d+)/)

        if (instructionMatch[1] === 'nop') {
            ++instructionPointer
        } else if (instructionMatch[1] === 'acc') {
            accumulator = accumulator + parseInt(instructionMatch[2])
            ++instructionPointer
        } else {
            instructionPointer = instructionPointer + parseInt(instructionMatch[2])
        }
    }

    return accumulator
}

for (let index = 0; index < instructions.length; ++index) {
    const instruction = instructions[index]
    if (instruction.startsWith('acc')) {
        continue
    }

    const replacement = instruction.startsWith('nop') ? 'jmp' : 'nop'
    const testSet = Array.from(instructions)
    testSet[index] = replacement + instruction.substring(3)

    const accumulator = calculateAccumulator(testSet)
    if (accumulator !== undefined) {
        console.log(accumulator)
        break
    }
}