import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Takes up 2 fraction units (2fr) */}
        <div className="footer-section brand-section">
          <h3>🛍️ EcommerceHub</h3>
          <p>Your trusted online destination for quality products and exceptional service. We believe in delivering the best shopping experience directly to your doorstep.</p>
        </div>

        {/* Takes up 1 fraction unit (1fr) */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </div>

        {/* Takes up 1 fraction unit (1fr) */}
        <div className="footer-section">
          <h3>Policies</h3>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#shipping">Shipping Policy</a></li>
            <li><a href="#returns">Returns & Exchange</a></li>
          </ul>
        </div>

        {/* Takes up 1 fraction unit (1fr) */}
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <ul>
            <li><span className="icon">📧</span> support@ecommercehub.com</li>
            <li><span className="icon">📞</span> 1-800-SHOP-NOW</li>
            <li><span className="icon">📍</span> 123 Commerce St, Shop City</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} EcommerceHub. All rights reserved.</p>
        <div className="social-links">
          <a href="#facebook" title="Facebook" aria-label="Facebook">f</a>
          <a href="#twitter" title="Twitter" aria-label="Twitter">𝕏</a>
          <a href="#instagram" title="Instagram" aria-label="Instagram">📷</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;