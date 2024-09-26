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
          <a href="https://www.linkedin.com/in/ashish-sinha-b681791a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaInstagram />
          </a>
        </div>

        <div className="footer-copyright">
          <p></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
