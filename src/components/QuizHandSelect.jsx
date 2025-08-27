// src/components/QuizHandSelect.jsx
import React, { useMemo } from 'react';
import Hand from './Hand';
import HandDisplay from './HandDisplay';

// This data structure is now the single source of truth for how hands are displayed in the quiz.
// It maps the hand name from the data file to its specific card patterns and descriptions.
const handDisplayData = {
    // --- 2025 ---
    '2025 - Hand 1 (Pung 2s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'2B'},{id:'SOAP'},{id:'2B'},{id:'5B'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'2D'},{id:'2D'},{id:'2D'}] } ]},
    '2025 - Hand 1 (Pung 5s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'2B'},{id:'SOAP'},{id:'2B'},{id:'5B'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'5D'},{id:'5D'},{id:'5D'}] } ]},
    '2025 - Hand 2': { patterns: [ { tiles: [{id:'2B'},{id:'2B'},{id:'2B'},{id:'SOAP'},{id:'SOAP'},{id:'SOAP'},{id:'SOAP'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'5C'}] } ]},
    '2025 - Hand 3': { patterns: [ { tiles: [{id:'2B'},{id:'SOAP'},{id:'2B'},{id:'5B'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'GD'}] } ]},
    '2025 - Hand 4': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'SOAP'},{id:'SOAP'},{id:'SOAP'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'5D'},{id:'5D'},{id:'5D'}] } ]},
    
    // --- 2468 ---
    '2468 - Hand 1 (1 or 2 Suits)': { patterns: [ { tiles: [ {id: '2D'}, {id: '2D'}, {id: '2D'}, {id: '4D'}, {id: '4D'}, {id: '4D'}, {id: '4D'}, {id: '6D'}, {id: '6D'}, {id: '6D'}, {id: '8D'}, {id: '8D'}, {id: '8D'}, {id: '8D'} ]}, { tiles: [ {id: '2B'}, {id: '2B'}, {id: '2B'}, {id: '4B'}, {id: '4B'}, {id: '4B'}, {id: '4B'}, {id: '6C'}, {id: '6C'}, {id: '6C'}, {id: '8C'}, {id: '8C'}, {id: '8C'}, {id: '8C'} ]} ]},
    '2468 - Hand 2': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'4C'},{id:'4C'},{id:'4C'},{id:'4C'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'6D'}] }, { tiles: [{id:'F'},{id:'F'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'8D'},{id:'8D'},{id:'8D'},{id:'8D'}] } ]},
    '2468 - Hand 3': { patterns: [ { tiles: [{id:'2D'},{id:'2D'},{id:'4D'},{id:'4D'},{id:'4D'},{id:'6D'},{id:'6D'},{id:'8D'},{id:'8D'},{id:'8D'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'GD'}] } ]},
    '2468 - Hand 4 (Pung 2s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'2B'},{id:'4B'},{id:'6B'},{id:'8B'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'2D'},{id:'2D'},{id:'2D'}] } ]},
    '2468 - Hand 4 (Pung 4s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'2B'},{id:'4B'},{id:'6B'},{id:'8B'},{id:'4C'},{id:'4C'},{id:'4C'},{id:'4D'},{id:'4D'},{id:'4D'}] } ]},
    '2468 - Hand 4 (Pung 6s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'2B'},{id:'4B'},{id:'6B'},{id:'8B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'6D'},{id:'6D'},{id:'6D'}] } ]},
    '2468 - Hand 4 (Pung 8s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'2B'},{id:'4B'},{id:'6B'},{id:'8B'},{id:'8C'},{id:'8C'},{id:'8C'},{id:'8D'},{id:'8D'},{id:'8D'}] } ]},
    '2468 - Hand 5': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'2D'},{id:'2D'},{id:'4D'},{id:'4D'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'8D'},{id:'8D'},{id:'8D'},{id:'8D'}] } ]},
    '2468 - Hand 6': { patterns: [ { tiles: [{id:'2B'},{id:'2B'},{id:'2B'},{id:'4B'},{id:'4B'},{id:'4B'},{id:'4B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'8C'},{id:'8C'},{id:'8D'},{id:'8D'}] } ]},
    '2468 - Hand 7 (Kong 2s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'2D'},{id:'2D'},{id:'2D'},{id:'2D'}] } ]},
    '2468 - Hand 7 (Kong 4s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'4B'},{id:'4B'},{id:'4B'},{id:'4B'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'4D'},{id:'4D'},{id:'4D'},{id:'4D'}] } ]},
    '2468 - Hand 7 (Kong 6s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'6D'}] } ]},
    '2468 - Hand 7 (Kong 8s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'8B'},{id:'8B'},{id:'8B'},{id:'8B'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'8D'},{id:'8D'},{id:'8D'},{id:'8D'}] } ]},
    '2468 - Hand 8 (Pung 2s)': { patterns: [ { tiles: [{id:'2B'},{id:'2B'},{id:'4B'},{id:'4B'},{id:'6B'},{id:'6B'},{id:'8B'},{id:'8B'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'2D'},{id:'2D'},{id:'2D'}] } ]},
    '2468 - Hand 8 (Pung 4s)': { patterns: [ { tiles: [{id:'2B'},{id:'2B'},{id:'4B'},{id:'4B'},{id:'6B'},{id:'6B'},{id:'8B'},{id:'8B'},{id:'4C'},{id:'4C'},{id:'4C'},{id:'4D'},{id:'4D'},{id:'4D'}] } ]},
    '2468 - Hand 8 (Pung 6s)': { patterns: [ { tiles: [{id:'2B'},{id:'2B'},{id:'4B'},{id:'4B'},{id:'6B'},{id:'6B'},{id:'8B'},{id:'8B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'6D'},{id:'6D'},{id:'6D'}] } ]},
    '2468 - Hand 8 (Pung 8s)': { patterns: [ { tiles: [{id:'2B'},{id:'2B'},{id:'4B'},{id:'4B'},{id:'6B'},{id:'6B'},{id:'8B'},{id:'8B'},{id:'8C'},{id:'8C'},{id:'8C'},{id:'8D'},{id:'8D'},{id:'8D'}] } ]},
    
    // --- Any Like Numbers ---
    ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => i + 1).map(n => [
        `Any Like Numbers - Hand 1 (${n}s)`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:'GD'},{id:`${n}C`},{id:`${n}C`},{id:`${n}C`},{id:`${n}C`},{id:'RD'},{id:`${n}D`},{id:`${n}D`}] } ]}
    ])),
    ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => i + 1).map(n => [
        `Any Like Numbers - Hand 2 (${n}s)`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n}B`},{id:`${n}C`},{id:`${n}C`},{id:`${n}C`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:`${n}B`},{id:`${n}B`}] } ]}
    ])),
    ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => i + 1).flatMap(n => [
        [`Any Like Numbers - Hand 3 (${n}s, GD)`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n}C`},{id:`${n}C`},{id:`${n}C`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:'GD'},{id:'GD'},{id:'GD'}] } ]}],
        [`Any Like Numbers - Hand 3 (${n}s, RD)`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n}C`},{id:`${n}C`},{id:`${n}C`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:'RD'},{id:'RD'},{id:'RD'}] } ]}],
        [`Any Like Numbers - Hand 3 (${n}s, WD)`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n}C`},{id:`${n}C`},{id:`${n}C`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:'WD'},{id:'WD'},{id:'WD'}] } ]}]
    ])),

    // --- Quints ---
    ...Object.fromEntries(Array.from({ length: 7 }, (_, i) => i + 1).map(n => [
        `Quints - Hand 1 (${n}-${n+2})`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n+1}C`},{id:`${n+1}C`},{id:`${n+1}C`},{id:`${n+1}C`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`}] } ]}
    ])),
    ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => i + 1).flatMap(n => ['N','E','W','S'].map(w => [
        `Quints - Hand 2 (${n},${n+1},${w})`, { patterns: [ { tiles: [{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:w},{id:w},{id:w},{id:w},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+1}D`}] } ]}
    ]))),
    ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => i + 1).map(n => [
        `Quints - Hand 3 (${n}s)`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n}C`},{id:`${n}C`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`}] } ]}
    ])),

    // --- Consecutive Run ---
    'Consecutive Run - Hand 1 (1-5 or 5-9)': { patterns: [ { tiles: [{id:'1D'},{id:'1D'},{id:'2D'},{id:'2D'},{id:'2D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'4D'},{id:'4D'},{id:'4D'},{id:'5D'},{id:'5D'}] }, { tiles: [{id:'5D'},{id:'5D'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'7D'},{id:'7D'},{id:'7D'},{id:'7D'},{id:'8D'},{id:'8D'},{id:'8D'},{id:'9D'},{id:'9D'}] } ]},
    ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => i + 1).map(n => [
        `Consecutive Run - Hand 2 (${n}-${n+3}, 1 or 2 Suits)`, { patterns: [ { tiles: [{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+3}D`},{id:`${n+3}D`},{id:`${n+3}D`},{id:`${n+3}D`}] }, { tiles: [{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n+1}B`},{id:`${n+1}B`},{id:`${n+1}B`},{id:`${n+1}B`},{id:`${n+2}C`},{id:`${n+2}C`},{id:`${n+2}C`},{id:`${n+3}C`},{id:`${n+3}C`},{id:`${n+3}C`},{id:`${n+3}C`}] } ]}
    ])),
    ...Object.fromEntries(Array.from({ length: 7 }, (_, i) => i + 1).map(n => [
        `Consecutive Run - Hand 3 (${n}-${n+2}, 1 or 3 Suits)`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`}] }, { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n+1}C`},{id:`${n+1}C`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`}] } ]}
    ])),
    ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => i + 1).map(n => [
        `Consecutive Run - Hand 4 (${n}-${n+4})`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n+1}B`},{id:`${n+2}B`},{id:`${n+3}C`},{id:`${n+3}C`},{id:`${n+3}C`},{id:`${n+3}C`},{id:`${n+4}D`},{id:`${n+4}D`},{id:`${n+4}D`},{id:`${n+4}D`}] } ]}
    ])),
    ...Object.fromEntries(Array.from({ length: 7 }, (_, i) => i + 1).map(n => [
        `Consecutive Run - Hand 5 (${n}-${n+2})`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}D`},{id:`${n}D`},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:'GD'},{id:'GD'},{id:'GD'}] } ]}
    ])),
    ...Object.fromEntries(Array.from({ length: 7 }, (_, i) => i + 1).map(n => [
        `Consecutive Run - Hand 6 (${n}-${n+2})`, { patterns: [ { tiles: [{id:`${n}B`},{id:`${n}B`},{id:`${n}B`},{id:`${n+1}B`},{id:`${n+1}B`},{id:`${n+1}B`},{id:`${n+2}B`},{id:`${n+2}B`},{id:`${n+2}B`},{id:`${n+2}B`},{id:'RD'},{id:'RD'},{id:'WD'},{id:'WD'}] } ]}
    ])),
    // --- THIS IS THE CORRECTED LINE ---
    ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => i + 1).flatMap(i => Array.from({ length: 5 }, (_, k) => k + i).map(p => [
        `Consecutive Run - Hand 7 (${i}-${i+4} pair ${p}s)`, { patterns: [ { tiles: [{id:`${p}B`},{id:`${p}B`}, ...Array.from({length:5}, (_,l)=>i+l).filter(num => num !== p).map(num => ({id: `${num}B`})),{id:`${p}C`},{id:`${p}C`},{id:`${p}C`},{id:`${p}C`},{id:`${p}D`},{id:`${p}D`},{id:`${p}D`},{id:`${p}D`}] } ]}
    ]))),
    ...Object.fromEntries(Array.from({ length: 7 }, (_, i) => i + 1).map(n => [
        `Consecutive Run - Hand 8 (${n}-${n+2})`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n+1}B`},{id:`${n+1}B`},{id:`${n+2}B`},{id:`${n+2}B`},{id:`${n+2}B`},{id:`${n}C`},{id:`${n+1}C`},{id:`${n+1}C`},{id:`${n+2}C`},{id:`${n+2}C`},{id:`${n+2}C`}] } ]}
    ])),

    // --- 13579 ---
    '13579 - Hand 1 (1 or 3 Suits)': { patterns: [ { tiles: [{id:'1D'},{id:'1D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'5D'},{id:'5D'},{id:'5D'},{id:'5D'},{id:'7D'},{id:'7D'},{id:'7D'},{id:'9D'},{id:'9D'}] }, { tiles: [{id:'1B'},{id:'1B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'7D'},{id:'7D'},{id:'7D'},{id:'9D'},{id:'9D'}] } ]},
    '13579 - Hand 2 (1&3 or 5&7)': { patterns: [ { tiles: [{id:'1B'},{id:'1B'},{id:'1B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'5C'}] }, { tiles: [{id:'5B'},{id:'5B'},{id:'5B'},{id:'7B'},{id:'7B'},{id:'7B'},{id:'7B'},{id:'7C'},{id:'7C'},{id:'7C'},{id:'9C'},{id:'9C'},{id:'9C'},{id:'9C'}] } ]},
    '13579 - Hand 3 (1,3,5)': { patterns: [ { tiles: [{id:'1D'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'5D'},{id:'5D'},{id:'5D'},{id:'5D'},{id:'GD'},{id:'GD'},{id:'GD'}] } ]},
    '13579 - Hand 3 (5,7,9)': { patterns: [ { tiles: [{id:'5D'},{id:'5D'},{id:'5D'},{id:'5D'},{id:'7D'},{id:'7D'},{id:'7D'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'GD'},{id:'GD'},{id:'GD'}] } ]},
    '13579 - Hand 4': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'9B'},{id:'9B'},{id:'9B'},{id:'9B'},{id:'1C'},{id:'SOAP'}] } ]},
    '13579 - Hand 5 (1,3,5 or 5,7,9)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'1D'},{id:'3D'},{id:'5D'},{id:'7D'},{id:'7D'},{id:'7D'},{id:'7D'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'}] }, { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'1B'},{id:'3B'},{id:'5B'},{id:'7C'},{id:'7C'},{id:'7C'},{id:'7C'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'}] } ]},
    '13579 - Hand 6 (1,3,5)': { patterns: [ { tiles: [{id:'1B'},{id:'1B'},{id:'1B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'5B'},{id:'5B'},{id:'5B'},{id:'5B'},{id:'RD'},{id:'RD'},{id:'WD'},{id:'WD'}] } ]},
    '13579 - Hand 6 (5,7,9)': { patterns: [ { tiles: [{id:'5B'},{id:'5B'},{id:'5B'},{id:'7B'},{id:'7B'},{id:'7B'},{id:'9B'},{id:'9B'},{id:'9B'},{id:'9B'},{id:'RD'},{id:'RD'},{id:'WD'},{id:'WD'}] } ]},
    '13579 - Hand 7 (1,3)': { patterns: [ { tiles: [{id:'1B'},{id:'1B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'N'},{id:'E'},{id:'W'},{id:'S'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'5C'},{id:'5C'}] } ]},
    '13579 - Hand 7 (5,7)': { patterns: [ { tiles: [{id:'5B'},{id:'5B'},{id:'7B'},{id:'7B'},{id:'7B'},{id:'N'},{id:'E'},{id:'W'},{id:'S'},{id:'7C'},{id:'7C'},{id:'7C'},{id:'9C'},{id:'9C'}] } ]},
    '13579 - Hand 8': { patterns: [ { tiles: [{id:'1B'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'3C'},{id:'3C'},{id:'5C'},{id:'5C'},{id:'7C'},{id:'7C'},{id:'9B'},{id:'9B'},{id:'9B'},{id:'9B'}] } ]},
    '13579 - Hand 9 (1,3)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'3B'},{id:'3B'},{id:'1C'},{id:'1C'},{id:'1C'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'5D'},{id:'5D'}] } ]},
    '13579 - Hand 9 (5,7)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'5B'},{id:'5B'},{id:'7B'},{id:'7B'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'7C'},{id:'7C'},{id:'7C'},{id:'9D'},{id:'9D'}] } ]},
    
    // --- Winds-Dragons ---
    'Winds-Dragons - Hand 1': { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'},{id:'S'}] }, { tiles: [{id:'N'},{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'}] } ]},
    ...Object.fromEntries(Array.from({ length: 7 }, (_, i) => i + 1).map(n => [
        `Winds-Dragons - Hand 2 (${n}-${n+2})`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}D`},{id:`${n+1}D`},{id:`${n+2}D`},{id:'GD'},{id:'GD'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'WD'},{id:'WD'},{id:'WD'},{id:'WD'}] } ]}
    ])),
    'Winds-Dragons - Hand 3': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'},{id:'S'}] } ]},
    'Winds-Dragons - Hand 4': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'N'},{id:'E'},{id:'W'},{id:'S'},{id:'RD'},{id:'RD'},{id:'RD'}] } ]},
    ...Object.fromEntries([1,3,5,7,9].map(n => [
        `Winds-Dragons - Hand 5 (Odd ${n}s)`, { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'N'},{id:'N'},{id:`${n}B`},{id:`${n}C`},{id:`${n}C`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:'S'},{id:'S'},{id:'S'},{id:'S'}] } ]}
    ])),
    ...Object.fromEntries([2,4,6,8].map(n => [
        `Winds-Dragons - Hand 6 (Even ${n}s)`, { patterns: [ { tiles: [{id:'E'},{id:'E'},{id:'E'},{id:'E'},{id:`${n}B`},{id:`${n}C`},{id:`${n}C`},{id:`${n}D`},{id:`${n}D`},{id:`${n}D`},{id:'W'},{id:'W'},{id:'W'},{id:'W'}] } ]}
    ])),
    'Winds-Dragons - Hand 7': { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'2D'},{id:'SOAP'},{id:'2D'},{id:'5D'}] }, { tiles: [{id:'N'},{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'},{id:'2D'},{id:'SOAP'},{id:'2D'},{id:'5D'}] } ]},
    'Winds-Dragons - Hand 8': { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'GD'}] } ]},
    
    // --- 369 ---
    '369 - Hand 1 (2 or 3 Suits)': { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'9C'},{id:'9C'},{id:'9C'},{id:'9C'}] }, { tiles: [{id:'3B'},{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'}] } ]},
    '369 - Hand 2 (1 or 3 Suits)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'}] }, { tiles: [{id:'F'},{id:'F'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'}] } ]},
    '369 - Hand 3 (Kong 3s)': { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'RD'},{id:'RD'},{id:'RD'}] } ]},
    '369 - Hand 3 (Kong 6s)': { patterns: [ { tiles: [{id:'6B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'RD'},{id:'RD'},{id:'RD'}] } ]},
    '369 - Hand 3 (Kong 9s)': { patterns: [ { tiles: [{id:'9B'},{id:'9B'},{id:'9B'},{id:'9B'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'9C'},{id:'9C'},{id:'9C'},{id:'9C'},{id:'RD'},{id:'RD'},{id:'RD'}] } ]},
    '369 - Hand 4': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'3C'},{id:'6C'},{id:'9C'},{id:'9B'},{id:'9B'},{id:'9B'},{id:'9B'}] } ]},
    '369 - Hand 5 (Kong 3s)': { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'9B'},{id:'9B'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'}] } ]},
    '369 - Hand 5 (Kong 6s)': { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'9B'},{id:'9B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'6D'}] } ]},
    '369 - Hand 5 (Kong 9s)': { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'9B'},{id:'9B'},{id:'9C'},{id:'9C'},{id:'9C'},{id:'9C'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'}] } ]},
    '369 - Hand 6 (Matching Dragons)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'GD'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'RD'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'WD'}] } ]},

    // --- Singles and Pairs ---
    ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => i + 1).map(n => [
        `Singles/Pairs - Hand 1 (${n}-${n+3})`, { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'E'},{id:'W'},{id:'S'},{id:'S'},{id:`${n}D`},{id:`${n}D`},{id:`${n+1}D`},{id:`${n+1}D`},{id:`${n+2}D`},{id:`${n+2}D`},{id:`${n+3}D`},{id:`${n+3}D`}] } ]}
    ])),
    'Singles/Pairs - Hand 2': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'2B'},{id:'4B'},{id:'6B'},{id:'8B'},{id:'GD'},{id:'GD'},{id:'2C'},{id:'4C'},{id:'6C'},{id:'8C'},{id:'RD'},{id:'RD'}] } ]},
    ...Object.fromEntries([3,6,9].map(n => [
        `Singles/Pairs - Hand 3 (Pair ${n}s)`, { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'9B'},{id:'9B'},{id:'3C'},{id:'3C'},{id:'6C'},{id:'6C'},{id:'9C'},{id:'9C'},{id:`${n}D`},{id:`${n}D`}] } ]}
    ])),
    ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => i + 1).map(n => [
        `Singles/Pairs - Hand 4 (${n},${n+1})`, { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:`${n}B`},{id:`${n}B`},{id:`${n+1}B`},{id:`${n+1}B`},{id:`${n}C`},{id:`${n}C`},{id:`${n+1}C`},{id:`${n+1}C`},{id:`${n}D`},{id:`${n}D`},{id:`${n+1}D`},{id:`${n+1}D`}] } ]}
    ])),
    ...Object.fromEntries([1,3,5,7,9].map(n => [
        `Singles/Pairs - Hand 5 (Odd ${n}s)`, { patterns: [ { tiles: [{id:'1B'},{id:'1B'},{id:'3B'},{id:'3B'},{id:'5B'},{id:'5B'},{id:'7B'},{id:'7B'},{id:'9B'},{id:'9B'},{id:`${n}C`},{id:`${n}C`},{id:`${n}D`},{id:`${n}D`}] } ]}
    ])),
    'Singles/Pairs - Hand 6': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'2B'},{id:'SOAP'},{id:'2B'},{id:'5B'},{id:'2C'},{id:'SOAP'},{id:'2C'},{id:'5C'},{id:'2D'},{id:'SOAP'},{id:'2D'},{id:'5D'}] } ]},
};

