// src/App.jsx
import React from 'react';
import Home from './pages/Home';
import './App.css';

function App() {
  console.log('App component is rendering'); // Add this line

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;