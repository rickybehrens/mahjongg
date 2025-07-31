// src/data/winningHands/2024-2025.js
// This file is programmatically generated from hand patterns.

const suits = ['B', 'C', 'D'];
const winds = ['N', 'E', 'W', 'S'];
const dragons = { B: 'GD', C: 'RD', D: 'WD' };

function getPermutations(arr, k) {
    const result = [];
    function backtrack(combination, remaining) {
        if (combination.length === k) {
            result.push(combination);
            return;
        }
        for (let i = 0; i < remaining.length; i++) {
            const nextItem = remaining[i];
            const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
            backtrack(combination.concat(nextItem), newRemaining);
        }
    }
    backtrack([], arr);
    return result;
}

function buildVariation(pattern, p) {
    const tiles = [];
    pattern.forEach(part => {
        const [tile, count, suitKey] = part;
        const suit = suitKey === 's1' ? p[0] : suitKey === 's2' ? p[1] : suitKey === 's3' ? p[2] : null;

        for (let i = 0; i < count; i++) {
            if (tile === 'D') {
                tiles.push({ id: dragons[suit] });
            } else if (tile === 'OD') {
                tiles.push({ id: suitKey });
            } else if (tile === 'NEWS') {
                ['N', 'E', 'W', 'S'].forEach(t => tiles.push({ id: t }));
            } else if (tile === '2024') {
                ['2', 'SOAP', '2', '4'].forEach(t => {
                    tiles.push({ id: t === 'SOAP' ? 'SOAP' : `${t}${suit}` })
                });
            } else if (suit) {
                tiles.push({ id: `${tile}${suit}` });
            } else {
                tiles.push({ id: tile });
            }
        }
    });
    return { tiles };
}

const hands = [];

// --- SECTION: 2024 ---
hands.push({
  name: '2024 - Hand 1',
  value: 25,
  variations: getPermutations(suits, 2).map(p => buildVariation([['2', 3, 's1'], ['SOAP', 3], ['2', 4, 's2'], ['4', 4, 's2']], p))
});
hands.push({
  name: '2024 - Hand 2',
  value: 25,
  variations: getPermutations(suits, 2).map(p => buildVariation([['F', 4], ['2', 4, 's1'], ['SOAP', 4], ['2', 1, 's2'], ['4', 1, 's2']], p))
});
hands.push({
  name: '2024 - Hand 3 (Like 2s)',
  value: 25,
  variations: getPermutations(suits, 3).map(p => buildVariation([['F', 2], ['2024', 1, 's1'], ['2', 4, 's2'], ['2', 4, 's3']], p))
});
hands.push({
  name: '2024 - Hand 3 (Like 4s)',
  value: 25,
  variations: getPermutations(suits, 3).map(p => buildVariation([['F', 2], ['2024', 1, 's1'], ['4', 4, 's2'], ['4', 4, 's3']], p))
});
hands.push({
  name: '2024 - Hand 4',
  value: 30,
  isConcealed: true,
  variations: suits.map(s => buildVariation([['N', 2], ['E', 3], ['2024', 1, 's1'], ['W', 3], ['S', 2]], [s]))
});

