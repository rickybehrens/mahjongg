// src/helpers/probabilityCalculator.js

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

function calculateProbabilities(playerHand, winningHands) {
    const results = {};

    const playerTileIds = playerHand.map(t => t.id);

    winningHands.forEach(winningHand => {
        let bestProb = 0;
        let bestValue = 0;

        if (winningHand.variations && winningHand.variations.length > 0) {
            let bestFitVariation = winningHand.variations[0];
            let maxMatches = -1;

            for (const variation of winningHand.variations) {
                const variationTileIds = variation.tiles.map(t => t.id);
                const matches = countMatches(playerTileIds, variationTileIds);
                if (matches > maxMatches) {
                    maxMatches = matches;
                    bestFitVariation = variation;
                }
            }

            const playerCounts = {};
            let jokerCount = 0;
            let blankCount = 0;
            playerHand.forEach(tile => {
                if (tile.id === 'JOKER') jokerCount++;
                else if (tile.id === 'BLANK') blankCount++;
                else {
                    playerCounts[tile.id] = (playerCounts[tile.id] || 0) + 1;
                }
            });

            const requiredCounts = {};
            bestFitVariation.tiles.forEach(tile => {
                requiredCounts[tile.id] = (requiredCounts[tile.id] || 0) + 1;
            });

            let tilesNeeded = 0;
            let nonJokerGaps = 0;

            for (const tileId in requiredCounts) {
                const required = requiredCounts[tileId];
                let playerHas = playerCounts[tileId] || 0;

                // --- THIS IS THE FIX ---
                // If a SOAP is needed, check if we have a White Dragon to use for it.
                if (tileId === 'SOAP' && playerCounts['WD']) {
                    const useWdAsSoap = Math.min(required, playerCounts['WD']);
                    playerHas += useWdAsSoap;
                }

                if (playerHas < required) {
                    const missing = required - playerHas;
                    tilesNeeded += missing;
                    if (!winningHand.name.includes("Singles and Pairs")) {
                        nonJokerGaps += missing;
                    }
                }
            }

            let tempTilesNeeded = tilesNeeded;
            const blanksToUse = Math.min(tempTilesNeeded, blankCount);
            tempTilesNeeded -= blanksToUse;

            const canUseJokers = !winningHand.name.includes("Singles and Pairs");
            if (canUseJokers) {
                const jokersToUse = Math.min(tempTilesNeeded, jokerCount);
                tempTilesNeeded -= jokersToUse;
            }
            
            const handSize = bestFitVariation.tiles.length || 14;
            const completionScore = (handSize - tempTilesNeeded) / handSize;

            let jokerlessBonus = 1.0;
            if (!winningHand.name.includes("Singles and Pairs") && nonJokerGaps <= blankCount) {
                jokerlessBonus = 2.0;
            }

            const handValue = winningHand.value || 25;
            bestProb = completionScore;
            bestValue = completionScore * handValue * jokerlessBonus;
        }
        
        results[winningHand.name] = {
            prob: bestProb,
            value: bestValue,
        };
    });

    return results;
}

export default calculateProbabilities;
