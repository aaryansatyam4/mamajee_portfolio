import React from 'react';
import './Footer.css';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <h3 className="footer-title">Stay Connected</h3>
        <p className="footer-description">Feel free to follow me on social media for more updates.</p>

        <div className="footer-social-links">
          <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaInstagram />
          </a>
          <a href="https://www.twitter.com/your-profile" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaTwitter />
          </a>
          <a href="https://www.facebook.com/your-profile" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaFacebook />
          </a>
        </div>

        <div className="footer-copyright">
          <p>&copy; 2024 Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
