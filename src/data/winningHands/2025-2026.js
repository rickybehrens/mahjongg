// src/data/winningHands/2025-2026.js

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

        if (tile === 'NEWS') {
            ['N', 'E', 'W', 'S'].forEach(t => tiles.push({ id: t }));
            return;
        }
        if (tile === '2025') {
            ['2', 'SOAP', '2', '5'].forEach(t => {
                tiles.push({ id: t === 'SOAP' ? 'SOAP' : `${t}${suit}` })
            });
            return;
        }
        if (String(tile).length > 1 && /^[1-9]+$/.test(String(tile))) {
            for (const char of String(tile)) {
                tiles.push({ id: `${char}${suit}`});
            }
            return;
        }
        
        for (let i = 0; i < count; i++) {
            if (tile === 'D') {
                // Correctly handle White Dragon as SOAP for consistency
                const dragonId = dragons[suit];
                tiles.push({ id: dragonId === 'WD' ? 'SOAP' : dragonId });
            } else if (tile === 'OD') {
                const dragonId = suitKey;
                tiles.push({ id: dragonId === 'WD' ? 'SOAP' : dragonId });
            } else if (suit) {
                tiles.push({ id: `${tile}${suit}` });
            } else {
                 // Also handle standalone dragons here
                const tileId = tile === 'WD' ? 'SOAP' : tile;
                tiles.push({ id: tileId });
            }
        }
    });
    return { tiles };
}

// --- HELPER FUNCTIONS for generating complex variations ---
function generatePartitions(itemCount, suitCount) {
    const results = [];
    const placeholders = Array.from({ length: suitCount }, (_, i) => `s${i + 1}`);
    
    function find(index, current) {
        if (index === itemCount) {
            if (new Set(current).size === suitCount) {
                results.push(current);
            }
            return;
        }
        for (const p of placeholders) {
            find(index + 1, [...current, p]);
        }
    }
    find(0, []);
    return results;
}

const hands = [];

// --- SECTION: 2025 ---
['2','5'].forEach(n => {
    hands.push({
        name: `2025 - Hand 1 (Pung ${n}s)`,
        value: 25,
        variations: getPermutations(suits, 3).map(p => buildVariation([['F', 4], ['2025', 1, 's1'], [n, 3, 's2'], [n, 3, 's3']], p))
    });
});
hands.push({
  name: '2025 - Hand 2',
  value: 25,
  variations: getPermutations(suits, 2).map(p => buildVariation([['2', 3, 's1'], ['SOAP', 4], ['2', 3, 's2'], ['5', 4, 's2']], p))
});
hands.push({
  name: '2025 - Hand 3',
  value: 25,
  variations: getPermutations(suits, 3).map(p => buildVariation([['2025', 1, 's1'], ['2', 3, 's2'], ['5', 3, 's2'], ['D', 4, 's3']], p))
});
hands.push({
  name: '2025 - Hand 4',
  value: 30,
  isConcealed: true,
  variations: getPermutations(suits, 3).map(p => buildVariation([['F', 2], ['2', 3, 's1'], ['SOAP', 3], ['2', 3, 's2'], ['5', 3, 's3']], p))
});

