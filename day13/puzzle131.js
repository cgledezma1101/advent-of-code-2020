const readFileSync = require('fs').readFileSync

const input = readFileSync('input.txt').toString().split('\n')

const maskRegex = /^mask = ([X01]+)$/
const memRegex = /^mem\[(\d+)\] = (\d+)$/

const calculated = {}
const memory = {}

const calculateAddresses = ([anchorMask, ...restMask], [anchorAddress, ...restAddress]) => {

    if (anchorMask === undefined) {
        return [0]
    }

    const maskKey = restMask.join('')
    const addressKey = restAddress.join('')

    const partialAddresses =
        calculated[maskKey] && (calculated[maskKey][addressKey] !== undefined) ? calculated[maskKey][addressKey]
        : calculateAddresses(restMask, restAddress)

    if (calculated[maskKey] === undefined) {
        calculated[maskKey] = {}
    }

    calculated[maskKey][addressKey] = partialAddresses

    const anchorAddressValue = parseInt(anchorAddress)
    const exponent = Math.pow(2, restAddress.length)
    const stageIncrement = anchorAddressValue * exponent

    if (anchorMask === '0') {
        return partialAddresses.map(value => value + stageIncrement)
    }

    if (anchorMask === '1') {
        return partialAddresses.map(value => value + exponent)
    }

    return [
        ...partialAddresses.map(value => value + exponent),
        ...partialAddresses.map(value => value)
    ]
}

let currentMask

input.forEach(inputLine => {
    const maskMatch = inputLine.match(maskRegex)
    if (maskMatch) {
        currentMask = maskMatch[1]
        return
    }

    const memMatch = inputLine.match(memRegex)
    const targetAddress = parseInt(memMatch[1]).toString(2).padStart(currentMask.length, '0')

    const addresses = calculateAddresses(currentMask, targetAddress)

    addresses.forEach(address => {
        memory[address] = parseInt(memMatch[2])
    })
})

console.log(Object.values(memory).reduce((total, value) => total + value, 0))