// src/pages/Contact_Me.jsx
import React from 'react';
import PageHeader from '../components/PageHeader';
import logo from '../assets/logo2.png';
import './Contact_Me.css'; // Import the CSS file

function ContactMe({ onMenuToggle }) {
  return (
    <div>
      <PageHeader title="Contact Me" onMenuToggle={onMenuToggle} />
      <div className="contact-page-content">
        
        <div 
          className="contact-background" 
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
        
        <div className="contact-text">
            <h2>Get in Touch</h2>
            
            <p>
              Spotted a bug? Did the app suggest you pass three Jokers? Or maybe it calculated your odds of winning at 200%? While I strive for perfection, sometimes the tiles just don't fall into place.
            </p>
            <p>
              If you've found an issue, have a suggestion, or just want to say hello, please don't hesitate to reach out. Your feedback is incredibly valuable for making this tool better for everyone!
            </p>

            <div className="contact-info">
              <h4>Ricardo Behrens</h4>
              <p>
                <strong>Email:</strong> <a href="mailto:behrensricardo@gmail.com">behrensricardo@gmail.com</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:+17208788948">(720) 878-8948</a>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;