// --- SECTION: 2468 ---
hands.push({
  name: '2468 - Hand 1 (1 Suit)',
  value: 25,
  variations: suits.map(s => buildVariation([['2', 3, 's1'], ['4', 3, 's1'], ['6', 4, 's1'], ['8', 4, 's1']], [s]))
});
hands.push({
  name: '2468 - Hand 1 (2 Suits)',
  value: 25,
  variations: getPermutations(suits, 2).map(p => buildVariation([['2', 3, 's1'], ['4', 3, 's1'], ['6', 4, 's2'], ['8', 4, 's2']], p))
});
hands.push({
  name: '2468 - Hand 2',
  value: 25,
  variations: getPermutations(suits, 3).map(p => buildVariation([['2', 2, 's1'], ['4', 3, 's1'], ['4', 2, 's2'], ['6', 3, 's2'], ['8', 4, 's3']], p))
});
hands.push({
  name: '2468 - Hand 3',
  value: 25,
  variations: suits.map(s => buildVariation([['2', 2, 's1'], ['4', 2, 's1'], ['6', 3, 's1'], ['8', 3, 's1'], ['D', 4, 's1']], [s]))
});
hands.push({
  name: '2468 - Hand 4 (246)',
  value: 30,
  variations: getPermutations(suits, 3).map(p => buildVariation([['F', 4], ['4', 4, 's1'], ['6', 4, 's2'], ['2', 1, 's3'], ['4', 1, 's3']], p))
});
hands.push({
  name: '2468 - Hand 4 (468)',
  value: 30,
  variations: getPermutations(suits, 3).map(p => buildVariation([['F', 4], ['6', 4, 's1'], ['8', 4, 's2'], ['4', 1, 's3'], ['8', 1, 's3']], p))
});
hands.push({
  name: '2468 - Hand 5 (1 Suit)',
  value: 30,
  variations: suits.map(s => buildVariation([['F', 2], ['2', 4, 's1'], ['4', 2, 's1'], ['6', 2, 's1'], ['8', 4, 's1']], [s]))
});
hands.push({
  name: '2468 - Hand 5 (2 Suits)',
  value: 30,
  variations: getPermutations(suits, 2).map(p => buildVariation([['F', 2], ['2', 4, 's1'], ['4', 2, 's2'], ['6', 2, 's2'], ['8', 4, 's1']], p))
});
hands.push({
  name: '2468 - Hand 6',
  value: 35,
  isConcealed: true,
  variations: getPermutations(suits, 3).map(p => buildVariation([['F', 2], ['2', 3, 's1'], ['4', 2, 's1'], ['6', 3, 's1'], ['8', 2, 's2'], ['8', 2, 's3']], p))
});

// --- SECTION: ANY LIKE NUMBERS ---
for (let i = 1; i <= 9; i++) {
  hands.push({
    name: `Any Like Numbers - Hand 1 (${i}s)`,
    value: 25,
    variations: getPermutations(suits, 3).map(p => buildVariation([['F', 4], [i, 3, 's1'], [i, 4, 's2'], [i, 3, 's3']], p))
  });
  hands.push({
    name: `Any Like Numbers - Hand 2 (${i}s)`,
    value: 30,
    variations: getPermutations(suits, 3).map(p => buildVariation([[i, 2, 's1'], ['D', 3, 's1'], [i, 2, 's2'], ['D', 3, 's2'], [i, 4, 's3']], p))
  });
  hands.push({
    name: `Any Like Numbers - Hand 3 (${i}s)`,
    value: 30,
    variations: getPermutations(suits, 2).map(p => buildVariation([['F', 2], [i, 4, 's1'], ['NEWS', 1], [i, 3, 's2']], p))
  });
}

// --- SECTION: ADDITION HANDS ---
hands.push({
  name: 'Addition Hands (1+6=7)',
  value: 35,
  variations: suits.map(s => buildVariation([['F', 2], ['1', 4, 's1'], ['6', 4, 's1'], ['7', 4, 's1']], [s]))
});
hands.push({
  name: 'Addition Hands (2+5=7)',
  value: 35,
  variations: suits.map(s => buildVariation([['F', 2], ['2', 4, 's1'], ['5', 4, 's1'], ['7', 4, 's1']], [s]))
});
hands.push({
  name: 'Addition Hands (3+4=7)',
  value: 35,
  variations: suits.map(s => buildVariation([['F', 2], ['3', 4, 's1'], ['4', 4, 's1'], ['7', 4, 's1']], [s]))
});

