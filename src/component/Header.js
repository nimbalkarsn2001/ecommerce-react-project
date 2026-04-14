import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import '../styles/Header.css';

export const Header = () => {
  const { totalItems, wishlist, user, authLogout } = useStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authLogout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          🛍️ EcommerceHub
        </NavLink>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </div>

        {/* Navigation Menu */}
        <ul className={`navbar-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* Home Link */}
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
              onClick={closeMobileMenu}
            >
              🏠 Home
            </NavLink>
          </li>

          {/* Product Links - Only for authenticated users */}
          {user ? (
            <>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  📦 Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  ❤️ Wishlist ({wishlist.length})
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  🛒 Cart ({totalItems})
                </NavLink>
              </li>
            </>
          ) : null}

          {/* Info Links */}
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              ℹ️ About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              📞 Contact
            </NavLink>
          </li>

          {/* Auth Section */}
          <li className="nav-item auth-item">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  🔐 Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => `nav-link nav-link-signup ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  ✨ Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <span className="user-welcome">👤 {user.name || user.email}</span>
                <button className="nav-link btn-logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};
