// src/pages/Home.jsx
import React, { useState, useEffect, useMemo } from 'react';
import TileGrid from '../components/TileGrid';
import Hand from '../components/Hand';
import { getCharlestonRecommendation } from '../helpers/charlestonHelper';
import { winningHandsData, availableYears } from '../data/winningHands';
import tiles from '../data/tiles';
import HandDisplay from '../components/HandDisplay';
import calculateProbabilities from '../helpers/probabilityCalculator';
import MissingTilesGrid from '../components/MissingTilesGrid';
import { findMissingTiles } from '../helpers/findMissingTiles';

const GAME_PHASES = {
    INITIAL_SELECTION: 'INITIAL_SELECTION',
    CHARLESTON_PASS: 'CHARLESTON_PASS',
    CHARLESTON_GET: 'CHARLESTON_GET',
    CHARLESTON_DECISION: 'CHARLESTON_DECISION',
    FINAL_PASS: 'FINAL_PASS',
    FINAL_GET: 'FINAL_GET',
    GAME_STARTED: 'GAME_STARTED',
};

const charlestonSteps = [
    { direction: 'Right', pass: 1 }, { direction: 'Across', pass: 2 }, { direction: 'Left', pass: 3 },
    { direction: 'Left', pass: 4 }, { direction: 'Across', pass: 5 }, { direction: 'Right', pass: 6 },
];

