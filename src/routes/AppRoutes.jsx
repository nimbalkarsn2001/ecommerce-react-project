import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Checkout from '../pages/Checkout';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import NotFound from '../pages/NotFound';
import AuthLayout from '../layouts/AuthLayout';

/**
 * AppRoutes Component
 * Defines all application routes and layout structure
 */
function AppRoutes() {
  const { restoreUserFromStorage } = useStore();

  useEffect(() => {
    restoreUserFromStorage();
  }, []);

  return (
    <Routes>
      {/* Public Routes (with layout) */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

      <Route element={<AuthLayout />}>
        {/* If they hit /auth, redirect to login */}
        <Route path="/auth" element={<Navigate to="login" replace />} />

        {/* These pages render INSIDE the AuthLayout's <Outlet /> */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes (with layout) */}
      <Route path="/products" element={
        <MainLayout>
          {/* <ProtectedRoute> */}
            <Products />
          {/* </ProtectedRoute> */}
        </MainLayout>
      } />

      <Route path="/wishlist" element={
        <MainLayout>
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        </MainLayout>
      } />

      <Route path="/cart" element={
        <MainLayout>
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </MainLayout>
      } />

      <Route path="/checkout" element={
        <MainLayout>
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        </MainLayout>
      } />

      {/* 404 Not Found */}
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
}

export default AppRoutes;
