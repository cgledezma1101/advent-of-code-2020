const readFileSync = require('fs').readFileSync

const rules = readFileSync('input.txt').toString().split('\n')

const nodeRegex = /^(\w+ \w+) bags contain/
const adjacencyRegex = /(\d+) (\w+ \w+) bag/

const adjacencies = rules.reduce(
    (currentGraph, rule) => {
        const nodeMatch = rule.match(nodeRegex)
        const node = nodeMatch[1]

        const adjacencies = []
        let adjacencyMatch = rule.match(adjacencyRegex)
        while(adjacencyMatch) {
            adjacencies.push({ amount: adjacencyMatch[1], node: adjacencyMatch[2] })

            const nextRule = adjacencyMatch.input.substr(adjacencyMatch.index + adjacencyMatch[0].length)

            adjacencyMatch = nextRule.match(adjacencyRegex)
        }

        if (!currentGraph[node]) {
            currentGraph[node] = adjacencies
        } else {
            currentGraph[node].push(adjacencies)
        }

        return currentGraph
    },
    {}
)

const countBags = (entry, graph) => {
    if (graph[entry.node].length === 0) {
        return 1
    }

    return 1 + graph[entry.node].reduce(
        (bagCount, adjacency) => bagCount + adjacency.amount * countBags(adjacency, graph),
        0
    )
}

console.log(countBags({ node: 'shiny gold' }, adjacencies) - 1)