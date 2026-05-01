import React from 'react';
import { Header } from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/Layout.css';

/**
 * MainLayout Component - Wraps pages with Header and Footer
 * All pages except Login and Signup use this layout
 */
const MainLayout = ({ children }) => { 
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

export default MainLayout;
