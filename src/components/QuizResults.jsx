// src/components/QuizResults.jsx
import React from 'react';
import Hand from './Hand';
import HandDisplay from './HandDisplay';

function QuizResults({ results, hand, onPlayAgain, onExit }) {
    if (!results) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Calculating results...</h2>
            </div>
        );
    }

    const { userPicks, appPicks, score } = results;

    const resultStyle = {
        padding: '15px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '20px auto', textAlign: 'center' }}>
            <h1>Quiz Results</h1>
            <h2 style={{ color: '#007bff', marginBottom: '20px' }}>You found {score} of the top 3 hands!</h2>

            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                <Hand hand={hand} simpleView={true} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', textAlign: 'left' }}>
                <div>
                    <h3>Your Picks:</h3>
                    {userPicks.map((pick, index) => (
                        <div key={index} style={resultStyle}>
                            <HandDisplay 
                                name={pick.name} 
                                variation={pick.bestVariation || pick.variations[0]} 
                            />
                            <strong>SV: {pick.value.toFixed(1)}</strong>
                        </div>
                    ))}
                </div>
                <div>
                    <h3>App's Top Picks:</h3>
                    {appPicks.map((pick, index) => (
                        <div key={index} style={resultStyle}>
                            <HandDisplay 
                                name={pick.name} 
                                variation={pick.bestVariation || pick.variations[0]} 
                            />
                            <strong>SV: {pick.value.toFixed(1)}</strong>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '40px' }}>
                <button 
                    className="btn-confirm" 
                    onClick={onPlayAgain}
                    style={{ marginRight: '15px', fontSize: '1.2em', padding: '12px 24px' }}
                >
                    Play Again
                </button>
                <button 
                    className="btn-neutral" 
                    onClick={onExit}
                     style={{ fontSize: '1.2em', padding: '12px 24px' }}
                >
                    Exit
                </button>
            </div>
        </div>
    );
}

export default QuizResults;
