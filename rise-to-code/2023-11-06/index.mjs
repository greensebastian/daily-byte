// Rice to Challenge
import { readFileSync } from 'fs'

const lines = readFileSync('input.txt', 'utf-8').split('\n');

let bestCost = 1000;
for(const line of lines){
    const [distance, rating, price, discount] = line.split(',').map(nbr => parseInt(nbr.trim()));
    if (distance > 2500) continue;
    if (rating < 4) continue;

    const cost = price * (1 - (discount/100.0));
    bestCost = Math.min(bestCost, cost);
}

console.info(bestCost);