// src/helpers/findMissingTiles.js

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
        matches += Math.min(playerCounts[id] || 0, variationCounts[id]);
    }
    return matches;
}

/**
 * Compares a player's hand to ALL variations of a winning hand, finds all "best fits",
 * and returns the specific tiles needed to complete each of those best-fit variations.
 */
export function findMissingTiles(playerHand, winningHand) {
    if (!playerHand || !winningHand || !winningHand.variations || winningHand.variations.length === 0) {
        return [];
    }

    const playerTileIds = playerHand.map(t => t.id === 'WD' ? 'SOAP' : t.id);
    let bestFitVariations = [];
    let maxMatches = -1;

    // 1. Find ALL variations of the winning hand that are an equally good fit.
    for (const variation of winningHand.variations) {
        const variationTileIds = variation.tiles.map(t => t.id);
        const matches = countMatches(playerTileIds, variationTileIds);

        if (matches > maxMatches) {
            maxMatches = matches;
            bestFitVariations = [variation]; // Start a new list of best fits
        } else if (matches === maxMatches) {
            bestFitVariations.push(variation); // Add to the list of equally good fits
        }
    }

    // 2. For each of the best-fit variations, calculate the missing tiles.
    return bestFitVariations.map(variation => {
        const playerCounts = {};
        let jokersAvailable = 0;
        playerHand.forEach(tile => {
            if (tile.id === 'JOKER') {
                jokersAvailable++;
            } else {
                const tileId = tile.id === 'WD' ? 'SOAP' : tile.id;
                playerCounts[tileId] = (playerCounts[tileId] || 0) + 1;
            }
        });

        const neededCounts = {};
        variation.tiles.forEach(tile => {
            neededCounts[tile.id] = (neededCounts[tile.id] || 0) + 1;
        });

        const missingTiles = [];
        for (const tileId in neededCounts) {
            const needed = neededCounts[tileId];
            const playerHas = playerCounts[tileId] || 0;

            if (playerHas < needed) {
                let stillMissing = needed - playerHas;
                const jokersToUse = Math.min(stillMissing, jokersAvailable);
                stillMissing -= jokersToUse;
                jokersAvailable -= jokersToUse;

                for (let i = 0; i < stillMissing; i++) {
                    missingTiles.push({ id: tileId });
                }
            }
        }
        return missingTiles;
    });
}
