// src/components/QuizSectionSelect.jsx
import React, { useMemo } from 'react';
import Hand from './Hand';
import { winningHandsData, availableYears } from '../data/winningHands';

function QuizSectionSelect({ hand, onSectionSelect, pickNumber, onExit }) {
    // This logic extracts the unique section names from your hand data.
    // e.g., "2468", "Consecutive Run", "13579"
    const sections = useMemo(() => {
        const uniqueSections = new Set();
        // Correctly iterate over the hands to extract section names
        for (const hand of winningHandsData[availableYears[0]]) {
            const sectionName = hand.name.split(' - ')[0];
            if (!uniqueSections.has(sectionName)) {
                uniqueSections.add(sectionName);
            }
        }
        return Array.from(uniqueSections);
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '20px auto', textAlign: 'center' }}>
            <h1>Quiz: Pick {pickNumber} of 3</h1>
            <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>Based on the hand below, which section holds your most promising hand?</p>
            
            {/* Display the random hand */}
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                <Hand hand={hand} simpleView={true} />
            </div>

            {/* Display the section buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                {sections.map(section => (
                    <button 
                        key={section}
                        className="btn-neutral"
                        onClick={() => onSectionSelect(section)}
                        style={{ fontSize: '1.1em', padding: '12px 20px', minWidth: '200px' }}
                    >
                        {section}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '40px' }}>
                <button 
                    className="btn-cancel" 
                    onClick={onExit}
                >
                    Exit Quiz
                </button>
            </div>
        </div>
    );
}

export default QuizSectionSelect;
