// src/helpers/handSorter.js

/**
 * A helper function to count how many of a player's tiles match a specific hand variation.
 */
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
        // Treat WD and SOAP as the same for matching purposes
        const playerHas = (playerCounts[id] || 0) + (id === 'SOAP' ? playerCounts['WD'] || 0 : 0);
        matches += Math.min(playerHas, variationCounts[id]);
    }
    return matches;
}

export default function sortHandAndIdentifyJunk(playerTiles, topHand) {
    if (!topHand || !topHand.variations || !topHand.variations.length === 0) {
        return { sortedHand: playerTiles, junkTiles: [] };
    }

    const playerTileIds = playerTiles.map(t => t.id);
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
    const neededTileIds = bestFitVariation.tiles.map(t => t.id);
    for (const id of neededTileIds) {
        neededChecklist[id] = (neededChecklist[id] || 0) + 1;
    }

    const specificKeepers = [];
    const unassigned = [];
    const playerTilesCopy = [...playerTiles];

    // 3. First pass: Pull out all exact matches for the pattern.
    playerTilesCopy.forEach(tile => {
        const tileId = tile.id;
        if (neededChecklist[tileId] && neededChecklist[tileId] > 0) {
            specificKeepers.push(tile);
            neededChecklist[tileId]--;
        } else {
            unassigned.push(tile);
        }
    });

    // 4. Second pass: Use wildcards from the unassigned pile to fill remaining gaps.
    const wildcardKeepers = [];
    const junk = [];
    const canUseJokers = !topHand.name.includes("Singles and Pairs");
    let tilesStillNeeded = neededTileIds.length - specificKeepers.length;

    const wildcards = unassigned.filter(t => t.id === 'BLANK' || (t.id === 'JOKER' && canUseJokers) || t.id === 'WD');
    const nonWildcards = unassigned.filter(t => !wildcards.includes(t));

    wildcards.forEach(tile => {
        if (tilesStillNeeded > 0) {
            // Special check for WD: only use it as a wildcard if SOAP is needed
            if (tile.id === 'WD' && neededChecklist['SOAP'] > 0) {
                wildcardKeepers.push(tile);
                neededChecklist['SOAP']--;
                tilesStillNeeded--;
            } else if (tile.id !== 'WD') {
                 wildcardKeepers.push(tile);
                 tilesStillNeeded--;
            } else {
                junk.push(tile);
            }
        } else {
            junk.push(tile);
        }
    });
    
    junk.push(...nonWildcards);

    // 5. Sort the specific keepers to match the pattern order.
    specificKeepers.sort((a, b) => {
        const indexA = neededTileIds.indexOf(a.id);
        const indexB = neededTileIds.indexOf(b.id);
        return indexA - indexB;
    });

    const sortedHand = [...wildcardKeepers, ...specificKeepers, ...junk];
    
    return { sortedHand, junkTiles: junk };
}
