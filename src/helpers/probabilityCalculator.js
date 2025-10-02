// src/helpers/probabilityCalculator.js
import tilesData from '../data/tiles';

function calculateProbabilities(playerHand, winningHands, gameSettings, remainingDeckCounts) {
    const results = {};

    const playerTileCounts = {};
    let playerJokerCount = 0;
    let playerBlankCount = 0;
    
    playerHand.forEach(tile => {
        if (tile.id === 'JOKER') playerJokerCount++;
        else if (tile.id === 'BLANK') playerBlankCount++;
        else {
            const tileId = tile.id === 'WD' ? 'SOAP' : tile.id; 
            playerTileCounts[tileId] = (playerTileCounts[tileId] || 0) + 1;
        }
    });

    const jokersLeftInDeck = remainingDeckCounts ? (remainingDeckCounts['JOKER'] || 0) : 0;
    const totalTilesLeftInDeck = remainingDeckCounts ? Object.values(remainingDeckCounts).reduce((sum, count) => sum + count, 0) : 1;
    const probOfDrawingOneJoker = totalTilesLeftInDeck > 0 ? jokersLeftInDeck / totalTilesLeftInDeck : 0;

    winningHands.forEach(winningHand => {
        let bestProb = 0;
        let bestValue = 0;
        let bestVariation = null;

        if (winningHand.variations && winningHand.variations.length > 0) {
            winningHand.variations.forEach(variation => {
                let tilesNeeded = 0;
                let nonJokerableGaps = 0; 
                let jokerReliantGaps = 0;

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
                        
                        if (requiredCount < 3) {
                            nonJokerableGaps += missingCount;
                        }
                    }
                    
                    const maxNaturalTiles = tilesData.find(t => t.id === tileId)?.maxQuantity || 4;
                    if (requiredCount > maxNaturalTiles) {
                        const neededForQuint = requiredCount - maxNaturalTiles;
                        const playerHasForQuint = Math.max(0, playerHasCount - maxNaturalTiles);
                        jokerReliantGaps += (neededForQuint - playerHasForQuint);
                    }
                }

                const blanksOnNonJokerable = Math.min(nonJokerableGaps, playerBlankCount);
                const remainingBlanks = playerBlankCount - blanksOnNonJokerable;
                const unfillableNonJokerable = nonJokerableGaps - blanksOnNonJokerable;

                const jokerableGaps = tilesNeeded - nonJokerableGaps;
                const jokersOnJokerable = Math.min(jokerableGaps, playerJokerCount);
                
                const remainingJokerableGaps = jokersOnJokerable - jokersOnJokerable;
                const blanksOnJokerable = Math.min(remainingJokerableGaps, remainingBlanks);
                const unfillableJokerable = remainingJokerableGaps - blanksOnJokerable;

                const finalTilesNeeded = unfillableNonJokerable + unfillableJokerable;
                
                const handSize = variation.tiles.length || 14;
                const completionScore = (handSize - finalTilesNeeded) / handSize;

                let strategicModifier = 1.0;

                if (winningHand.isConcealed && unfillableNonJokerable > 0) {
                    strategicModifier *= Math.pow(0.65, unfillableNonJokerable);
                }

                const jokersStillNeeded = Math.max(0, jokerReliantGaps - playerJokerCount);

                if (jokersStillNeeded > 0) {
                    const jokerAcquisitionModifier = Math.pow(probOfDrawingOneJoker, jokersStillNeeded);
                    strategicModifier *= jokerAcquisitionModifier;
                }
                
                // --- MODIFIED ---
                // 1. Calculate the final, penalized probability score
                const penalizedCompletionScore = completionScore * strategicModifier;
                
                // 2. Calculate Strategic Value using the new penalized score
                const handValue = winningHand.value || 25;
                const strategicValue = penalizedCompletionScore * handValue;
                
                if (strategicValue > bestValue) {
                    bestValue = strategicValue;
                    // 3. Store the penalized score as the "prob" to be displayed
                    bestProb = penalizedCompletionScore; 
                    bestVariation = variation;
                }
            });
        }
        
        results[winningHand.name] = {
            prob: bestProb,
            value: bestValue,
            bestVariation: bestVariation
        };
    });

    return results;
}

export default calculateProbabilities;