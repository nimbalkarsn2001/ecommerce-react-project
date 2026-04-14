import React from 'react';
import { Header } from './Header';
import Footer from './footer';
import '../styles/Layout.css';

/**
 * Layout Component - Wraps pages with Header and Footer
 * All pages except Login and Signup use this layout
 */
const Layout = ({ children }) => { 
  return ( 
    <div className="app-layout"> 
      <Header /> 
      <main className="layout-main"> 
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