// --- SECTION: QUINTS ---
for (let i = 1; i <= 7; i++) {
  hands.push({
    name: `Quints - Hand 1 (${i},${i+1},${i+2})`,
    value: 40,
    variations: suits.map(s => buildVariation([[i, 5, 's1'], [i + 1, 2, 's1'], [i + 2, 5, 's1']], [s]))
  });
}
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    if (i === j) continue;
    for (const wind of winds) { 
        hands.push({
            name: `Quints - Hand 2 (${i}s, ${j}s, ${wind}s)`,
            value: 40,
            variations: getPermutations(suits, 2).map(p => buildVariation([[i, 5, 's1'], [wind, 4], [j, 5, 's2']], p))
        });
    }
  }
}
for (let i = 1; i <= 8; i++) {
  hands.push({
    name: `Quints - Hand 3 (${i},${i+1})`,
    value: 45,
    variations: getPermutations(suits, 2).map(p => buildVariation([[i, 2, 's1'], [i + 1, 5, 's1'], [i, 2, 's2'], [i + 1, 5, 's2']], p))
  });
}
for (let i = 1; i <= 9; i++) {
  hands.push({
    name: `Quints - Hand 4 (${i}s)`,
    value: 45,
    variations: getPermutations(suits, 2).map(p => buildVariation([['F', 4], ['D', 4, 's1'], [i, 5, 's2']], p))
  });
}

// --- SECTION: CONSECUTIVE RUNS ---
hands.push({
    name: 'Consecutive Run - Hand 1 (1-5)',
    value: 25,
    variations: suits.map(s => buildVariation([['1',3,'s1'],['2',2,'s1'],['3',4,'s1'],['4',2,'s1'],['5',3,'s1']], [s]))
});
hands.push({
    name: 'Consecutive Run - Hand 1 (5-9)',
    value: 25,
    variations: suits.map(s => buildVariation([['5',3,'s1'],['6',2,'s1'],['7',4,'s1'],['8',2,'s1'],['9',3,'s1']], [s]))
});
for(let i = 1; i <= 6; i++) {
    const handName = `Consecutive Run - Hand 2 (${i}-${i+3})`;
    const variations = [];
    suits.forEach(suit1 => {
        const oppositeDragonSuits = suits.filter(s => s !== suit1);
        oppositeDragonSuits.forEach(suit2 => {
            const pattern = [[i,2,'s1'],[i+1,3,'s1'],['OD',4,dragons[suit2]],[i+2,3,'s1'],[i+3,2,'s1']];
            variations.push(buildVariation(pattern, [suit1]));
        });
    });
    hands.push({ name: handName, value: 25, variations });
}
for (let i = 1; i <= 7; i++) {
    hands.push({
        name: `Consecutive Run - Hand 3 (${i}-${i+2}, 1 Suit)`,
        value: 25,
        variations: suits.map(s => buildVariation([['F',2],[i,4,'s1'],[i+1,4,'s1'],[i+2,4,'s1']], [s]))
    });
    hands.push({
        name: `Consecutive Run - Hand 3 (${i}-${i+2}, 3 Suits)`,
        value: 25,
        variations: getPermutations(suits, 3).map(p => buildVariation([['F',2],[i,4,'s1'],[i+1,4,'s2'],[i+2,4,'s3']],p))
    });
}
for (let i = 1; i <= 7; i++) {
    hands.push({
        name: `Consecutive Run - Hand 4 (${i}-${i+2})`,
        value: 25,
        variations: getPermutations(suits, 2).map(p => buildVariation([[i,1,'s1'],[i+1,2,'s1'],[i+2,4,'s1'],[i,1,'s2'],[i+1,2,'s2'],[i+2,4,'s2']], p))
    });
}
for (let i = 1; i <= 6; i++) {
    hands.push({
        name: `Consecutive Run - Hand 5 (${i}-${i+3})`,
        value: 30,
        variations: suits.map(s => buildVariation([[i,2,'s1'],[i+1,2,'s1'],[i+2,3,'s1'],[i+3,3,'s1'],['D',4,'s1']], [s]))
    });
}
for (let i = 1; i <= 6; i++) {
    hands.push({
        name: `Consecutive Run - Hand 6 (${i}-${i+3})`,
        value: 30,
        variations: getPermutations(suits,3).map(p => buildVariation([['F',4],[i,1,'s1'],[i+1,1,'s1'],[i+2,1,'s1'],[i+3,3,'s2'],[i+3,3,'s3']],p))
    });
}
for(let i = 1; i <= 6; i++) {
    hands.push({
        name: `Consecutive Run - Hand 7 (${i}-${i+3}, 1 Suit)`,
        value: 30,
        variations: suits.map(s => buildVariation([[i,3,'s1'],[i+1,3,'s1'],[i+2,4,'s1'],[i+3,4,'s1']], [s]))
    });
    hands.push({
        name: `Consecutive Run - Hand 7 (${i}-${i+3}, 2 Suits)`,
        value: 30,
        variations: getPermutations(suits, 2).map(p => buildVariation([[i,3,'s1'],[i+1,3,'s1'],[i+2,4,'s2'],[i+3,4,'s2']],p))
    });
}
hands.push({
    name: `Consecutive Run - Hand 8`,
    value: 30,
    isConcealed: true,
    variations: getPermutations(suits,3).map(p => buildVariation([['1',3,'s1'],['2',3,'s1'],['1',3,'s2'],['2',3,'s2'],['3',2,'s3']],p))
});

