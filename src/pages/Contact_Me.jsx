// src/pages/Contact_Me.jsx (UPDATED)
import React from 'react';
import PageHeader from '../components/PageHeader'; // Import the new component

function ContactMe({ onMenuToggle }) {
  return (
    <div>
      <PageHeader title="Contact Me" onMenuToggle={onMenuToggle} />
      <div style={{padding: '20px'}}>
        <p>This is the contact page. Add more content here.</p>
      </div>
    </div>
  );
}
export default ContactMe;