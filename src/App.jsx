import React from 'react';
import { StoreProvider } from './context/StoreContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

/**
 * App Component
 * Main application wrapper with global state provider
 */
function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
}

export default App;