// --- SECTION: 13579 ---
hands.push({
  name: '13579 - Hand 1 (1 or 3 Suits)',
  value: 25,
  variations: [
      ...suits.map(s => buildVariation([['1',3,'s1'],['3',2,'s1'],['5',4,'s1'],['7',2,'s1'],['9',3,'s1']], [s])),
      ...getPermutations(suits,3).map(p => buildVariation([['1',3,'s1'],['3',2,'s1'],['5',4,'s2'],['7',2,'s3'],['9',3,'s3']],p))
  ]
});
hands.push({
  name: '13579 - Hand 2 (1&3 or 5&7)',
  value: 25,
  variations: [
      ...getPermutations(suits,2).map(p => buildVariation([['1',3,'s1'],['3',3,'s1'],['3',4,'s2'],['5',4,'s2']],p)),
      ...getPermutations(suits,2).map(p => buildVariation([['5',3,'s1'],['7',3,'s1'],['7',4,'s2'],['9',4,'s2']],p))
  ]
});
hands.push({
  name: '13579 - Hand 3 (1,3,5 or 5,7,9)',
  value: 30,
  variations: [
      ...suits.map(s => buildVariation([['F',2],['1',2,'s1'],['3',3,'s1'],['5',4,'s1'],['D',3,'s1']], [s])),
      ...suits.map(s => buildVariation([['F',2],['5',2,'s1'],['7',3,'s1'],['9',4,'s1'],['D',3,'s1']], [s]))
  ]
});
hands.push({
  name: '13579 - Hand 4',
  value: 30,
  variations: getPermutations(suits,3).map(p => buildVariation([['1',2,'s1'],['3',2,'s1'],['5',2,'s1'],['7',4,'s2'],['9',4,'s3']],p))
});
hands.push({
  name: '13579 - Hand 5 (3,5,1 or 5,7,3)',
  value: 30,
  variations: [
      ...getPermutations(suits,3).map(p => buildVariation([['F',4],['3',4,'s1'],['5',4,'s2'],['1',1,'s3'],['5',1,'s3']],p)),
      ...getPermutations(suits,3).map(p => buildVariation([['F',4],['5',4,'s1'],['7',4,'s2'],['3',1,'s3'],['5',1,'s3']],p))
  ]
});
hands.push({
  name: '13579 - Hand 6 (1,3,5 or 5,7,9)',
  value: 35,
  variations: [
      ...getPermutations(suits,3).map(p => buildVariation([['1',2,'s1'],['3',2,'s1'],['3',3,'s2'],['5',3,'s2'],['D',4,'s3']],p)),
      ...getPermutations(suits,3).map(p => buildVariation([['5',2,'s1'],['7',2,'s1'],['7',3,'s2'],['9',3,'s2'],['D',4,'s3']],p))
  ]
});
hands.push({
  name: '13579 - Hand 7',
  value: 35,
  isConcealed: true,
  variations: [
      ...getPermutations(suits,3).map(p => buildVariation([['1',3,'s1'],['3',2,'s1'],['5',3,'s1'],['3',3,'s2'],['3',3,'s3']],p)),
      ...getPermutations(suits,3).map(p => buildVariation([['5',3,'s1'],['7',2,'s1'],['9',3,'s1'],['7',3,'s2'],['7',3,'s3']],p))
  ]
});

