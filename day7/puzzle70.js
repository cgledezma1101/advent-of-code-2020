const readFileSync = require('fs').readFileSync

const instructions = readFileSync('input.txt').toString().split('\n')

let accumulator = 0
const visited = {}
let instructionPointer = 0

while(instructionPointer < instructions.length) {
    if (visited[instructionPointer]) {
        break
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

console.log(accumulator)