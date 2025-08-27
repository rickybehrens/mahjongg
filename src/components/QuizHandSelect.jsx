// src/components/QuizHandSelect.jsx
import React, { useMemo } from 'react';
import Hand from './Hand';
import HandDisplay from './HandDisplay';

// This data structure is now the single source of truth for how hands are displayed in the quiz.
// It maps the hand name from the data file to its specific card patterns and descriptions.
const handDisplayData = {
    '2025 - Hand 1 (Pung 2s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'2B'},{id:'SOAP'},{id:'2B'},{id:'5B'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'2D'},{id:'2D'},{id:'2D'}] } ]},
    '2025 - Hand 1 (Pung 5s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'2B'},{id:'SOAP'},{id:'2B'},{id:'5B'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'5D'},{id:'5D'},{id:'5D'}] } ]},
    '2025 - Hand 2': { patterns: [ { tiles: [{id:'2B'},{id:'2B'},{id:'2B'},{id:'SOAP'},{id:'SOAP'},{id:'SOAP'},{id:'SOAP'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'5C'}] } ]},
    '2025 - Hand 3': { patterns: [ { tiles: [{id:'2B'},{id:'SOAP'},{id:'2B'},{id:'5B'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'5C'},{id:'5C'},{id:'5C'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'GD'}] } ]},
    '2025 - Hand 4': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'SOAP'},{id:'SOAP'},{id:'SOAP'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'5D'},{id:'5D'},{id:'5D'}] } ]},
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
    'Any Like Numbers - Hand 1 (1s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'GD'},{id:'1C'},{id:'1C'},{id:'1C'},{id:'1C'},{id:'RD'},{id:'1D'},{id:'1D'}] } ]},
    'Any Like Numbers - Hand 2 (1s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'1C'},{id:'1C'},{id:'1C'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'1B'},{id:'1B'}] } ]},
    'Any Like Numbers - Hand 3 (1s, GD)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'1C'},{id:'1C'},{id:'1C'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'GD'},{id:'GD'},{id:'GD'}] } ]},
    'Any Like Numbers - Hand 3 (1s, RD)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'1C'},{id:'1C'},{id:'1C'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'RD'},{id:'RD'},{id:'RD'}] } ]},
    'Any Like Numbers - Hand 3 (1s, WD)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'1C'},{id:'1C'},{id:'1C'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'WD'},{id:'WD'},{id:'WD'}] } ]},
    'Quints - Hand 1 (1-3)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'2C'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'}] } ]},
    'Quints - Hand 2 (1,2,N)': { patterns: [ { tiles: [{id:'1D'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'N'},{id:'N'},{id:'N'},{id:'N'},{id:'2D'},{id:'2D'},{id:'2D'},{id:'2D'},{id:'2D'}] } ]},
    'Quints - Hand 3 (1s)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'1C'},{id:'1C'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'1D'}] } ]},
    'Consecutive Run - Hand 1 (1-5 or 5-9)': { patterns: [ { tiles: [{id:'1D'},{id:'1D'},{id:'2D'},{id:'2D'},{id:'2D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'4D'},{id:'4D'},{id:'4D'},{id:'5D'},{id:'5D'}] }, { tiles: [{id:'5D'},{id:'5D'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'7D'},{id:'7D'},{id:'7D'},{id:'7D'},{id:'8D'},{id:'8D'},{id:'8D'},{id:'9D'},{id:'9D'}] } ]},
    'Consecutive Run - Hand 2 (1-4, 1 or 2 Suits)': { patterns: [ { tiles: [{id:'1D'},{id:'1D'},{id:'1D'},{id:'2D'},{id:'2D'},{id:'2D'},{id:'2D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'4D'},{id:'4D'},{id:'4D'},{id:'4D'}] }, { tiles: [{id:'1B'},{id:'1B'},{id:'1B'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'4C'},{id:'4C'},{id:'4C'},{id:'4C'}] } ]},
    'Consecutive Run - Hand 3 (1-3, 1 or 3 Suits)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'2D'},{id:'2D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'}] }, { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'1B'},{id:'2C'},{id:'2C'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'}] } ]},
    'Consecutive Run - Hand 4 (1-5)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'1B'},{id:'2B'},{id:'3B'},{id:'4C'},{id:'4C'},{id:'4C'},{id:'4C'},{id:'5D'},{id:'5D'},{id:'5D'},{id:'5D'}] } ]},
    'Consecutive Run - Hand 5 (1-3)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1D'},{id:'1D'},{id:'2D'},{id:'2D'},{id:'2D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'GD'},{id:'GD'},{id:'GD'}] } ]},
    'Consecutive Run - Hand 6 (1-3)': { patterns: [ { tiles: [{id:'1B'},{id:'1B'},{id:'1B'},{id:'2B'},{id:'2B'},{id:'2B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'RD'},{id:'RD'},{id:'WD'},{id:'WD'}] } ]},
    'Consecutive Run - Hand 7 (1-5 pair 1s)': { patterns: [ { tiles: [{id:'1B'},{id:'1B'},{id:'2B'},{id:'3B'},{id:'4B'},{id:'5B'},{id:'1C'},{id:'1C'},{id:'1C'},{id:'1C'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'1D'}] } ]},
    'Consecutive Run - Hand 8 (1-3)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1B'},{id:'2B'},{id:'2B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'1C'},{id:'2C'},{id:'2C'},{id:'3C'},{id:'3C'},{id:'3C'}] } ]},
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
    'Winds-Dragons - Hand 1': { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'},{id:'S'}] }, { tiles: [{id:'N'},{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'}] } ]},
    'Winds-Dragons - Hand 2 (1-3)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1D'},{id:'2D'},{id:'3D'},{id:'GD'},{id:'GD'},{id:'RD'},{id:'RD'},{id:'RD'},{id:'WD'},{id:'WD'},{id:'WD'},{id:'WD'}] } ]},
    'Winds-Dragons - Hand 3': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'},{id:'S'}] } ]},
    'Winds-Dragons - Hand 4': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'F'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'N'},{id:'E'},{id:'W'},{id:'S'},{id:'RD'},{id:'RD'},{id:'RD'}] } ]},
    'Winds-Dragons - Hand 5 (Odd 1s)': { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'N'},{id:'N'},{id:'1B'},{id:'1C'},{id:'1C'},{id:'1D'},{id:'1D'},{id:'1D'},{id:'S'},{id:'S'},{id:'S'},{id:'S'}] } ]},
    'Winds-Dragons - Hand 6 (Even 2s)': { patterns: [ { tiles: [{id:'E'},{id:'E'},{id:'E'},{id:'E'},{id:'2B'},{id:'2C'},{id:'2C'},{id:'2D'},{id:'2D'},{id:'2D'},{id:'W'},{id:'W'},{id:'W'},{id:'W'}] } ]},
    'Winds-Dragons - Hand 7': { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'2D'},{id:'SOAP'},{id:'2D'},{id:'5D'}] }, { tiles: [{id:'N'},{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'},{id:'2D'},{id:'SOAP'},{id:'2D'},{id:'5D'}] } ]},
    'Winds-Dragons - Hand 8': { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'E'},{id:'E'},{id:'W'},{id:'W'},{id:'W'},{id:'S'},{id:'S'},{id:'S'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'GD'}] } ]},
    '369 - Hand 1 (2 or 3 Suits)': { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'9C'},{id:'9C'},{id:'9C'},{id:'9C'}] }, { tiles: [{id:'3B'},{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'6B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'}] } ]},
    '369 - Hand 2 (1 or 3 Suits)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'6D'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'}] }, { tiles: [{id:'F'},{id:'F'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'9D'}] } ]},
    '369 - Hand 3 (Kong 3s)': { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'GD'},{id:'GD'},{id:'GD'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'RD'},{id:'RD'},{id:'RD'}] } ]},
    '369 - Hand 4': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'F'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'3C'},{id:'6C'},{id:'9C'},{id:'9B'},{id:'9B'},{id:'9B'},{id:'9B'}] } ]},
    '369 - Hand 5 (Kong 3s)': { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'9B'},{id:'9B'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'3C'},{id:'3D'},{id:'3D'},{id:'3D'},{id:'3D'}] } ]},
    '369 - Hand 6 (Matching Dragons)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'3B'},{id:'3B'},{id:'3B'},{id:'GD'},{id:'6C'},{id:'6C'},{id:'6C'},{id:'RD'},{id:'9D'},{id:'9D'},{id:'9D'},{id:'WD'}] } ]},
    'Singles/Pairs - Hand 1 (1-4)': { patterns: [ { tiles: [{id:'N'},{id:'N'},{id:'E'},{id:'W'},{id:'S'},{id:'S'},{id:'1D'},{id:'1D'},{id:'2D'},{id:'2D'},{id:'3D'},{id:'3D'},{id:'4D'},{id:'4D'}] } ]},
    'Singles/Pairs - Hand 2': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'2B'},{id:'4B'},{id:'6B'},{id:'8B'},{id:'GD'},{id:'GD'},{id:'2C'},{id:'4C'},{id:'6C'},{id:'8C'},{id:'RD'},{id:'RD'}] } ]},
    'Singles/Pairs - Hand 3 (Pair 3s)': { patterns: [ { tiles: [{id:'3B'},{id:'3B'},{id:'6B'},{id:'6B'},{id:'9B'},{id:'9B'},{id:'3C'},{id:'3C'},{id:'6C'},{id:'6C'},{id:'9C'},{id:'9C'},{id:'3D'},{id:'3D'}] } ]},
    'Singles/Pairs - Hand 4 (1,2)': { patterns: [ { tiles: [{id:'F'},{id:'F'},{id:'1B'},{id:'1B'},{id:'2B'},{id:'2B'},{id:'1C'},{id:'1C'},{id:'2C'},{id:'2C'},{id:'1D'},{id:'1D'},{id:'2D'},{id:'2D'}] } ]},
    'Singles/Pairs - Hand 5 (Odd 1s)': { patterns: [ { tiles: [{id:'1B'},{id:'1B'},{id:'3B'},{id:'3B'},{id:'5B'},{id:'5B'},{id:'7B'},{id:'7B'},{id:'9B'},{id:'9B'},{id:'1C'},{id:'1C'},{id:'1D'},{id:'1D'}] } ]},
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
