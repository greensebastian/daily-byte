// Closed circuit
import { readFileSync } from 'fs'

const pointers = readFileSync('input.txt', 'utf-8').split('\n').map(target => parseInt(target));

const involved = new Set();

const getNextCircleSize = () => {
    const startIndex = pointers.findIndex(index => !involved.has(index));
    if (startIndex < 0) return 0; // No more uninvolved
    let count = 1;
    involved.add(startIndex);
    let target = pointers[startIndex];
    while(target !== startIndex){
        count++;
        involved.add(target);
        target = pointers[target];
    }
    return count;
}

let product = 1;
let nextCircleSize = getNextCircleSize();
while(nextCircleSize > 0){
    product *= nextCircleSize;
    nextCircleSize = getNextCircleSize();
}

console.info(product);