import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { StoreProvider, useStore } from "./context/StoreContext";

import Layout from "./component/Layout";
import ProtectedRoute from "./component/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

import "./App.css";

function AppRoutes() {
  const { restoreUserFromStorage } = useStore();

  useEffect(() => {
    restoreUserFromStorage();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />

      <Route path="/products" element={
        <Layout>
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        </Layout>
      } />

      <Route path="/wishlist" element={
        <Layout>
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        </Layout>
      } />

      <Route path="/cart" element={
        <Layout>
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </Layout>
      } />

      <Route path="/checkout" element={
        <Layout>
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        </Layout>
      } />

      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
}

export default App;