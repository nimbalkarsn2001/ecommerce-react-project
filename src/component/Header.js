import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const Header = () => {
  const { totalItems, wishlist, user, authLogout } = useStore();

  return (
    <header className="navbar">
      <div className="navbar-brand">EcommerceApp</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/products" className="nav-link">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link">
            Cart ({totalItems})
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/wishlist" className="nav-link">
            Wishlist ({wishlist.length})
          </NavLink>
        </li>
        {!user ? (
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        ) : (
          <li className="nav-item">
            <button className="nav-link btn-link" onClick={authLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};
