import { readFileSync } from 'fs'

const actions = readFileSync('input.txt', 'utf-8').split('\n');

const values = [parseInt(actions.shift())];

for (const action of actions){
    const current = values[values.length - 1];
    switch (action){
        case "^":
            values.push(current + 5);
            break;
        case "v":
            values.push(current - 3);
            break;
        case "<":
            values.pop();
            break;
    }
}

console.info(values[values.length - 1]);