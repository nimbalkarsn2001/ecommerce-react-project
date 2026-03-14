import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="content">
      <h1>Welcome to the EcommerceApp</h1>
      <p>Browse the best products and manage your cart and wishlist with ease.</p>
      <div className="filters">
        <Link to="/products" className="btn">
          Start Shopping
        </Link>
      </div>
    </main>
  );
}

export default Home;