// --- SECTION: 2468 ---
hands.push({
  name: '2468 - Hand 1 (1 or 2 Suits)',
  value: 25,
  variations: [
      // 1-Suit Variation
      ...suits.map(s => buildVariation([['2', 3, 's1'], ['4', 4, 's1'], ['6', 3, 's1'], ['8', 4, 's1']], [s])),
      // 2-Suit Variations (Explicitly define the two valid partitions from the card)
      ...getPermutations(suits, 2).map(p => buildVariation([['2', 3, 's1'], ['4', 4, 's1'], ['6', 3, 's2'], ['8', 4, 's2']], p))
  ]
});
hands.push({
  name: '2468 - Hand 2',
  value: 25,
  variations: [
      // Explicitly define the two "or" conditions from the card
      ...getPermutations(suits, 3).map(p => buildVariation([['F', 2], ['2', 4, 's1'], ['4', 4, 's2'], ['6', 4, 's3']], p)),
      ...getPermutations(suits, 3).map(p => buildVariation([['F', 2], ['2', 4, 's1'], ['6', 4, 's2'], ['8', 4, 's3']], p))
  ]
});
hands.push({
  name: '2468 - Hand 3',
  value: 25,
  variations: suits.map(s => buildVariation([['2', 2, 's1'], ['4', 3, 's1'], ['6', 2, 's1'], ['8', 3, 's1'], ['D', 4, 's1']], [s]))
});
['2','4','6','8'].forEach(n => {
    hands.push({
        name: `2468 - Hand 4 (Pung ${n}s)`,
        value: 25,
        variations: getPermutations(suits, 3).map(p => buildVariation([['F', 4], ['2468', 1, 's1'], [n, 3, 's2'], [n, 3, 's3']], p))
    });
});
hands.push({
  name: '2468 - Hand 5',
  value: 25,
  variations: suits.map(s => buildVariation([['F', 3], ['2', 2, 's1'], ['4', 2, 's1'], ['6', 3, 's1'], ['8', 4, 's1']], [s]))
});
hands.push({
  name: '2468 - Hand 6',
  value: 25,
  variations: getPermutations(suits, 3).map(p => buildVariation([['2', 3, 's1'], ['4', 4, 's1'], ['6', 3, 's1'], ['8', 2, 's2'], ['8', 2, 's3']], p))
});
['2','4','6','8'].forEach(n => {
    const variations = [];
    const dragonSuitKeys = ['B', 'C', 'D']; // Representing Green, Red, White Dragons
    const numberSuits = ['B', 'C', 'D'];    // Representing Bams, Cracks, Dots

    // 1. Iterate through each of the 3 possible Dragon suits.
    dragonSuitKeys.forEach(dragonKey => {
        // 2. Iterate through each of the 3 unique combinations of 2 Number suits.
        //    (e.g., Bams/Cracks, Bams/Dots, Cracks/Dots)
        for (let i = 0; i < numberSuits.length; i++) {
            for (let j = i + 1; j < numberSuits.length; j++) {
                const numSuit1 = numberSuits[i];
                const numSuit2 = numberSuits[j];

                // Define the pattern for the three kongs (Number, Dragon, Number).
                const pattern = [['F', 2], [n, 4, 's1'], ['D', 4, 's2'], [n, 4, 's3']];
                
                // Create the specific suit permutation for this unique hand.
                const p = [numSuit1, dragonKey, numSuit2];
                
                // Build the variation and add it to our list.
                variations.push(buildVariation(pattern, p));
            }
        }
    });

    hands.push({
        name: `2468 - Hand 7 (Kong ${n}s)`,
        value: 25,
        variations: variations // This will now contain the 9 correct variations for the number 'n'
    });
});
['2','4','6','8'].forEach(n => {
    hands.push({
        name: `2468 - Hand 8 (Pung ${n}s)`,
        value: 30,
        isConcealed: true,
        variations: getPermutations(suits, 3).map(p => buildVariation([['2', 2, 's1'], ['4', 2, 's1'], ['6', 2, 's1'], ['8', 2, 's1'], [n, 3, 's2'], [n, 3, 's3']], p))
    });
});

// --- SECTION: ANY LIKE NUMBERS ---
for (let i = 1; i <= 9; i++) {
    hands.push({
        name: `Any Like Numbers - Hand 1 (${i}s)`,
        value: 25,
        variations: getPermutations(suits, 3).map(p => buildVariation([['F', 2], [String(i), 4, 's1'], ['D', 1, 's1'], [String(i), 4, 's2'], ['D', 1, 's2'], [String(i), 2, 's3']], p))
    });
    hands.push({
        name: `Any Like Numbers - Hand 2 (${i}s)`,
        value: 30,
        variations: getPermutations(suits, 3).map(p => {
            const suit1 = p[0];
            const otherSuits = p.slice(1);
            return buildVariation([['F', 4], [String(i), 2, suit1], [String(i), 3, otherSuits[0]], [String(i), 3, otherSuits[1]], [String(i), 2, suit1]], p);
        })
    });
    ['GD','RD','WD'].forEach(d => {
        hands.push({
            name: `Any Like Numbers - Hand 3 (${i}s, ${d})`,
            value: 30,
            isConcealed: true,
            variations: getPermutations(suits, 3).map(p => buildVariation([['F', 2], [String(i), 3, 's1'], [String(i), 3, 's2'], [String(i), 3, 's3'], [d, 3]], p))
        });
    });
}

