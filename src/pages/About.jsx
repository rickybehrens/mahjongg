// src/pages/About.jsx (UPDATED)
import React from 'react';
import PageHeader from '../components/PageHeader'; // Import the new component

function About({ onMenuToggle }) {
  return (
    <div>
      <PageHeader title="About" onMenuToggle={onMenuToggle} />
      <div style={{padding: '20px'}}>
        <p>This is the about page. Add more content here.</p>
      </div>
    </div>
  );
}
export default About;