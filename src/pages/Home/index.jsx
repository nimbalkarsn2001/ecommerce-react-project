import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import ProductCard from '../../components/product/ProductCard';
import '../../styles/Home.css';

/**
 * Home Page Component
 * Displays featured products and welcome message
 */
function Home() {
  const {
    products,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInCart,
    isInWishlist,
    user,
  } = useStore();

  // Get featured products (first 6)
  const featuredProducts = useMemo(() => products.slice(0, 6), [products]);

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to EcommerceHub</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <div className="hero-buttons">
            {user ? (
              <>
                <Link to="/products" className="btn btn-primary">
                  🛍️ Shop Now
                </Link>
                <Link to="/cart" className="btn btn-secondary">
                  🛒 View Cart
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  🔐 Sign In
                </Link>
                <Link to="/signup" className="btn btn-secondary">
                  ✨ Create Account
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <span className="hero-emoji">🛒</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Fast Shipping</h3>
          <p>Quick delivery to your doorstep</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔐</div>
          <h3>Secure Payment</h3>
          <p>Safe and encrypted transactions</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">↩️</div>
          <h3>Easy Returns</h3>
          <p>Hassle-free return policy</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>24/7 Support</h3>
          <p>Dedicated customer support</p>
        </div>
      </section>

      {/* Featured Products Section */}
      {user && (
        <section className="featured-products">
          <h2>🌟 Featured Products</h2>
          <p className="section-subtitle">Check out our bestselling items</p>

          {featuredProducts.length === 0 ? (
            <div className="empty-message">
              <p>No products available.</p>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist(product.id)}
                  isInCart={isInCart(product.id)}
                />
              ))}
            </div>
          )}

          <div className="view-all">
            <Link to="/products" className="btn btn-primary btn-large">
              View All Products →
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to find your favorite products?</h2>
        {user ? (
          <Link to="/products" className="btn btn-primary btn-large">
            Start Shopping
          </Link>
        ) : (
          <Link to="/signup" className="btn btn-primary btn-large">
            Create Account to Shop
          </Link>
        )}
      </section>
    </main>
  );
}

export default Home;
