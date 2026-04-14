import React from 'react';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About</h3>
          <p>Your trusted online destination for quality products and exceptional service.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/products">Products</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Policies</h3>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#shipping">Shipping Policy</a></li>
            <li><a href="#returns">Returns & Exchange</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>📧 support@ecommercehub.com</li>
            <li>📞 1-800-SHOP-NOW</li>
            <li>📍 123 Commerce Street, Shop City</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} EcommerceHub. All rights reserved.</p>
        <div className="social-links">
          <a href="#facebook" title="Facebook">f</a>
          <a href="#twitter" title="Twitter">𝕏</a>
          <a href="#instagram" title="Instagram">📷</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;