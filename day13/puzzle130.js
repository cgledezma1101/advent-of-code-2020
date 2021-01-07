const readFileSync = require('fs').readFileSync

const input = readFileSync('input.txt').toString().split('\n')

const maskRegex = /^mask = ([X01]+)$/
const memRegex = /^mem\[(\d+)\] = (\d+)$/

let currentAndMask
let currentOrMask

const currentMemory = {}

input.forEach(inputLine => {
    const maskMatch = inputLine.match(maskRegex)
    if (maskMatch) {
        console.log(`Matched mask: ${maskMatch[1]}`)
        currentAndMask = BigInt(`0b${maskMatch[1].replace(/X/g, '1')}`)
        currentOrMask = BigInt(`0b${maskMatch[1].replace(/X/g, '0')}`)

        return
    }

    const memMatch = inputLine.match(memRegex)
    const memValue = (BigInt(memMatch[2]) & currentAndMask) | currentOrMask

    console.log(`andMask=${currentAndMask}`)
    console.log(`orMask=${currentOrMask}`)

    console.log(`Saving ${memMatch[2]} transformed to ${memValue} in ${memMatch[1]}`)

    currentMemory[memMatch[1]] = memValue
})

console.log(Object.values(currentMemory).reduce((total, value) => total + value))