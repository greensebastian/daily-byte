// Coffee Driven Development
import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');
const lines = input.split('\n');
const connections = new Map();
const groups = lines.map(line => line.split(' ').map(consultant => parseInt(consultant.replace(/[,:]*/, ''))));

for(const group of groups){
    const rootId = group[0]
    if (!connections.has(rootId)) connections.set(rootId, new Set());
    const rootSet = connections.get(rootId);
    for(const id of group.slice(1)){
        if (!connections.has(id)) connections.set(id, new Set());
        connections.get(id).add(rootId);
        rootSet.add(id);
    }
}

for(const key of connections.keys()){
    connections.set(key, [...new Set(connections.get(key))].sort((a, b) => a - b));
}

const getWithPrev = (val, prev) => ({ val, prev });

const minimums = new Map();

const getStringIndex = (a, b) => a <= b ? `${a}-${b}` : `${b}-${a}`;

const exploreNodeBFS = (start, end, force = false) => {
    if (minimums.has(getStringIndex(start, end)) && !force) return;
    let connectionCount = 0;
    let toExplore = [[start]];
    let seen = new Set();
    while(!seen.has(end)){
        connectionCount++;
        const newToExplore = [];
        for(const path of toExplore){
            const last = path[path.length - 1];
            seen.add(last);
            for(const pathStart of path){
                if (pathStart === last) continue;
                const idx = getStringIndex(pathStart, last);
                const existing = minimums.get(idx);
                if (!existing || existing > connectionCount){
                    minimums.set(idx, connectionCount)
                }
            }
            
            const newConnections = connections.get(last)
            for(const newConnection of newConnections){
                if (path.some(old => old === newConnection)) continue;
                newToExplore.push([...path, newConnection]);
            }
        }
        toExplore = newToExplore;
    }
}

const allIndices = [...new Set(groups.flatMap(group => group))].sort((a, b) => a - b);
for(const start of allIndices){
    if (start % 100 === 0) console.info(`Start: ${start}`);
    for(const end of allIndices){
        //if (end % 100 === 0) console.info(`End: ${end}`);
        exploreNodeBFS(start, end, true);
    }
}

let longestPair = "";
let longestCount = 0;
const pairs = [];
for (const [pair, count] of minimums.entries()){
    pairs.push({key: pair, count});
    if (count > longestCount){
        longestPair = pair;
        longestCount = count;
    }
}

const getComplexity = (key, count) => parseInt(key.split('-')[0]) * parseInt(key.split('-')[1]) * (count - 1);

pairs.sort((a, b) => b.count - a.count);
const maxPairs = pairs.filter(pair => pair.count === pairs[0].count);
const maxPairsWithComplexity = maxPairs.map(pair => ({...pair, complexity: getComplexity(pair.key, pair.count)})).sort((a, b) => b.complexity - a.complexity);
console.table(maxPairsWithComplexity)
for(const pair of maxPairsWithComplexity){
    const start = parseInt(pair.key.split('-')[0]);
    const end = parseInt(pair.key.split('-')[1]);
    exploreNodeBFS(start, end, true)
    const recomputedDistance = minimums.get(pair.key);
    const complexity = getComplexity(pair.key, recomputedDistance);
    console.log(`${pair.key}, ${recomputedDistance}, ${complexity}`);
}

console.info(longestPair);
console.info(longestCount);
const complexity = getComplexity(longestPair, longestCount);
console.info(complexity);
// not 410670

/**
 * 39-49
 * 49-186
 * 49-675
 * 39-390
 * 186-390
 * 390-675
 */