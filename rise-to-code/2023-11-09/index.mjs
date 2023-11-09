// Coffee Driven Development
import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');
const lines = input.split('\n');
const consultantKeysets = lines.slice(1, lines.length - 3).map(keyset => new Set(keyset.concat(keyset.toUpperCase())));
const targetCode = lines[lines.length - 1];

let code = "";
let commits = 0;
while (code !== targetCode){
    let nextSnippet = "";
    let remaining = targetCode.slice(code.length);
    for(const keyset of consultantKeysets){
        let index = 0;
        while(index < remaining.length && keyset.has(remaining[index])){
            index++;
        }
        nextSnippet = index > nextSnippet.length ? remaining.slice(0, index) : nextSnippet;
    }
    code += nextSnippet;
    commits++;
}

console.info(commits);