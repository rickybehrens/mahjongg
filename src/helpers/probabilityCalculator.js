// src/helpers/probabilityCalculator.js
import tilesData from '../data/tiles';

/**
 * The main function to calculate probabilities and strategic values.
 * It now correctly handles joker restrictions for all singles and pairs.
 */
function calculateProbabilities(playerHand, winningHands, gameSettings) {
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

    winningHands.forEach(winningHand => {
        let bestProb = 0;
        let bestValue = 0;
        let bestVariation = null;

        if (winningHand.variations && winningHand.variations.length > 0) {
            winningHand.variations.forEach(variation => {
                let tilesNeeded = 0;
                let nonJokerableGaps = 0; // Gaps that CANNOT be filled by jokers (singles/pairs)
                let jokerReliantGaps = 0; // Gaps that REQUIRE a joker (e.g., for a 5th tile)

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
                        
                        // --- THIS IS THE FIX ---
                        // If a required group is a single or a pair, jokers cannot be used.
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

                // --- REVISED CALCULATION FOR UNFILLABLE TILES ---
                // 1. Use blanks first for the hardest-to-fill gaps (singles/pairs).
                const blanksOnNonJokerable = Math.min(nonJokerableGaps, playerBlankCount);
                const remainingBlanks = playerBlankCount - blanksOnNonJokerable;
                const unfillableNonJokerable = nonJokerableGaps - blanksOnNonJokerable;

                // 2. Use jokers for the remaining "jokerable" gaps.
                const jokerableGaps = tilesNeeded - nonJokerableGaps;
                const jokersOnJokerable = Math.min(jokerableGaps, playerJokerCount);
                
                // 3. Use any leftover blanks to fill any remaining jokerable gaps.
                const remainingJokerableGaps = jokerableGaps - jokersOnJokerable;
                const blanksOnJokerable = Math.min(remainingJokerableGaps, remainingBlanks);
                const unfillableJokerable = remainingJokerableGaps - blanksOnJokerable;

                // The final number of tiles the player still needs.
                const finalTilesNeeded = unfillableNonJokerable + unfillableJokerable;
                
                const handSize = variation.tiles.length || 14;
                const completionScore = (handSize - finalTilesNeeded) / handSize;

                // --- STRATEGIC MODIFIERS ---
                let strategicModifier = 1.0;

                // 1. Penalty for Concealed hands that still have unfillable non-jokerable gaps.
                // These must be drawn from the wall, which is difficult.
                if (winningHand.isConcealed && unfillableNonJokerable > 0) {
                    strategicModifier *= Math.pow(0.65, unfillableNonJokerable);
                }

                // 2. Penalty for Quint hands if the player doesn't have enough jokers.
                const jokersStillNeeded = Math.max(0, jokerReliantGaps - playerJokerCount);
                if (jokersStillNeeded > 0) {
                    strategicModifier *= Math.pow(0.5, jokersStillNeeded);
                }
                
                const handValue = winningHand.value || 25;
                const strategicValue = completionScore * handValue * strategicModifier;
                
                if (strategicValue > bestValue) {
                    bestValue = strategicValue;
                    bestProb = completionScore;
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
