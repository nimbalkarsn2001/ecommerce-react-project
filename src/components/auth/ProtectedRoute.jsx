import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

/**
 * ProtectedRoute Component
 * Checks if user is authenticated before allowing access
 * Redirects to login if not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
