import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../styles/Auth/AuthLayout.css'; // We'll create this below

function AuthLayout() {
  return (
    <div className="auth-layout-wrapper">
      {/* --- Left Side: Common Branding (Stays fixed) --- */}
      <div className="auth-split auth-visual">
        <div className="visual-content">
          <Link to="/" className="brand-logo">🛍️ EcommerceHub</Link>
          <h2 className="visual-heading">Your journey starts here.</h2>
          <p className="visual-subtitle">
            Join thousands of shoppers and discover the best deals, personalized recommendations, and seamless checkout experiences.
          </p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>Fast & Secure Checkout</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📦</span>
              <span>Real-time Order Tracking</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Right Side: Dynamic Form Area (Changes based on route) --- */}
      <div className="auth-split auth-form-section">
        {/* The current route's component (Login, Signup, etc.) will render right here */}
        <Outlet /> 
      </div>
    </div>
  );
}

export default AuthLayout;