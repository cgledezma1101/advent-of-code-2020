const readFileSync = require('fs').readFileSync

const input = readFileSync('./input.txt').toString()

const passports = input.split('\n\n')

let valid = 0

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

passports.forEach(passport => {
    const fields = passport.split(/[ \n]/).map(field => field.split(':')[0])

    const isValid = requiredFields.reduce(
        (isValid, required) => isValid && fields.find(field => field === required),
        true
    )

    valid += (isValid ? 1 : 0)
})

console.log(valid)