// --- SECTION: QUINTS ---
for (let i = 1; i <= 7; i++) {
    hands.push({
        name: `Quints - Hand 1 (${i}-${i+2})`,
        value: 40,
        variations: getPermutations(suits, 3).map(p => buildVariation([['F', 2], [String(i), 3, 's1'], [String(i+1), 4, 's2'], [String(i+2), 5, 's3']], p))
    });
}
for (let i = 1; i <= 8; i++) {
    winds.forEach(w => {
        hands.push({
            name: `Quints - Hand 2 (${i},${i+1},${w})`,
            value: 40,
            variations: suits.map(s => buildVariation([[String(i), 5, 's1'], [w, 4], [String(i+1), 5, 's1']], [s]))
        });
    });
}
for (let i = 1; i <= 9; i++) {
    hands.push({
        name: `Quints - Hand 3 (${i}s)`,
        value: 45,
        variations: getPermutations(suits, 3).map(p => buildVariation([['F', 2], [String(i), 5, 's1'], [String(i), 2, 's2'], [String(i), 5, 's3']], p))
    });
}

// --- SECTION: CONSECUTIVE RUNS ---
hands.push({
    name: 'Consecutive Run - Hand 1 (1-5 or 5-9)',
    value: 25,
    variations: [
        ...suits.map(s => buildVariation([['1',2,'s1'],['2',3,'s1'],['3',4,'s1'],['4',3,'s1'],['5',2,'s1']], [s])),
        ...suits.map(s => buildVariation([['5',2,'s1'],['6',3,'s1'],['7',4,'s1'],['8',3,'s1'],['9',2,'s1']], [s]))
    ]
});

// Corrected Hand #2
for (let i = 1; i <= 6; i++) {
    const numberGroups = [[String(i), 3], [String(i + 1), 4], [String(i + 2), 3], [String(i + 3), 4]];
    const twoSuitPartitions = [
        [['s1'], ['s1'], ['s2'], ['s2']], // Partition type (2,2)
    ];
    const twoSuitPatterns = twoSuitPartitions.map(partition => 
        numberGroups.map((group, index) => [...group, partition[index]])
    );
    hands.push({
        name: `Consecutive Run - Hand 2 (${i}-${i+3}, 1 or 2 Suits)`,
        value: 25,
        variations: [
            ...suits.map(s => buildVariation([[String(i), 3, 's1'], [String(i + 1), 4, 's1'], [String(i + 2), 3, 's1'], [String(i + 3), 4, 's1']], [s])),
            ...twoSuitPatterns.flatMap(pattern => getPermutations(suits, 2).map(p => buildVariation(pattern, p)))
        ]
    });
}

for (let i = 1; i <= 7; i++) {
    hands.push({
        name: `Consecutive Run - Hand 3 (${i}-${i+2}, 1 or 3 Suits)`,
        value: 25,
        variations: [
            ...suits.map(s => buildVariation([['F',4],[String(i),4,'s1'],[String(i+1),2,'s1'],[String(i+2),4,'s1']], [s])),
            ...getPermutations(suits, 3).map(p => buildVariation([['F',4],[String(i),4,'s1'],[String(i+1),2,'s2'],[String(i+2),4,'s3']], p))
        ]
    });
}

for (let i = 1; i <= 5; i++) {
    hands.push({
        name: `Consecutive Run - Hand 4 (${i}-${i+4})`,
        value: 25,
        variations: getPermutations(suits, 3).map(p => buildVariation([['F',3],[`${i}${i+1}${i+2}`,1,'s1'],[String(i+3),4,'s2'],[String(i+4),4,'s3']], p))
    });
}

