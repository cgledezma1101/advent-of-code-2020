const readFileSync = require('fs').readFileSync

const input = readFileSync('sample.txt').toString().split('\n')

const busIds = input[1].split(',')
    .map((id, index) => [id, index]).filter(([id, _]) => id !== 'x')
    .map(([id, index]) => [parseInt(id), index])

const maxId = busIds.reduce(
    (currentMax, currentId) => currentMax[0] < currentId[0] ? currentId : currentMax,
    [Number.MIN_VALUE, -1]
)

for (let i = maxId[0]; ; i += maxId[0]) {
    const modulos = busIds.map(id => ((i - maxId[1] + id[1]) % id[0]))

    console.log(i / maxId[0], modulos)

    if (!modulos.find(modulo => modulo !== 0)) {
        console.log(i)
        break;
    }
}
