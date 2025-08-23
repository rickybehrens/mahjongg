// src/App.jsx
import React, { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Rules from './pages/Rules';
import ContactMe from './pages/Contact_Me';
import Tutorial from './pages/Tutorial'; // Import the new component
import SideMenu from './components/SideMenu';
import './App.css';
import './pages/Rules.css'; // Import the new CSS file

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About onMenuToggle={handleMenuToggle} />;
      case 'rules':
        return <Rules onMenuToggle={handleMenuToggle} />;
      case 'tutorial': // Add a new case for the tutorial page
        return <Tutorial onMenuToggle={handleMenuToggle} />;
      case 'contact':
        return <ContactMe onMenuToggle={handleMenuToggle} />;
      case 'home':
      default:
        return <Home onMenuToggle={handleMenuToggle} />;
    }
  };

  return (
    <div className="App">
      <SideMenu 
        isOpen={isMenuOpen} 
        onPageSelect={setCurrentPage}
        onClose={() => setIsMenuOpen(false)}
      />
      <main className={`main-content ${isMenuOpen ? 'menu-open' : ''}`}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;