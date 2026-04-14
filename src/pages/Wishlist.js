import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../component/ProductCard';
import '../styles/Products.css';

/**
 * Wishlist Page Component
 * Displays saved products
 */
function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, isInCart, isInWishlist, addToWishlist } = useStore();

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <main className="products-page">
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">🤍</p>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite items to view them later</p>
          <Link to="/products" className="btn btn-primary">
            Start Adding
          </Link>
        </div>
      ) : (
        <>
          <p className="section-subtitle">{wishlist.length} item(s) in your wishlist</p>
          <div className="products-grid">
            {wishlist.map((product) => (
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
        </>
      )}
    </main>
  );
}

export default Wishlist;
