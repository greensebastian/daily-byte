// Ex ore
import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const nodes = input.split('\n').map(line => ({ index: line.split(':')[0], value: parseInt(line.split(':')[1]), xor: line.split(':')[2] }));

const nodeMap = new Map();
for(const node of nodes){
    nodeMap.set(node.index, node);
}

const xor = (a, b) => {
    let output = "";
    for(let i = 0; i < a.length; i++){
        output += a[i] !== b[i] ? "1" : "0";
    }
    return output;
}

const getNextNode = (index, prev) => {
    const nextIndex = xor(prev, nodeMap.get(index).xor);
    if (Array.from(nextIndex).every(char => char === '0')) return undefined;
    return nodeMap.get(nextIndex);
}

const startIndex = '10101010101010101010101010101010';
//const startIndex = '0001'
const startPrev = '00000000000000000000000000000000';
//const startPrev = '0000'

let prev = startPrev;
let index = startIndex;
let node = nodeMap.get(index);
let sum = node.value;
let count = 1;
while(!!node){
    const nextPrev = node.index;
    node = getNextNode(node.index, prev);
    if (!node) continue;
    prev = nextPrev;
    sum += node.value;
    count += 1;
}

const product = sum * count;
console.info(product);