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
        return { sortedHand: playerTiles, junkTiles: [] };
    }

    const playerTileIds = playerTiles.map(t => (t.id === 'WD' ? 'SOAP' : t.id));
    let bestFitVariation = topHand.variations[0];
    let maxMatches = -1;

    // 1. Find the variation of the top hand that is the best fit for the player's tiles.
    for (const variation of topHand.variations) {
        const variationTileIds = variation.tiles.map(t => t.id);
        const matches = countMatches(playerTileIds, variationTileIds);
        if (matches > maxMatches) {
            maxMatches = matches;
            bestFitVariation = variation;
        }
    }

    // 2. Create a "checklist" of tiles needed for the best-fit pattern.
    const neededChecklist = {};
    const neededTileIds = bestFitVariation.tiles.map(t => t.id === 'SOAP' ? 'WD' : t.id);
    for (const id of neededTileIds) {
        neededChecklist[id] = (neededChecklist[id] || 0) + 1;
    }

    const specificKeepers = [];
    const wildcardKeepers = [];
    const junk = [];
    const playerTilesCopy = [...playerTiles];

    playerTilesCopy.forEach(tile => {
        const tileId = tile.id === 'WD' ? 'SOAP' : tile.id;
        if (neededChecklist[tileId] && neededChecklist[tileId] > 0) {
            specificKeepers.push(tile);
            neededChecklist[tileId]--;
        } else {
            junk.push(tile);
        }
    });

    const remainingJunk = [];
    const canUseJokers = !topHand.name.includes("Singles and Pairs");
    let tilesStillNeeded = neededTileIds.length - specificKeepers.length;

    junk.forEach(tile => {
        if (tile.id === 'BLANK' && tilesStillNeeded > 0) {
            wildcardKeepers.push(tile);
            tilesStillNeeded--;
        } else if (tile.id === 'JOKER' && canUseJokers && tilesStillNeeded > 0) {
            wildcardKeepers.push(tile);
            tilesStillNeeded--;
        } else {
            remainingJunk.push(tile);
        }
    });

    specificKeepers.sort((a, b) => {
        const idA = a.id === 'WD' ? 'SOAP' : a.id;
        const idB = b.id === 'WD' ? 'SOAP' : b.id;
        const indexA = neededTileIds.indexOf(idA);
        const indexB = neededTileIds.indexOf(idB);
        return indexA - indexB;
    });

    const sortedHand = [...wildcardKeepers, ...specificKeepers, ...remainingJunk];
    
    return { sortedHand, junkTiles: remainingJunk };
}