function QuizHandSelect({ hand, section, allHands, onHandSelect, pickNumber, onBack }) {
    const handsInSection = useMemo(() => {
        return allHands.filter(h => h.name.startsWith(section));
    }, [section, allHands]);

    const handOptionStyle = { 
        marginBottom: '15px', 
        padding: '15px', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        transition: 'background-color 0.2s'
    };
    
    const handDisplayStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '20px auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Quiz: Pick {pickNumber} of 3</h1>
                <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>You selected the "{section}" section. Now, choose the specific hand you think is best.</p>
            </div>
            
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                <Hand hand={hand} simpleView={true} />
            </div>

            <div>
                {handsInSection.map((winningHand) => {
                    const displayInfo = handDisplayData[winningHand.name];
                    if (!displayInfo) {
                        console.warn(`No display data found for hand: ${winningHand.name}`);
                        return null; // Don't render if no display info is defined
                    }

                    return displayInfo.patterns.map((pattern, index) => (
                        <div 
                            key={`${winningHand.name}-${index}`} 
                            onClick={() => onHandSelect(winningHand)} 
                            style={handOptionStyle}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e7f3ff'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
                        >
                            <div style={handDisplayStyle}>
                                <HandDisplay 
                                    name={winningHand.name} 
                                    variation={pattern} 
                                />
                                <span style={{fontStyle: 'italic', color: '#555'}}>{displayInfo.description}</span>
                            </div>
                        </div>
                    ));
                })}
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <button 
                    className="btn-neutral" 
                    onClick={onBack}
                >
                    &larr; Back to Sections
                </button>
            </div>
        </div>
    );
}

export default QuizHandSelect;
