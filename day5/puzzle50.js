const readFileSync = require('fs').readFileSync

const groups = readFileSync('input.txt').toString().split('\n\n')

const result = groups.reduce(
    (total, group) => {
        const answers = group.split('\n')

        const yes = answers.reduce(
            (currentYes, answer) => {
                for (let i = 0; i < answer.length; ++i) {
                    currentYes[answer[i]] = true
                }

                return currentYes
            },
            {}
        )

        return total + Object.keys(yes).length
    },
    0
)

console.log(result)