for (let i = 1; i <= 7; i++) {
    hands.push({
        name: `Consecutive Run - Hand 5 (${i}-${i+2})`,
        value: 25,
        variations: suits.map(s => buildVariation([['F',2],[String(i),2,'s1'],[String(i+1),3,'s1'],[String(i+2),4,'s1'],['D',3,'s1']], [s]))
    });
}

for (let i = 1; i <= 7; i++) {
    const handName = `Consecutive Run - Hand 6 (${i}-${i+2})`;
    const variations = [];
    suits.forEach(suit1 => {
        const oppositeDragonSuits = suits.filter(s => s !== suit1);
        const dragonPerms = getPermutations(oppositeDragonSuits, 2);
        dragonPerms.forEach(dPerm => {
            const pattern = [
                [String(i), 3, 's1'],
                [String(i + 1), 3, 's1'],
                [String(i + 2), 4, 's1'],
                ['OD', 2, dragons[dPerm[0]]],
                ['OD', 2, dragons[dPerm[1]]]
            ];
            variations.push(buildVariation(pattern, [suit1]));
        });
    });
    hands.push({ name: handName, value: 25, variations });
}

for (let i = 1; i <= 5; i++) {
    for (let j = i; j <= i + 4; j++) {
        const runSingles = [];
        for (let k = i; k <= i + 4; k++) {
            if (k !== j) {
                runSingles.push(k);
            }
        }
        const handName = `Consecutive Run - Hand 7 (${i}-${i+4} pair ${j}s)`;
        const variations = [];
        const suitPerms = getPermutations(suits, 3);
        suitPerms.forEach(p => {
            let pattern = [
                [String(j), 2, 's1'],
                ...runSingles.map(n => [String(n), 1, 's1']),
                [String(j), 4, 's2'],
                [String(j), 4, 's3'],
            ];
            const runPart = pattern.filter(part => part[2] === 's1');
            const otherPart = pattern.filter(part => part[2] !== 's1');
            runPart.sort((a, b) => a[0] - b[0]);
            pattern = [...runPart, ...otherPart];
            variations.push(buildVariation(pattern, p));
        });
        hands.push({ name: handName, value: 30, variations });
    }
}

for (let i = 1; i <= 7; i++) {
    hands.push({
        name: `Consecutive Run - Hand 8 (${i}-${i+2})`,
        value: 30,
        isConcealed: true,
        variations: getPermutations(suits, 2).map(p => buildVariation([['F',2],[String(i),1,'s1'],[String(i+1),2,'s1'],[String(i+2),3,'s1'],[String(i),1,'s2'],[String(i+1),2,'s2'],[String(i+2),3,'s2']], p))
    });
}

// --- SECTION: 13579 ---
const fiveGroupPartitions = generatePartitions(5, 3);
const fiveGroupNumbers = [['1', 2], ['3', 3], ['5', 4], ['7', 3], ['9', 2]];
const threeSuitPatternsFor13579 = fiveGroupPartitions.map(partition => 
    fiveGroupNumbers.map((group, i) => [...group, partition[i]])
);

