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

const minimums = new Map();

const getStringIndex = (a, b) => a <= b ? `${a}-${b}` : `${b}-${a}`;

const allIndices = [...new Set(groups.flatMap(group => group))];
for(const start of allIndices){
    for(const end of allIndices){
        if (end === start) continue;
        const stringIndex = getStringIndex(start, end);
        if (minimums.has(stringIndex)) continue;
        let pathsToEvaluate = [...connections.get(start)].map(i => [start, i])
        const seen = new Set();
        for(let n = 1; !minimums.has(stringIndex); n++){
            const nextIter = new Set();
            for(const path of pathsToEvaluate){
                const newId = path[path.length - 1]
                if (newId === start) continue;
                seen.add(newId);
                for (const pathStart of path){
                    const newStringIndex = getStringIndex(pathStart, newId);
                    const shortestSeen = minimums.get(newStringIndex);
                    if (!shortestSeen || shortestSeen > path.length){
                        minimums.set(newStringIndex, path.length);
                    }
                }
                if (!minimums.has(stringIndex)) {
                    for(const newConnection of connections.get(newId)){
                        if (!seen.has(newConnection)) nextIter.add([...path, newConnection]);
                    }
                }
            }
            pathsToEvaluate = [...nextIter];
        }
    }
}

let longestPair = "";
let longestCount = 0;
for (const [pair, count] of minimums.entries()){
    if (count > longestCount){
        longestPair = pair;
        longestCount = count;
    }
}

console.info(longestPair);
console.info(longestCount);
const complexity = parseInt(longestPair.split('-')[0]) * parseInt(longestPair.split('-')[1]) * (longestCount - 1);
console.info(complexity);
// not 410670