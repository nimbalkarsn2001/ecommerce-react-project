import React from 'react';

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist, isInCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="product-action">
          <button onClick={() => onAddToCart(product)} disabled={isInCart}>
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
          <button
            className="btn-secondary"
            onClick={() => onToggleWishlist(product)}
          >
            {isInWishlist ? 'Remove Wishlist' : 'Add Wishlist'}
          </button>
        </div>
      </div>
    </article>
  );
}
