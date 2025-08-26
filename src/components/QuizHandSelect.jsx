// src/components/QuizHandSelect.jsx
import React, { useMemo } from 'react';
import Hand from './Hand';
import HandDisplay from './HandDisplay';

function QuizHandSelect({ hand, section, allHands, onHandSelect, pickNumber, onBack }) {
    // Filter to show only the hands from the section the user selected
    const handsInSection = useMemo(() => {
        return allHands.filter(h => h.name.startsWith(section));
    }, [section, allHands]);

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '20px auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Quiz: Pick {pickNumber} of 3</h1>
                <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>You selected the "{section}" section. Now, choose the specific hand you think is best.</p>
            </div>
            
            {/* Display the random hand */}
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                <Hand hand={hand} simpleView={true} />
            </div>

            {/* Display the hands from the selected section */}
            <div>
                {handsInSection.map((winningHand) => (
                    <div 
                        key={winningHand.name} 
                        onClick={() => onHandSelect(winningHand)}
                        style={{ 
                            marginBottom: '15px', 
                            padding: '15px', 
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            display: 'flex', 
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e7f3ff'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
                    >
                        <HandDisplay 
                            name={winningHand.name} 
                            variation={winningHand.variations[0]} 
                        />
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <button 
                    className="btn-neutral" 
                    onClick={onBack}
                >
                    &larr; Back to Sections
                </button>
            </div>
        </div>
    );
}

export default QuizHandSelect;
