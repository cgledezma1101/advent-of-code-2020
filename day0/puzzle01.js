const readFileSync = require('fs').readFileSync

const inputFile = 'input.txt'
const rawInput = readFileSync(`./${inputFile}`).toString()

const numbers = rawInput.split('\n').filter(number => !!number).map(number => parseInt(number))

numbers.forEach(firstEntry => {
    numbers.forEach(secondEntry => {
        numbers.forEach(thirdEntry => {
            if ((firstEntry + secondEntry + thirdEntry) === 2020) {
                console.log(`The numbers are ${firstEntry}, ${secondEntry}, and ${thirdEntry}`)
                console.log(firstEntry * secondEntry * thirdEntry)
            }
        })
    })
})