// --- SECTION: WINDS-DRAGONS ---
hands.push({ 
    name: 'Winds-Dragons - Hand 1', 
    value: 25,
    variations: [
        buildVariation([['N',4],['E',3],['W',3],['S',4]],[]),
        buildVariation([['N',3],['E',4],['W',4],['S',3]],[])
    ] 
});
hands.push({
  name: 'Winds-Dragons - Hand 2',
  value: 25,
  variations: [buildVariation([['F',4],['GD',3],['RD',4],['WD',3]],[])]
});
for(let i = 1; i <= 8; i++) {
  hands.push({
    name: `Winds-Dragons - Hand 3 (N/S or E/W, ${i},${i+1})`,
    value: 30,
    variations: [
        ...getPermutations(suits,2).map(p => buildVariation([['N',3],['S',3],[i,4,'s1'],[i+1,4,'s2']],p)),
        ...getPermutations(suits,2).map(p => buildVariation([['E',3],['W',3],[i,4,'s1'],[i+1,4,'s2']],p))
    ]
  });
}
hands.push({
  name: 'Winds-Dragons - Hand 4',
  value: 30,
  variations: [buildVariation([['F',2],['N',2],['E',3],['W',3],['S',4]],[])]
});
for(let i = 1; i <= 7; i++) {
  hands.push({
    name: `Winds-Dragons - Hand 5 (N/S or E/W, ${i}-${i+2})`,
    value: 35,
    variations: [
        ...suits.map(s => buildVariation([['N',4],[i,2,'s1'],[i+1,2,'s1'],[i+2,2,'s1'],['S',4]], [s])),
        ...suits.map(s => buildVariation([['E',4],[i,2,'s1'],[i+1,2,'s1'],[i+2,2,'s1'],['W',4]], [s]))
    ]
  });
}
hands.push({
  name: 'Winds-Dragons - Hand 6',
  value: 35,
  variations: getPermutations(['GD','RD','WD'],2).map(p => buildVariation([['F',2],[p[0],4],[ 'NEWS', 1],[p[1],4]],[]))
});
hands.push({
  name: `Winds-Dragons - Hand 7`,
  value: 30,
  isConcealed: true,
  variations: getPermutations(suits,2).map(p => buildVariation([['N',3],['E',1],['W',1],['S',3],['1',3,'s1'],['1',3,'s2']],p))
});

// --- SECTION: 369 ---
hands.push({
  name: '369 - Hand 1',
  value: 25,
  variations: getPermutations(suits,3).map(p => buildVariation([['3',3,'s1'],['6',3,'s1'],['6',4,'s2'],['9',4,'s3']],p))
});
hands.push({
  name: '369 - Hand 2',
  value: 30,
  variations: getPermutations(suits,3).map(p => buildVariation([['F',2],['3',1,'s1'],['6',2,'s1'],['9',3,'s1'],['3',3,'s2'],['3',3,'s3']],p))
});
hands.push({
  name: '369 - Hand 3 (1 or 3 Suits)',
  value: 30,
  variations: [
      ...suits.map(s => buildVariation([['F',2],['3',4,'s1'],['6',4,'s1'],['9',4,'s1']], [s])),
      ...getPermutations(suits,3).map(p => buildVariation([['F',2],['3',4,'s1'],['6',4,'s2'],['9',4,'s3']],p))
  ]
});
[3,6,9].forEach(n => {
  hands.push({
    name: `369 - Hand 4 (Pung ${n}s)`,
    value: 35,
    variations: getPermutations(suits,2).map(p => buildVariation([[n,3,'s1'],['D',4,'s1'],[n,3,'s2'],['D',4,'s2']],p))
  });
});
hands.push({
  name: '369 - Hand 5',
  value: 35,
  variations: getPermutations(suits,3).map(p => buildVariation([['3',4,'s1'],['6',2,'s2'],['6',2,'s1'],['6',2,'s3'],['9',4,'s1']],p))
});
hands.push({
  name: '369 - Hand 6',
  value: 35,
  variations: getPermutations(suits,2).map(p => buildVariation([['F',4],['3',2,'s1'],['6',2,'s1'],['9',3,'s1'],['OD',3, dragons[p[1]]]],p))
});
hands.push({
  name: '369 - Hand 7',
  value: 30,
  isConcealed: true,
  variations: getPermutations(suits,3).map(p => buildVariation([['3',3,'s1'],['6',3,'s1'],['3',3,'s2'],['6',3,'s2'],['9',2,'s3']],p))
});

