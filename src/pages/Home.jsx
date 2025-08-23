// src/pages/Home.jsx
import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import TileGrid from '../components/TileGrid';
import Hand from '../components/Hand';
import { getCharlestonRecommendation, recommendFinalPass, cherryPickTiles } from '../helpers/charlestonHelper';
import { winningHandsData, availableYears } from '../data/winningHands';
import tiles from '../data/tiles';
import HandDisplay from '../components/HandDisplay';
import calculateProbabilities from '../helpers/probabilityCalculator';
import MissingTilesGrid from '../components/MissingTilesGrid';
import { findMissingTiles } from '../helpers/findMissingTiles';
import RevealScreen from '../components/RevealScreen';

const GAME_PHASES = {
    INITIAL_SELECTION: 'INITIAL_SELECTION',
    CHARLESTON_PASS: 'CHARLESTON_PASS',
    CHARLESTON_GET: 'CHARLESTON_GET',
    CHARLESTON_DECISION: 'CHARLESTON_DECISION',
    FINAL_PASS: 'FINAL_PASS',
    FINAL_GET: 'FINAL_GET',
    GAME_STARTED: 'GAME_STARTED',
    REVEAL: 'REVEAL',
};

const charlestonSteps = [
    { title: '1st Pass to the Right', pass: 1 },
    { title: '1st Pass Across', pass: 2 },
    { title: '1st Pass to the Left (blind)', pass: 3 },
    { title: '2nd Pass to the Left', pass: 4 },
    { title: '2nd Pass Across', pass: 5 },
    { title: '2nd Pass to the Right (blind)', pass: 6 },
];

