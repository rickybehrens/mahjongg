// src/helpers/probabilityCalculator.js

/**
 * Calculates both a "Completion Score" (prob) and a "Strategic Value" (value) for each hand.
 */
function calculateProbabilities(playerHand, winningHands) {
    const results = {};

    const playerTileCounts = {};
    let jokerCount = 0;
    let blankCount = 0;
    
    playerHand.forEach(tile => {
        if (tile.id === 'JOKER') jokerCount++;
        else if (tile.id === 'BLANK') blankCount++;
        else {
            const tileId = tile.id === 'WD' ? 'SOAP' : tile.id;
            playerTileCounts[tileId] = (playerTileCounts[tileId] || 0) + 1;
        }
    });

    winningHands.forEach(winningHand => {
        let bestProb = 0;
        let bestValue = 0;

        if (winningHand.variations && winningHand.variations.length > 0) {
            winningHand.variations.forEach(variation => {
                let tilesNeeded = 0;
                let nonJokerGaps = 0;

                const requiredTileCounts = {};
                for (const needed of variation.tiles) {
                    requiredTileCounts[needed.id] = (requiredTileCounts[needed.id] || 0) + 1;
                }

                for (const tileId in requiredTileCounts) {
                    const requiredCount = requiredTileCounts[tileId];
                    const playerHasCount = playerTileCounts[tileId] || 0;
                    
                    if (playerHasCount < requiredCount) {
                        const missingCount = requiredCount - playerHasCount;
                        tilesNeeded += missingCount;
                        
                        if (!winningHand.name.includes("Singles and Pairs")) {
                            nonJokerGaps += missingCount;
                        }
                    }
                }

                let tempTilesNeeded = tilesNeeded;
                
                const blanksToUse = Math.min(tempTilesNeeded, blankCount);
                tempTilesNeeded -= blanksToUse;

                const canUseJokers = !winningHand.name.includes("Singles and Pairs");
                let jokersToUse = 0;
                if (canUseJokers) {
                    jokersToUse = Math.min(tempTilesNeeded, jokerCount);
                    tempTilesNeeded -= jokersToUse;
                }
                
                const handSize = variation.tiles.length || 14;
                const completionScore = (handSize - tempTilesNeeded) / handSize;

                let jokerlessBonus = 1.0;
                const isEligibleForBonus = !winningHand.name.includes("Singles and Pairs");
                if (isEligibleForBonus) {
                    if (nonJokerGaps <= blankCount) {
                        jokerlessBonus = 2.0;
                    }
                }

                const handValue = winningHand.value || 25;
                const strategicValue = completionScore * handValue * jokerlessBonus;
                
                if (completionScore > bestProb) {
                    bestProb = completionScore;
                }
                if (strategicValue > bestValue) {
                    bestValue = strategicValue;
                }
            });
        }
        
        results[winningHand.name] = {
            prob: bestProb,
            value: bestValue,
        };
    });

    return results;
}

export default calculateProbabilities;
