// src/components/QuizIntro.jsx
import React from 'react';

function QuizIntro({ onStartQuiz, onExit }) {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '40px auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h1>Mah Jongg Quiz Mode</h1>
            <p style={{ fontSize: '1.1em', lineHeight: '1.6', margin: '20px 0' }}>
                Test your pattern recognition skills! You will be given a random 13-tile hand. Your goal is to find the top 3 most promising hands based on the tiles you were dealt.
            </p>
            <div style={{ marginTop: '30px' }}>
                <button 
                    className="btn-confirm" 
                    onClick={onStartQuiz}
                    style={{ marginRight: '15px', fontSize: '1.2em', padding: '12px 24px' }}
                >
                    Start Quiz
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

export default QuizIntro;
