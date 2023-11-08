// git push -f
import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');
const coders = lines.map(line => {
    const [office, count] = line.split(';');
    return {
        office,
        count: parseInt(count),
    }
});

const max = new Map();
for(const { office, count } of coders){
    if (!max.has(office)) max.set(office, 0);
    const newMax = Math.max(max.get(office), count);
    max.set(office, newMax);
}

const sum = Array.from(max.keys()).reduce((prev, curr) => prev + max.get(curr), 0);

console.info(sum);