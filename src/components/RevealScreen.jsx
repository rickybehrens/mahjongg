// src/components/RevealScreen.jsx
import React from 'react';
import Hand from './Hand';
import { tileImageMap } from '../helpers/tileImageMap';
import tiles from '../data/tiles'; // Import the main tiles data

// FIX: Added a helper function to find the correct key for the tileImageMap
function getTileImageKey(tileId) {
    const tileData = tiles.find(t => t.id === tileId);
    if (!tileData) return null;
    if (tileData.id === 'SOAP') return 'White Dragon';
    if (tileData.id === 'WD') return 'White Dragon';
    if (['Wind', 'Flower', 'Joker', 'Blank'].includes(tileData.suit)) {
        return tileData.value;
    }
    if (String(tileData.value).includes('Dragon')) {
        return tileData.value;
    }
    if (typeof tileData.value === 'number') {
        const suitShortName = tileData.suit === 'Bamboo' ? 'Bam' : tileData.suit;
        return `${tileData.value} ${suitShortName}`;
    }
    return tileData.id;
}

// A small component to render a list of passed tiles
function PassDisplay({ tileKeys }) {
    if (!tileKeys || tileKeys.length === 0) {
        return <span>None</span>;
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
            {tileKeys.map(key => {
                const tileId = key.split('-')[0];
                // FIX: Use the helper function to get the correct image key
                const imageKey = getTileImageKey(tileId);
                const imageUrl = tileImageMap[imageKey];
                if (!imageUrl) return null;
                return <img key={key} src={imageUrl} alt={tileId} style={{ width: '30px', height: 'auto', borderRadius: '4px' }} />;
            })}
        </div>
    );
}


function RevealScreen({ playerHand, ghostHand, history, onStartNewGame }) {
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Charleston Review</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                <div>
                    <h2>Your Final Hand</h2>
                    {/* FIX: Pass simpleView prop to render without highlights */}
                    <Hand hand={playerHand} simpleView={true} />
                </div>
                <div>
                    <h2>App's Optimized Hand</h2>
                    {/* FIX: Pass simpleView prop to render without highlights */}
                    <Hand hand={ghostHand} simpleView={true} />
                </div>
            </div>

            <hr style={{ margin: '40px 0' }} />

            <div>
                <h2 style={{ marginBottom: '20px' }}>Step-by-Step Comparison</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #333' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Pass</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>You Passed</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>App Passed (Optimal)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.step}</td>
                                <td style={{ padding: '10px' }}><PassDisplay tileKeys={item.playerPass} /></td>
                                <td style={{ padding: '10px' }}><PassDisplay tileKeys={item.ghostPass} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button className="btn-confirm" onClick={onStartNewGame}>
                    Start New Game
                </button>
            </div>
        </div>
    );
}

export default RevealScreen;
