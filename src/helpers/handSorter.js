// src/helpers/handSorter.js

function countMatches(playerTileIds, variationTileIds) {
    const playerCounts = playerTileIds.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {});

    const variationCounts = variationTileIds.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {});

    let matches = 0;
    for (const id in variationCounts) {
        matches += Math.min(playerCounts[id] || 0, variationCounts[id]);
    }
    return matches;
}

export default function sortHandAndIdentifyJunk(playerTiles, topHand) {
    if (!topHand || !topHand.variations || !topHand.variations.length === 0) {
        return { sortedHand: playerTiles, keepers: [], either: [], junk: playerTiles };
    }

    const playerTileIds = playerTiles.map(t => (t.id === 'WD' ? 'SOAP' : t.id));
    let bestFitVariations = [];
    let maxMatches = -1;

    // 1. Find ALL variations of the top hand that are an equally good fit.
    for (const variation of topHand.variations) {
        const variationTileIds = variation.tiles.map(t => t.id);
        const matches = countMatches(playerTileIds, variationTileIds);
        if (matches > maxMatches) {
            maxMatches = matches;
            bestFitVariations = [variation]; // Start a new list of best fits
        } else if (matches === maxMatches) {
            bestFitVariations.push(variation); // Add to the list of equally good fits
        }
    }

    // 2. Determine which tiles are keepers, either, or junk.
    const neededForAll = new Set(bestFitVariations[0].tiles.map(t => t.id === 'SOAP' ? 'WD' : t.id));
    const neededForSome = new Set();

    bestFitVariations.forEach((variation, index) => {
        const variationIds = new Set(variation.tiles.map(t => t.id === 'SOAP' ? 'WD' : t.id));
        if (index > 0) {
            // A tile is a "keeper" if it's in EVERY best-fit variation.
            neededForAll.forEach(id => {
                if (!variationIds.has(id)) {
                    neededForAll.delete(id);
                }
            });
        }
        // A tile is potentially useful if it's in ANY best-fit variation.
        variationIds.forEach(id => neededForSome.add(id));
    });

    const keepers = [];
    const either = [];
    const junk = [];
    const playerTilesCopy = [...playerTiles];

    // 3. Categorize each tile in the player's hand.
    playerTilesCopy.forEach(tile => {
        const tileId = tile.id === 'WD' ? 'SOAP' : tile.id;
        if (neededForAll.has(tileId)) {
            keepers.push(tile);
        } else if (neededForSome.has(tileId)) {
            either.push(tile);
        } else {
            junk.push(tile);
        }
    });
    
    // 4. Sort the keepers to match the primary best-fit pattern.
    const primaryPatternIds = bestFitVariations[0].tiles.map(t => t.id === 'SOAP' ? 'WD' : t.id);
    keepers.sort((a, b) => {
        const idA = a.id === 'WD' ? 'SOAP' : a.id;
        const idB = b.id === 'WD' ? 'SOAP' : b.id;
        return primaryPatternIds.indexOf(idA) - primaryPatternIds.indexOf(idB);
    });

    const sortedHand = [...keepers, ...either, ...junk];
    
    return { sortedHand, keepers, either, junk };
}
