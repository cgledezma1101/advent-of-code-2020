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
            adjacencies.push(adjacencyMatch[2])

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

const findBag = (entry, graph, visited, search) => {
    if (visited[entry]) {
        return false
    }

    if (entry === search) {
        return true
    }

    return graph[entry].reduce(
        (isFound, adjacent) => isFound || findBag(adjacent, graph, { ...visited, [entry]: true }, search),
        false
    )
}

const search = 'shiny gold'
const result = Object.keys(adjacencies).filter(node => (node !== search) && findBag(node, adjacencies, {}, search))

console.log(result.length)