// --- SECTION: SINGLES AND PAIRS ---
hands.push({
  name: 'Singles/Pairs - Hand 1',
  value: 50,
  isConcealed: true,
  variations: getPermutations(suits,2).map(p => buildVariation([['F',2],['2',2,'s1'],['4',1,'s1'],['6',1,'s1'],['8',2,'s1'],['2',2,'s2'],['4',1,'s2'],['6',1,'s2'],['8',2,'s2']],p))
});
hands.push({
  name: 'Singles/Pairs - Hand 2',
  value: 50,
  isConcealed: true,
  variations: getPermutations(suits,2).map(p => buildVariation([['F',2],['1',2,'s1'],['3',2,'s1'],['5',2,'s1'],['5',2,'s2'],['7',2,'s2'],['9',2,'s2']],p))
});
hands.push({
  name: 'Singles/Pairs - Hand 3 (1,2,3 or 9,8,7)',
  value: 50,
  isConcealed: true,
  variations: [
      ...getPermutations(suits,3).map(p => buildVariation([['1',2,'s1'],['1',2,'s2'],['1',2,'s3'],['2',1,'s1'],['2',2,'s2'],['2',2,'s3'],['3',1,'s2'],['3',2,'s3']],p)),
      ...getPermutations(suits,3).map(p => buildVariation([['9',2,'s1'],['9',2,'s2'],['9',2,'s3'],['8',1,'s1'],['8',2,'s2'],['8',2,'s3'],['7',1,'s2'],['7',2,'s3']],p))
  ]
});
hands.push({
  name: 'Singles/Pairs - Hand 4',
  value: 50,
  isConcealed: true,
  variations: getPermutations(suits,3).map(p => buildVariation([['F',2],['3',2,'s1'],['6',2,'s1'],['9',2,'s1'],['3',1,'s2'],['6',1,'s2'],['9',1,'s2'],['3',1,'s3'],['6',1,'s3'],['9',1,'s3']],p))
});
const dragonPairs = [['RD', 'WD'], ['GD', 'WD'], ['GD', 'RD']];
for (let i = 1; i <= 5; i++) {
    suits.forEach((suit, suitIndex) => {
        const opposingDragons = dragonPairs[suitIndex];
        const pattern = [
            [i, 2, 's1'], [i + 1, 2, 's1'], [i + 2, 2, 's1'], [i + 3, 2, 's1'], [i + 4, 2, 's1'],
            [opposingDragons[0], 2],
            [opposingDragons[1], 2]
        ];
        hands.push({
            name: `Singles/Pairs - Hand 5 (${i}-${i+4} in ${suit})`,
            value: 50,
            isConcealed: true,
            variations: [buildVariation(pattern, [suit])]
        });
    });
}
hands.push({
  name: 'Singles/Pairs - Hand 6',
  value: 75,
  isConcealed: true,
  variations: getPermutations(suits,2).map(p => buildVariation([['2024',1,'s1'],['N',2],['E',1],['W',1],['S',2],['2024',1,'s2']], p))
});

export default hands;
