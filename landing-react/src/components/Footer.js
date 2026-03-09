import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">+</span>
              <span className="logo-text">Dementia Care</span>
            </div>
            <p>Empowering care through intelligent technology</p>
          </div>

          <div className="footer-section">
            <h4>Product</h4>
            <Link to="/features">Features</Link>
            <a href="http://localhost:8000/docs">API Docs</a>
            <a href="/documentation">Documentation</a>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <a href="/USER_GUIDE.md">User Guide</a>
            <a href="/SETUP_GUIDE.md">Setup Guide</a>
            <a href="http://localhost:3000">Dashboard</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Dementia Care System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
