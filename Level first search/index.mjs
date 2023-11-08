import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const mentorRelationships = new Map();
for(const [mentor, mentees] of input.split('\n').map(line => [parseInt(line.split(':')[0]), line.split(':')[1].trim().split(',').map(mentee => parseInt(mentee))])){
    mentorRelationships.set(mentor, mentees);
}

const mentors = new Set(mentorRelationships.keys());
const mentees = new Set(Array.from(mentorRelationships.values()).flatMap(mentees => mentees));
const rootMentor = Array.from(mentors).find(mentor => !mentees.has(mentor));

let mentorsOnLevel = [rootMentor];
const mentorsPerLevel = new Map();
mentorsPerLevel.set(1, 1);
for(let level = 1; mentorsOnLevel.length > 0; level++){
    mentorsPerLevel.set(level, mentorsOnLevel.length);
    mentorsOnLevel = mentorsOnLevel.flatMap(mentor => {
        return mentorRelationships.has(mentor) ? mentorRelationships.get(mentor) : [];
    });
}

const maxLevel = 26;
let mentorsOnOrBelowMaxLevel = 0;
for(let level = 1; level <= maxLevel && mentorsPerLevel.has(level); level++){
    mentorsOnOrBelowMaxLevel += mentorsPerLevel.get(level);
}

console.info(mentorsOnOrBelowMaxLevel);