hands.push({
    name: '13579 - Hand 1 (1 or 3 Suits)',
    value: 25,
    isConcealed: false,
    variations: [
        ...suits.map(s => buildVariation([['1', 2, 's1'], ['3', 3, 's1'], ['5', 4, 's1'], ['7', 3, 's1'], ['9', 2, 's1']], [s])),
        ...threeSuitPatternsFor13579.flatMap(pattern => 
            getPermutations(suits, 3).map(p => buildVariation(pattern, p))
        )
    ]
});
hands.push({
  name: '13579 - Hand 2 (1&3 or 5&7)',
  value: 25,
  variations: [
      ...getPermutations(suits, 2).map(p => buildVariation([['1',3,'s1'],['3',4,'s1'],['3',3,'s2'],['5',4,'s2']], p)),
      ...getPermutations(suits, 2).map(p => buildVariation([['5',3,'s1'],['7',4,'s1'],['7',3,'s2'],['9',4,'s2']], p))
  ]
});
[1,5].forEach(n => {
    hands.push({
        name: `13579 - Hand 3 (${n},${n+2},${n+4})`,
        value: 25,
        variations: suits.map(s => buildVariation([[String(n),4,'s1'],[String(n+2),3,'s1'],[String(n+4),4,'s1'],['D',3,'s1']], [s]))
    });
});
hands.push({
  name: '13579 - Hand 4',
  value: 25,
  variations: getPermutations(suits, 2).map(p => buildVariation([['F',4],['1',4,'s1'],['9',4,'s1'],['1',1,'s2'],['SOAP',1]], p))
});
hands.push({
  name: '13579 - Hand 5 (1,3,5 or 5,7,9)',
  value: 25,
  variations: [
      ...suits.map(s => buildVariation([['F',3],['135',1,'s1'],['7',4,'s1'],['9',4,'s1']], [s])),
      ...suits.map(s => buildVariation([['F',3],['579',1,'s1'],['1',4,'s1'],['3',4,'s1']], [s])),
      ...getPermutations(suits, 3).map(p => buildVariation([['F',3],['135',1,'s1'],['7',4,'s2'],['9',4,'s3']], p)),
      ...getPermutations(suits, 3).map(p => buildVariation([['F',3],['579',1,'s1'],['1',4,'s2'],['3',4,'s3']], p))
  ]
});
[1,5].forEach(n => {
    const handName = `13579 - Hand 6 (${n},${n+2},${n+4})`;
    const variations = [];
    suits.forEach(suit1 => {
        const oppositeDragonSuits = suits.filter(s => s !== suit1);
        const dragonPerms = getPermutations(oppositeDragonSuits, 2);
        dragonPerms.forEach(dPerm => {
            const pattern = [
                [String(n), 3, 's1'],
                [String(n + 2), 3, 's1'],
                [String(n + 4), 4, 's1'],
                ['OD', 2, dragons[dPerm[0]]],
                ['OD', 2, dragons[dPerm[1]]]
            ];
            variations.push(buildVariation(pattern, [suit1]));
        });
    });
    hands.push({ name: handName, value: 25, variations });
});
[1,5].forEach(n => {
    hands.push({
        name: `13579 - Hand 7 (${n},${n+2})`,
        value: 30,
        variations: getPermutations(suits, 2).map(p => buildVariation([[String(n),2,'s1'],[String(n+2),3,'s1'],['NEWS',1],[String(n+2),3,'s2'],[String(n+4),2,'s2']], p))
    });
});
hands.push({
  name: '13579 - Hand 8',
  value: 30,
  variations: getPermutations(suits, 2).map(p => buildVariation([['1',4,'s1'],['3',2,'s2'],['5',2,'s2'],['7',2,'s2'],['9',4,'s1']], p))
});
[1,5].forEach(n => {
    hands.push({
        name: `13579 - Hand 9 (${n},${n+2})`,
        value: 30,
        isConcealed: true,
        variations: getPermutations(suits, 3).map(p => buildVariation([['F',2],[String(n),2,'s1'],[String(n+2),2,'s1'],[String(n),3,'s2'],[String(n+2),3,'s2'],[String(n*2+1),2,'s3']], p))
    });
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

// Corrected Winds-Dragons - Hand 2
for (let i = 1; i <= 7; i++) {
    hands.push({
        name: `Winds-Dragons - Hand 2 (${i}-${i+2})`,
        value: 25,
        variations: suits.map(s => buildVariation([
            ['F', 2],
            [String(i), 1, 's1'],
            [String(i+1), 1, 's1'],
            [String(i+2), 1, 's1'],
            ['GD', 2],
            ['RD', 3],
            ['WD', 4]
        ], [s]))
    });
}

hands.push({
  name: 'Winds-Dragons - Hand 3',
  value: 25,
  variations: [buildVariation([['F',3],['N',2],['E',2],['W',3],['S',4]],[])]
});

hands.push({
  name: 'Winds-Dragons - Hand 4',
  value: 25,
  variations: getPermutations(['GD','RD','WD'], 2).map(p => buildVariation([['F',4],[p[0],3],['NEWS',1],[p[1],3]],[]))
});

[1,3,5,7,9].forEach(n => {
    hands.push({
        name: `Winds-Dragons - Hand 5 (Odd ${n}s)`,
        value: 25,
        variations: getPermutations(suits, 3).map(p => buildVariation([['N',4],[String(n),1,'s1'],[String(n),2,'s2'],[String(n),3,'s3'],['S',4]], p))
    });
});

[2,4,6,8].forEach(n => {
    hands.push({
        name: `Winds-Dragons - Hand 6 (Even ${n}s)`,
        value: 25,
        variations: getPermutations(suits, 3).map(p => buildVariation([['E',4],[String(n),1,'s1'],[String(n),2,'s2'],[String(n),3,'s3'],['W',4]], p))
    });
});

hands.push({
  name: 'Winds-Dragons - Hand 7',
  value: 30,
  variations: [
      ...suits.map(s => buildVariation([['N',2],['E',3],['W',3],['S',2],['2025',1,'s1']], [s])),
      ...suits.map(s => buildVariation([['N',3],['E',2],['W',2],['S',3],['2025',1,'s1']], [s]))
  ]
});

hands.push({
  name: 'Winds-Dragons - Hand 8',
  value: 30,
  isConcealed: true,
  variations: [['GD','RD','WD']].map(d => buildVariation([['N',2],['E',2],['W',3],['S',3],[d[0],4]],[]))
});

// --- SECTION: 369 ---
hands.push({
  name: '369 - Hand 1 (2 or 3 Suits)',
  value: 25,
  variations: [
      // 2-Suit Variations (Pung 3s & Kong 6s in one suit, Pung 6s & Kong 9s in another)
      ...getPermutations(suits, 2).map(p => buildVariation([
          ['3',3,'s1'],['6',4,'s1'],['6',3,'s2'],['9',4,'s2']
      ], p)),
      // 3-Suit Variations (Pung 3s & Kong 6s in one suit, Pung 6s in second, Kong 9s in third)
      ...getPermutations(suits, 3).map(p => buildVariation([
          ['3',3,'s1'],['6',4,'s1'],['6',3,'s2'],['9',4,'s3']
      ], p))
  ]
});
hands.push({
  name: '369 - Hand 2 (1 or 3 Suits)',
  value: 25,
  variations: [
      ...suits.map(s => buildVariation([['F',2],['3',4,'s1'],['6',4,'s1'],['9',4,'s1']], [s])),
      ...getPermutations(suits, 3).map(p => buildVariation([['F',2],['3',4,'s1'],['6',4,'s2'],['9',4,'s3']], p))
  ]
});
[3,6,9].forEach(n => {
    hands.push({
        name: `369 - Hand 3 (Kong ${n}s)`,
        value: 25,
        variations: getPermutations(suits, 2).map(p => buildVariation([[String(n),4,'s1'],['D',3,'s1'],[String(n),4,'s2'],['D',3,'s2']], p))
    });
});
hands.push({
  name: '369 - Hand 4',
  value: 25,
  variations: getPermutations(suits, 2).map(p => buildVariation([['F',3],['3',4,'s1'],['369',1,'s2'],['9',4,'s1']], p))
});
[3,6,9].forEach(n => {
    hands.push({
        name: `369 - Hand 5 (Kong ${n}s)`,
        value: 25,
        variations: getPermutations(suits, 3).map(p => buildVariation([
            ['3',2,'s1'],['6',2,'s1'],['9',2,'s1'],[String(n),4,'s2'],[String(n),4,'s3']
        ], p))
    });
});
hands.push({
    name: `369 - Hand 6 (Matching Dragons)`,
    value: 30,
    isConcealed: true,
    variations: getPermutations(suits, 3).map(p => buildVariation([
        ['F',2],['3',3,'s1'],['D',1,'s1'],['6',3,'s2'],['D',1,'s2'],['9',3,'s3'],['D',1,'s3']
    ], p))
});

// --- SECTION: SINGLES AND PAIRS ---
for (let i = 1; i <= 6; i++) {
    hands.push({
        name: `Singles/Pairs - Hand 1 (${i}-${i+3})`,
        value: 50,
        isConcealed: true,
        variations: suits.map(s => buildVariation([['N',2],['E',1],['W',1],['S',2],[String(i),2,'s1'],[String(i+1),2,'s1'],[String(i+2),2,'s1'],[String(i+3),2,'s1']], [s]))
    });
}
hands.push({
  name: 'Singles/Pairs - Hand 2',
  value: 50,
  isConcealed: true,
  variations: getPermutations(suits, 2).map(p => buildVariation([['F',2],['2468',1,'s1'],['D',2,'s1'],['2468',1,'s2'],['D',2,'s2']], p))
});
[3,6,9].forEach(n => {
    hands.push({
        name: `Singles/Pairs - Hand 3 (Pair ${n}s)`,
        value: 50,
        isConcealed: true,
        variations: getPermutations(suits, 3).map(p => buildVariation([['336699',1,'s1'],['336699',1,'s2'],[String(n),2,'s3']], p))
    });
});
for (let i = 1; i <= 8; i++) {
    hands.push({
        name: `Singles/Pairs - Hand 4 (${i},${i+1})`,
        value: 50,
        isConcealed: true,
        variations: getPermutations(suits, 3).map(p => buildVariation([['F',2],[String(i),2,'s1'],[String(i+1),2,'s1'],[String(i),2,'s2'],[String(i+1),2,'s2'],[String(i),2,'s3'],[String(i+1),2,'s3']], p))
    });
}
[1,3,5,7,9].forEach(n => {
    hands.push({
        name: `Singles/Pairs - Hand 5 (Odd ${n}s)`,
        value: 50,
        isConcealed: true,
        variations: getPermutations(suits, 3).map(p => buildVariation([['1',2,'s1'],['3',2,'s1'],['5',2,'s1'],['7',2,'s1'],['9',2,'s1'],[String(n),2,'s2'],[String(n),2,'s3']], p))
    });
});
hands.push({
  name: 'Singles/Pairs - Hand 6',
  value: 75,
  isConcealed: true,
  variations: getPermutations(suits, 3).map(p => buildVariation([['F',2],['2025',1,'s1'],['2025',1,'s2'],['2025',1,'s3']], p))
});

// --- NEW --- Helper function to calculate tile demand ---
/**
 * Calculates how many winning hand variations require a specific tile.
 * @param {Array} allHands - The array of hand objects.
 * @returns {Object} A map of tile IDs to their demand count.
 */
function calculateTileDemand(allHands) {
    const demand = {};
    const allVariations = allHands.flatMap(hand => hand.variations);

    allVariations.forEach(variation => {
        // Use a Set to count each tile only once per variation
        const uniqueTileIdsInVariation = new Set(variation.tiles.map(tile => tile.id));

        uniqueTileIdsInVariation.forEach(tileId => {
            demand[tileId] = (demand[tileId] || 0) + 1;
        });
    });

    return demand;
}

// --- NEW --- Calculate and export the tile demand maps ---
export const tileDemand = calculateTileDemand(hands);

// Filter for the specific tiles you requested
const specialTileKeys = ['F', 'N', 'E', 'W', 'S', 'GD', 'RD', 'SOAP'];
export const specialTileDemand = Object.fromEntries(
    Object.entries(tileDemand).filter(([key]) => specialTileKeys.includes(key))
);

/*
--- Generated Special Tile Demand Map ---

This is the calculated demand based on the hands in this file.
You can see Flowers are the most in-demand special tile.

{
  "F": 50,
  "SOAP": 31,
  "N": 16,
  "S": 16,
  "GD": 14,
  "RD": 14,
  "E": 12,
  "W": 12
}

*/


export default hands;