function Home() {
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
    const [finalPassCount, setFinalPassCount] = useState(0);

    const maxHandSize = isDealer ? 14 : 13;

    const handAsArray = useMemo(() => {
        return Object.entries(playerHand).flatMap(([tileId, quantity]) => {
            const tileData = tiles.find(t => t.id === tileId);
            return tileData ? Array(quantity).fill(tileData) : [];
        });
    }, [playerHand]);

    useEffect(() => {
        if (handAsArray.length < 13 || gamePhase === GAME_PHASES.GAME_STARTED) return;

        try {
            // --- THIS IS THE FIX ---
            // The calculator now only needs the hand and the winning hands data.
            const newResults = calculateProbabilities(handAsArray, activeWinningHands);
            setProbabilities(newResults);

            const handsWithMetrics = activeWinningHands.map(hand => ({
                ...hand,
                prob: newResults[hand.name]?.prob || 0,
                value: newResults[hand.name]?.value || 0,
            }));
            
            handsWithMetrics.sort((a, b) => b.prob - a.prob);
            setSortedHands(handsWithMetrics);
            
            setTargetHand(null);

            if (gamePhase === GAME_PHASES.CHARLESTON_DECISION) {
                const decision = getCharlestonRecommendation(handsWithMetrics);
                setCharlestonDecision(decision);
            }
        } catch (error) {
            console.error("An error occurred during probability calculation:", error);
        }
    }, [playerHand, gamePhase, charlestonPassIndex, activeWinningHands, handAsArray]);

    const activeTopHand = targetHand || sortedHands[0];

    const totalTileCount = useMemo(() => {
        return Object.values(playerHand).reduce((sum, count) => sum + count, 0);
    }, [playerHand]);

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
    
    const startCharleston = () => setGamePhase(GAME_PHASES.CHARLESTON_PASS);
    
    const goBackToSelection = () => {
        setGamePhase(GAME_PHASES.INITIAL_SELECTION);
        setCharlestonPassIndex(0);
    };

    const handleSelectTileToPass = (instanceKey) => {
        setTilesToPass(prev => {
            if (prev.includes(instanceKey)) return prev.filter(key => key !== instanceKey);
            const limit = 3;
            if (prev.length < limit) return [...prev, instanceKey];
            return prev;
        });
    };

    const handleExchange = () => {
        if (gamePhase === GAME_PHASES.FINAL_PASS && tilesToPass.length === 0) {
            setGamePhase(GAME_PHASES.GAME_STARTED);
            return;
        }

        const newHand = { ...playerHand };
        tilesToPass.forEach(instanceKey => {
            const tileId = instanceKey.split('-')[0];
            newHand[tileId] -= 1;
            if (newHand[tileId] === 0) delete newHand[tileId];
        });
        setPlayerHand(newHand);
        setReceivedTiles({});
        
        if (gamePhase === GAME_PHASES.FINAL_PASS) {
            setFinalPassCount(tilesToPass.length);
            setGamePhase(GAME_PHASES.FINAL_GET);
        } else {
            setGamePhase(GAME_PHASES.CHARLESTON_GET);
        }
        setTilesToPass([]);
    };

    const handleSelectReceivedTile = (tile, action) => {
        const totalReceived = Object.values(receivedTiles).reduce((s, c) => s + c, 0);
        const currentCount = receivedTiles[tile.id] || 0;
        const limit = gamePhase === GAME_PHASES.FINAL_GET ? finalPassCount : 3;

        if (action === 'increment' && totalReceived < limit) {
            setReceivedTiles(prev => ({ ...prev, [tile.id]: currentCount + 1 }));
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
        const newHand = { ...playerHand };
        Object.entries(receivedTiles).forEach(([tileId, quantity]) => {
            newHand[tileId] = (newHand[tileId] || 0) + quantity;
        });
        setPlayerHand(newHand);
        setReceivedTiles({});

        if (gamePhase === GAME_PHASES.FINAL_GET) {
            setGamePhase(GAME_PHASES.GAME_STARTED);
        } else if (charlestonPassIndex === 2) {
            setCharlestonPassIndex(prev => prev + 1);
            setGamePhase(GAME_PHASES.CHARLESTON_DECISION);
        } else if (charlestonPassIndex === 5) {
            setGamePhase(GAME_PHASES.FINAL_PASS);
        } else {
            setCharlestonPassIndex(prev => prev + 1);
            setGamePhase(GAME_PHASES.CHARLESTON_PASS);
        }
    };
    
    const continueCharleston = () => {
        setGamePhase(GAME_PHASES.CHARLESTON_PASS);
    };

    const skipSecondCharleston = () => setGamePhase(GAME_PHASES.FINAL_PASS);

    const totalReceivedCount = Object.values(receivedTiles).reduce((s, c) => s + c, 0);
    const currentStep = charlestonSteps[charlestonPassIndex];

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

    const PageHeader = ({ title }) => (
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
            <h1>{title}</h1>
            <img src="/logo2.png" alt="Logo" style={{ height: '80px' }} />
        </div>
    );

    return (
        <div>
            {gamePhase === GAME_PHASES.INITIAL_SELECTION && (
                <>
                    <PageHeader title={`Select Your ${maxHandSize} Tiles (${totalTileCount} / ${maxHandSize})`} />
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
                                {[8, 9, 10].map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="blanks-select">Blanks: </label>
                            <select id="blanks-select" value={blankCount} onChange={e => setBlankCount(parseInt(e.target.value))}>
                                {[0, 2, 4, 6].map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                    </div>
                    <TileGrid onQuantityChange={handleQuantityChange} selectedTiles={playerHand} blankCount={blankCount} />
                    <button onClick={startCharleston} disabled={totalTileCount !== maxHandSize}>
                        Confirm Hand & Start Charleston
                    </button>
                </>
            )}

            {(gamePhase === GAME_PHASES.CHARLESTON_PASS || gamePhase === GAME_PHASES.FINAL_PASS || gamePhase === GAME_PHASES.GAME_STARTED) && (
                 <>
                    {gamePhase === GAME_PHASES.CHARLESTON_PASS && <PageHeader title={`Charleston: Pass 3 to the ${currentStep.direction}`} />}
                    {gamePhase === GAME_PHASES.FINAL_PASS && <PageHeader title={`Final Pass Across (up to 3 tiles)`} />}
                    {gamePhase === GAME_PHASES.GAME_STARTED && <PageHeader title="Your Final Hand" />}
                    
                    {gamePhase !== GAME_PHASES.GAME_STARTED && (
                        <button onClick={goBackToSelection} style={{marginBottom: '10px', marginLeft: '20px'}}>
                            &larr; Edit Hand
                        </button>
                    )}

                    <Hand
                        hand={playerHand}
                        onTileClick={handleSelectTileToPass}
                        selectedForAction={tilesToPass}
                        topHand={activeTopHand}
                    />
                    {gamePhase === GAME_PHASES.CHARLESTON_PASS && (
                         <button onClick={handleExchange} disabled={tilesToPass.length !== 3}>
                            Exchange
                        </button>
                    )}
                     {gamePhase === GAME_PHASES.FINAL_PASS && (
                        <button onClick={handleExchange}>
                            Exchange
                        </button>
                    )}
                </>
            )}
            
            {gamePhase === GAME_PHASES.CHARLESTON_DECISION && (
                <>
                    <PageHeader title="Charleston Decision" />
                     <button onClick={goBackToSelection} style={{marginBottom: '10px', marginLeft: '20px'}}>
                        &larr; Edit Hand
                    </button>
                    <Hand hand={playerHand} topHand={activeTopHand} />
                    <div style={{ margin: '20px', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                        <h3>Recommendation: <span style={{ color: charlestonDecision.action === 'skip' ? 'red' : 'green' }}>{charlestonDecision.action.toUpperCase()}</span></h3>
                        <p>{charlestonDecision.reason}</p>
                        <button onClick={continueCharleston}>Continue to Second Charleston</button>
                        <button onClick={skipSecondCharleston} style={{ marginLeft: '10px' }}>Skip Second Charleston</button>
                    </div>
                </>
            )}
            
            {(gamePhase === GAME_PHASES.CHARLESTON_GET || gamePhase === GAME_PHASES.FINAL_GET) && (
                <>
                    <PageHeader title={
                        gamePhase === GAME_PHASES.FINAL_GET
                            ? `Select ${finalPassCount} Tiles You Received`
                            : `Charleston: Select 3 Tiles You Received`
                        } 
                    />
                    <TileGrid 
                        onQuantityChange={handleSelectReceivedTile} 
                        selectedTiles={receivedTiles} 
                        blankCount={blankCount}
                    />
                    <button 
                        onClick={handleConfirmReceived}
                        disabled={
                            gamePhase === GAME_PHASES.FINAL_GET
                            ? totalReceivedCount !== finalPassCount
                            : totalReceivedCount !== 3
                        }
                    >
                        Confirm Received Tiles
                    </button>
                </>
            )}
            
            {gamePhase !== GAME_PHASES.INITIAL_SELECTION && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Top Winning Hands:</h2>
                    {handsToShow.map((winningHand) => {
                        const bestVariation = winningHand.variations[0];
                        const missing = findMissingTiles(handAsArray, winningHand);
                        const result = probabilities[winningHand.name] || { prob: 0, value: 0 };
                        
                        const isTargeted = targetHand && targetHand.name === winningHand.name;

                        return (
                            <div 
                                key={winningHand.name} 
                                onClick={() => setTargetHand(winningHand)}
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
                                    variation={bestVariation} 
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