function Home({ onMenuToggle }) {
    const [selectedYear, setSelectedYear] = useState(availableYears[0]);
    const [playerHand, setPlayerHand] = useState({});
    const [gamePhase, setGamePhase] = useState(GAME_PHASES.INITIAL_SELECTION);
    const activeWinningHands = useMemo(() => winningHandsData[selectedYear] || [], [selectedYear]);
    const [sortedHands, setSortedHands] = useState(activeWinningHands);
    const [probabilities, setProbabilities] = useState({});
    const [targetHand, setTargetHand] = useState(null);
    const [isDealer, setIsDealer] = useState(false);
    const [jokerCount, setJokerCount] = useState(8);
    const [blankCount, setBlankCount] = useState(0);
    const [charlestonPassIndex, setCharlestonPassIndex] = useState(0);
    const [tilesToPass, setTilesToPass] = useState([]);
    const [receivedTiles, setReceivedTiles] = useState({});
    const [charlestonDecision, setCharlestonDecision] = useState({ action: 'continue', reason: '' });
    const [finalPassRecommendation, setFinalPassRecommendation] = useState({ count: 0, tiles: [] });
    const [passCount, setPassCount] = useState(3);
    const [isBlindPassing, setIsBlindPassing] = useState(false);
    const [passFromHandCount, setPassFromHandCount] = useState(2);

    const [isLearningMode, setIsLearningMode] = useState(false);
    const [ghostHand, setGhostHand] = useState({});
    const [charlestonHistory, setCharlestonHistory] = useState([]);
    const [ghostDecision, setGhostDecision] = useState({ action: 'continue' });

    const maxHandSize = isDealer ? 14 : 13;

    const handAsArray = useMemo(() => {
        return Object.entries(playerHand).flatMap(([tileId, quantity]) => {
            const tileData = tiles.find(t => t.id === tileId);
            return tileData ? Array(quantity).fill(tileData) : [];
        });
    }, [playerHand]);

    const ghostHandAsArray = useMemo(() => {
        return Object.entries(ghostHand).flatMap(([tileId, quantity]) => {
            const tileData = tiles.find(t => t.id === tileId);
            return tileData ? Array(quantity).fill(tileData) : [];
        });
    }, [ghostHand]);

    const fullDeckCounts = useMemo(() => {
        const deck = {};
        tiles.forEach(tile => {
            if (tile.id === 'JOKER') deck[tile.id] = jokerCount;
            else if (tile.id === 'BLANK') deck[tile.id] = blankCount;
            else deck[tile.id] = tile.maxQuantity;
        });
        return deck;
    }, [jokerCount, blankCount]);

    const remainingDeckCounts = useMemo(() => {
        const remaining = { ...fullDeckCounts };
        for (const tileId in playerHand) {
            remaining[tileId] = (remaining[tileId] || 0) - playerHand[tileId];
        }
        return remaining;
    }, [playerHand, fullDeckCounts]);

    useEffect(() => {
        if (handAsArray.length < 13 || gamePhase === GAME_PHASES.GAME_STARTED || gamePhase === GAME_PHASES.REVEAL) return;

        const newResults = calculateProbabilities(handAsArray, activeWinningHands, { jokerCount, blankCount });
        setProbabilities(newResults);

        const handsWithMetrics = activeWinningHands.map(hand => ({
            ...hand,
            prob: newResults[hand.name]?.prob || 0,
            value: newResults[hand.name]?.value || 0,
            bestVariation: newResults[hand.name]?.bestVariation 
        }));
        
        handsWithMetrics.sort((a, b) => b.prob - a.prob);
        setSortedHands(handsWithMetrics);
        
        if (gamePhase !== GAME_PHASES.CHARLESTON_PASS && gamePhase !== GAME_PHASES.FINAL_PASS) {
            setTargetHand(null);
        }

        if (gamePhase === GAME_PHASES.CHARLESTON_DECISION) {
            const decision = getCharlestonRecommendation(handsWithMetrics);
            setCharlestonDecision(decision);
        }

        if (gamePhase === GAME_PHASES.FINAL_PASS) {
            const recommendation = recommendFinalPass(handAsArray, handsWithMetrics);
            setFinalPassRecommendation(recommendation);
        }
    }, [playerHand, gamePhase, charlestonPassIndex, activeWinningHands, handAsArray, jokerCount, blankCount]);

    useEffect(() => {
        if (isLearningMode && (gamePhase === GAME_PHASES.CHARLESTON_PASS || gamePhase === GAME_PHASES.CHARLESTON_DECISION || gamePhase === GAME_PHASES.FINAL_PASS)) {
            const ghostResults = calculateProbabilities(ghostHandAsArray, activeWinningHands, { jokerCount, blankCount });
            const ghostHandsWithMetrics = activeWinningHands.map(hand => ({
                ...hand,
                prob: ghostResults[hand.name]?.prob || 0,
                value: ghostResults[hand.name]?.value || 0,
                bestVariation: ghostResults[hand.name]?.bestVariation
            }));
            ghostHandsWithMetrics.sort((a, b) => b.value - a.value);
            
            if (gamePhase === GAME_PHASES.CHARLESTON_DECISION) {
                setGhostDecision(getCharlestonRecommendation(ghostHandsWithMetrics));
            }
        }
    }, [ghostHand, gamePhase, isLearningMode]);

    const activeTopHand = targetHand || sortedHands[0];

    const totalTileCount = useMemo(() => Object.values(playerHand).reduce((sum, count) => sum + count, 0), [playerHand]);

    const handleQuantityChange = (tile, action) => {
        if (gamePhase !== GAME_PHASES.INITIAL_SELECTION) return;
        const currentCount = playerHand[tile.id] || 0;
        if (action === 'increment') {
            const maxCount = tile.maxQuantity || 4;
            if (currentCount < maxCount && totalTileCount < maxHandSize) {
                setPlayerHand(prev => ({ ...prev, [tile.id]: currentCount + 1 }));
            }
        }
        if (action === 'decrement' && currentCount > 0) {
            const newCount = currentCount - 1;
            const newHand = { ...playerHand };
            if (newCount === 0) delete newHand[tile.id];
            else newHand[tile.id] = newCount;
            setPlayerHand(newHand);
        }
    };

    // --- THIS IS THE CORRECTED FUNCTION ---
    // It now calls the correct handler based on the current game phase.
    const handleTileImageClick = (tile) => {
        if (gamePhase === GAME_PHASES.INITIAL_SELECTION) {
            handleQuantityChange(tile, 'increment');
        } else if (gamePhase === GAME_PHASES.CHARLESTON_GET || gamePhase === GAME_PHASES.FINAL_GET) {
            handleSelectReceivedTile(tile, 'increment');
        }
    };
    
    const startCharleston = () => {
        if (isLearningMode) {
            setGhostHand({ ...playerHand });
            setCharlestonHistory([]);
        }
        setGamePhase(GAME_PHASES.CHARLESTON_PASS);
    };
    
    const goBackToSelection = () => {
        setGamePhase(GAME_PHASES.INITIAL_SELECTION);
        setCharlestonPassIndex(0);
        setIsBlindPassing(false);
    };

    const handleSelectTileToPass = (instanceKey) => {
        setTilesToPass(prev => {
            if (prev.includes(instanceKey)) return prev.filter(key => key !== instanceKey);
            const limit = gamePhase === GAME_PHASES.FINAL_PASS ? 3 : isBlindPassing ? passFromHandCount : 3;
            if (prev.length < limit) return [...prev, instanceKey];
            return prev;
        });
    };

    const handleExchange = () => {
        if (isLearningMode) {
            const ghostResults = calculateProbabilities(ghostHandAsArray, activeWinningHands, { jokerCount, blankCount });
            const ghostHandsWithMetrics = activeWinningHands.map(hand => ({...hand, prob: ghostResults[hand.name]?.prob || 0, value: ghostResults[hand.name]?.value || 0, bestVariation: ghostResults[hand.name]?.bestVariation }));
            ghostHandsWithMetrics.sort((a, b) => b.value - a.value);
            
            let ghostTilesToPass = [];
            if (ghostDecision.action === 'continue') {
                ghostTilesToPass = recommendFinalPass(ghostHandAsArray, ghostHandsWithMetrics).tiles;
            }

            setCharlestonHistory(prev => [...prev, {
                step: charlestonSteps[charlestonPassIndex]?.title || 'Final Pass Across',
                playerPass: tilesToPass,
                ghostPass: ghostTilesToPass
            }]);

            const newGhostHand = { ...ghostHand };
            ghostTilesToPass.forEach(instanceKey => {
                const tileId = instanceKey.split('-')[0];
                newGhostHand[tileId] -= 1;
                if (newGhostHand[tileId] === 0) delete newGhostHand[tileId];
            });
            setGhostHand(newGhostHand);
        }

        const newHand = { ...playerHand };
        tilesToPass.forEach(instanceKey => {
            const tileId = instanceKey.split('-')[0];
            newHand[tileId] -= 1;
            if (newHand[tileId] === 0) delete newHand[tileId];
        });
        
        setPlayerHand(newHand);
        setReceivedTiles({});
        
        let receivedCount;
        if (gamePhase === GAME_PHASES.FINAL_PASS) {
            receivedCount = tilesToPass.length;
        } else if (isBlindPassing) {
            receivedCount = passFromHandCount;
        } else {
            receivedCount = 3;
        }
        setPassCount(receivedCount);

        if (receivedCount === 0) {
            setIsBlindPassing(false);
            setTilesToPass([]);
            if (gamePhase === GAME_PHASES.FINAL_PASS) {
                if (isLearningMode) setGamePhase(GAME_PHASES.REVEAL);
                else setGamePhase(GAME_PHASES.GAME_STARTED);
            } else {
                handleConfirmReceived();
            }
            return;
        }

        setGamePhase(gamePhase === GAME_PHASES.FINAL_PASS ? GAME_PHASES.FINAL_GET : GAME_PHASES.CHARLESTON_GET);
        setTilesToPass([]);
        setIsBlindPassing(false);
    };

    const handleSelectReceivedTile = (tile, action) => {
        const totalReceived = Object.values(receivedTiles).reduce((s, c) => s + c, 0);
        const currentCount = receivedTiles[tile.id] || 0;

        if (action === 'increment' && totalReceived < passCount) {
            const availableCount = remainingDeckCounts[tile.id] || 0;
            if (currentCount < availableCount) {
                setReceivedTiles(prev => ({ ...prev, [tile.id]: currentCount + 1 }));
            }
        }
        if (action === 'decrement' && currentCount > 0) {
            const newCount = currentCount - 1;
            const newReceived = { ...receivedTiles };
            if (newCount === 0) delete newReceived[tile.id];
            else newReceived[tile.id] = newCount;
            setReceivedTiles(newReceived);
        }
    };

    const handleConfirmReceived = () => {
        if (isLearningMode) {
            const incomingTilesAsArray = Object.entries(receivedTiles).flatMap(([tileId, quantity]) => {
                const tileData = tiles.find(t => t.id === tileId);
                return tileData ? Array(quantity).fill(tileData) : [];
            });
            
            const newGhostHand = cherryPickTiles(ghostHandAsArray, incomingTilesAsArray, maxHandSize, activeWinningHands, { jokerCount, blankCount });
            setGhostHand(newGhostHand);
        }

        const newHand = { ...playerHand };
        Object.entries(receivedTiles).forEach(([tileId, quantity]) => {
            newHand[tileId] = (newHand[tileId] || 0) + quantity;
        });
        setPlayerHand(newHand);
        setReceivedTiles({});

        if (gamePhase === GAME_PHASES.FINAL_GET) {
            if (isLearningMode) setGamePhase(GAME_PHASES.REVEAL);
            else setGamePhase(GAME_PHASES.GAME_STARTED);
        } else if (charlestonPassIndex === 2) {
            setCharlestonPassIndex(prev => prev + 1);
            setGamePhase(GAME_PHASES.CHARLESTON_DECISION);
        } else if (charlestonPassIndex === 5) {
            setGamePhase(GAME_PHASES.FINAL_PASS);
            setIsBlindPassing(false);
        } else {
            setCharlestonPassIndex(prev => prev + 1);
            setGamePhase(GAME_PHASES.CHARLESTON_PASS);
        }
    };
    
    const continueCharleston = () => setGamePhase(GAME_PHASES.CHARLESTON_PASS);
    
    const skipSecondCharleston = () => setGamePhase(GAME_PHASES.FINAL_PASS);

    const startNewGame = () => {
        setPlayerHand({});
        setGhostHand({});
        setCharlestonHistory([]);
        setGamePhase(GAME_PHASES.INITIAL_SELECTION);
        setCharlestonPassIndex(0);
    }

    const totalReceivedCount = Object.values(receivedTiles).reduce((s, c) => s + c, 0);

    const handsToShow = useMemo(() => {
        let hands = [...sortedHands];
        if (targetHand) {
            hands = hands.filter(h => h.name !== targetHand.name);
            hands.unshift(targetHand);
        }
        if (hands.length <= 5) return hands;
        const fifthHandProb = hands[4]?.prob;
        if (fifthHandProb === undefined) return hands.slice(0, 5);
        const cutOffIndex = hands.findIndex(hand => hand.prob < fifthHandProb);
        return cutOffIndex === -1 ? hands : hands.slice(0, cutOffIndex);
    }, [sortedHands, targetHand]);

    const pageTitle = gamePhase === GAME_PHASES.FINAL_PASS
        ? 'Final Pass Across'
        : charlestonSteps[charlestonPassIndex]?.title || 'Charleston';

    const numberWords = ['None', 'One', 'Two', 'Three'];
    const finalPassButtonText = `Exchange ${numberWords[tilesToPass.length] || tilesToPass.length}`;

    if (gamePhase === GAME_PHASES.REVEAL) {
        return <RevealScreen 
                    playerHand={playerHand} 
                    ghostHand={ghostHand} 
                    history={charlestonHistory}
                    onStartNewGame={startNewGame}
                />
    }

    return (
        <div>
            {gamePhase === GAME_PHASES.INITIAL_SELECTION && (
                <>
                    <PageHeader title="Select Your Tiles" onMenuToggle={onMenuToggle} />
                    {totalTileCount > 0 && (
                        <div className="tile-counter">
                            {totalTileCount} / {maxHandSize}
                        </div>
                    )}
                    <div className="settings-container" style={{ margin: '10px 20px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div>
                            <label htmlFor="year-select">Card Year: </label>
                            <select id="year-select" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                                {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="dealer-checkbox">
                                <input id="dealer-checkbox" type="checkbox" checked={isDealer} onChange={() => setIsDealer(!isDealer)} />
                                I am the Dealer
                            </label>
                        </div>
                        <div>
                            <label htmlFor="jokers-select">Jokers: </label>
                            <select id="jokers-select" value={jokerCount} onChange={e => setJokerCount(parseInt(e.target.value))}>
                                {[8, 10].map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="blanks-select">Blanks: </label>
                            <select id="blanks-select" value={blankCount} onChange={e => setBlankCount(parseInt(e.target.value))}>
                                {[0, 2, 4, 6].map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="learning-mode-checkbox">
                                <input id="learning-mode-checkbox" type="checkbox" checked={isLearningMode} onChange={() => setIsLearningMode(!isLearningMode)} />
                                Learning Mode
                            </label>
                        </div>
                    </div>
                    <TileGrid 
                        onQuantityChange={handleQuantityChange} 
                        onTileImageClick={handleTileImageClick}
                        selectedTiles={playerHand} 
                        blankCount={blankCount} 
                    />
                    <button className="btn-confirm" onClick={startCharleston} disabled={totalTileCount !== maxHandSize}>
                        Confirm Hand & Start Charleston
                    </button>
                </>
            )}

            {(gamePhase === GAME_PHASES.CHARLESTON_PASS || gamePhase === GAME_PHASES.FINAL_PASS) && (
                 <>
                    <PageHeader title={pageTitle} onMenuToggle={onMenuToggle} />
                    <button className="btn-neutral" onClick={goBackToSelection} style={{marginBottom: '10px', marginLeft: '20px'}}>&larr; Edit Hand</button>
                    
                    {isBlindPassing && (
                        <div style={{padding: '10px 20px'}}>
                            <h4>Blind Pass Setup</h4>
                            <label htmlFor="blind-pass-select">How many tiles FROM YOUR HAND are you passing? </label>
                            <select id="blind-pass-select" value={passFromHandCount} onChange={e => setPassFromHandCount(parseInt(e.target.value))}>
                                <option value={0}>0 (Pass 3 blind)</option>
                                <option value={1}>1 (Pass 2 blind)</option>
                                <option value={2}>2 (Pass 1 blind)</option>
                            </select>
                            <p>Now, select the <strong>{passFromHandCount}</strong> tiles from your hand to pass.</p>
                        </div>
                    )}

                    <Hand
                        hand={playerHand}
                        onTileClick={handleSelectTileToPass}
                        selectedForAction={tilesToPass}
                        topHand={activeTopHand}
                        isLearningMode={isLearningMode}
                    />
                    
                    {gamePhase === GAME_PHASES.CHARLESTON_PASS && (
                         <button className="btn-confirm" onClick={handleExchange} disabled={tilesToPass.length !== (isBlindPassing ? passFromHandCount : 3)}>
                            {isBlindPassing ? 'Confirm Blind Pass' : 'Exchange'}
                        </button>
                    )}
                    
                     {gamePhase === GAME_PHASES.FINAL_PASS && (
                        <button className="btn-confirm" onClick={handleExchange}>
                            {finalPassButtonText}
                        </button>
                    )}

                    {(charlestonPassIndex === 2 || charlestonPassIndex === 5) && !isLearningMode && (
                        <button className={isBlindPassing ? 'btn-cancel' : 'btn-neutral'} onClick={() => {setIsBlindPassing(!isBlindPassing); setTilesToPass([]);}} style={{marginLeft: '10px'}}>
                            {isBlindPassing ? 'Cancel Blind Pass' : 'Blind Pass'}
                        </button>
                    )}
                </>
            )}
            
            {gamePhase === GAME_PHASES.CHARLESTON_DECISION && (
                <>
                    <PageHeader title="Charleston Decision" onMenuToggle={onMenuToggle} />
                     <button className="btn-neutral" onClick={goBackToSelection} style={{marginBottom: '10px', marginLeft: '20px'}}>&larr; Edit Hand</button>
                    <Hand hand={playerHand} topHand={activeTopHand} isLearningMode={isLearningMode} />
                    {!isLearningMode && (
                        <div style={{ margin: '20px', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                            <h3>Recommendation: <span style={{ color: charlestonDecision.action === 'skip' ? 'red' : 'green' }}>{charlestonDecision.action.toUpperCase()}</span></h3>
                            <p>{charlestonDecision.reason}</p>
                        </div>
                    )}
                    <button className="btn-confirm" onClick={continueCharleston}>Continue to Second Charleston</button>
                    <button className="btn-cancel" onClick={skipSecondCharleston} style={{ marginLeft: '10px' }}>Skip Second Charleston</button>
                </>
            )}
            
            {(gamePhase === GAME_PHASES.CHARLESTON_GET || gamePhase === GAME_PHASES.FINAL_GET) && (
                <>
                    <PageHeader title={`Select ${passCount} Tiles You Received`} onMenuToggle={onMenuToggle} />
                    <TileGrid 
                        onQuantityChange={handleSelectReceivedTile}
                        onTileImageClick={handleTileImageClick}
                        selectedTiles={receivedTiles} 
                        blankCount={blankCount}
                        availableQuantities={remainingDeckCounts}
                    />
                    <button 
                        className="btn-confirm"
                        onClick={handleConfirmReceived}
                        disabled={totalReceivedCount !== passCount}
                    >
                        Confirm Received Tiles
                    </button>
                </>
            )}
            
            {gamePhase === GAME_PHASES.GAME_STARTED && (
                 <>
                    <PageHeader title="Your Final Hand" onMenuToggle={onMenuToggle} />
                    <Hand hand={playerHand} topHand={activeTopHand} />
                </>
            )}

            {gamePhase !== GAME_PHASES.INITIAL_SELECTION && !isLearningMode && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Top Winning Hands:</h2>
                    {handsToShow.map((winningHand) => {
                        const missing = findMissingTiles(handAsArray, winningHand);
                        const result = probabilities[winningHand.name] || { prob: 0, value: 0 };
                        
                        const isTargeted = targetHand && targetHand.name === winningHand.name;

                        return (
                            <div 
                                key={winningHand.name} 
                                onClick={() => {
                                    setTargetHand(winningHand);
                                    setTilesToPass([]);
                                }}
                                style={{ 
                                    marginBottom: '15px', 
                                    padding: '10px', 
                                    borderBottom: '1px solid #eee', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: isTargeted ? '#e7f3ff' : 'transparent',
                                    border: isTargeted ? '1px solid #007bff' : '1px solid transparent',
                                    borderRadius: '8px'
                                }}
                            >
                                <HandDisplay 
                                    name={winningHand.name} 
                                    variation={winningHand.bestVariation || winningHand.variations[0]} 
                                />
                                {winningHand.isConcealed && (
                                    <span className="concealed-tag">CONCEALED</span>
                                )}
                                <div style={{ marginLeft: '20px', display: 'flex', gap: '20px' }}>
                                    <div>
                                        <strong>Probability:</strong>
                                        <div>{(result.prob * 100)?.toFixed(1)}%</div>
                                    </div>
                                    <div>
                                        <strong>Strategic Value:</strong>
                                        <div>{result.value?.toFixed(1)}</div>
                                    </div>
                                </div>
                                {gamePhase === GAME_PHASES.GAME_STARTED && (
                                    <MissingTilesGrid missingTiles={missing} />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Home;
