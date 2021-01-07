const readFileSync = require('fs').readFileSync

const input = readFileSync('./input.txt').toString()

const passports = input.split('\n\n')

const isValidByr = field => {
    const match = field.match(/^(\d{4})$/)

    return match && (match[1] >= 1920) && (match[1] <= 2002)
}

const isValidIyr = field => {
    const match = field.match(/^(\d{4})$/)

    return match && (match[1] >= 2010) && (match[1] <= 2020)
}

const isValidEyr = field => {
    const match = field.match(/^(\d{4})$/)

    return match && (match[1] >= 2020) && (match[1] <= 2030)
}

const isValidHgt = field => {
    const cmMatch = field.match(/^(\d+)cm$/)

    if (cmMatch) {
        return cmMatch[1] >= 150 && cmMatch[1] <= 193
    }

    const inMatch = field.match(/^(\d+)in$/)

    return inMatch && inMatch[1] >= 59 && inMatch[1] <= 76
}

const isValidHcl = field => field.match(/^#[0-9a-f]{6}$/)

const isValidEcl = field => (field === 'amb') || (field === 'blu') || (field === 'brn') || (field === 'gry') || (field === 'grn') || (field === 'hzl') || (field === 'oth')

const isValidPid = field => field.match(/^\d{9}$/)

const requiredFields = [
    { name: 'byr', isValid: isValidByr },
    { name: 'iyr', isValid: isValidIyr },
    { name: 'eyr', isValid: isValidEyr },
    { name: 'hgt', isValid: isValidHgt },
    { name: 'hcl', isValid: isValidHcl },
    { name: 'ecl', isValid: isValidEcl },
    { name: 'pid', isValid: isValidPid }
]

const valid = passports.reduce(
    (totalValid, passport) => {
        const fields = passport.split(/[ \n]/).reduce(
            (current, field) => {
                const split = field.split(':')

                return { ...current, [split[0]]: split[1] }
            },
            {}
        )

        const hasRequired = requiredFields.reduce(
            (passportValid, { name, isValid }) => passportValid && fields[name] && isValid(fields[name]),
            true
        )

        return totalValid + (hasRequired ? 1 : 0)
    },
    0
)

console.log(valid)