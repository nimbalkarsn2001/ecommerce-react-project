import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useStore();

  return (
    <main className="content">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="empty-message">
          <p>Your wishlist is empty.</p>
          <Link to="/products" className="btn">
            Start Adding
          </Link>
        </div>
      ) : (
        <section className="wishlist-items">
          {wishlist.map((product) => (
            <div className="cart-row" key={product.id}>
              <img src={product.image} alt={product.name} className="cart-image" />
              <div className="cart-info">
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <div className="wishlist-actions">
                  <button
                    className="btn"
                    onClick={() => addToCart(product)}
                    disabled={isInCart(product.id)}
                  >
                    {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button className="btn-secondary" onClick={() => removeFromWishlist(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default Wishlist;
