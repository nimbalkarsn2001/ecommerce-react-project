import React from 'react';
import '../styles/ProductCard.css';
/**
 * ProductCard Component
 * Displays individual product with image, price, and action buttons
 */
export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  isInCart
}) {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <div className="product-badge">
          {product.stock > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-stock">Out of Stock</span>
          )}
        </div>
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>

        <div className="product-price">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="stock-count">({product.stock} left)</span>
        </div>

        <div className="product-actions">
          <button
            className={`btn-primary ${isInCart ? 'in-cart' : ''}`}
            onClick={() => onAddToCart(product)}
            disabled={isInCart || product.stock === 0}
            title={isInCart ? 'Already in cart' : 'Add to cart'}
          >
            {isInCart ? '✓ In Cart' : '🛒 Add to Cart'}
          </button>

          <button
            className={`btn-secondary ${isInWishlist ? 'active' : ''}`}
            onClick={() => onToggleWishlist(product)}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist ? '❤️ Saved' : '🤍 Save'}
          </button>
        </div>
      </div>
    </article>
  );
}
