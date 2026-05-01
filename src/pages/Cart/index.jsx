import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import '../../styles/Cart.css';

/**
 * Cart Page Component
 * Displays shopping cart items with quantity controls
 */
function Cart() {
  const { cart, totalItems, totalPrice, removeFromCart, updateCartQuantity, clearCart } = useStore();

  const handleQuantityChange = (productId, quantity) => {
    const numQuantity = Number(quantity);
    if (numQuantity > 0) {
      updateCartQuantity(productId, numQuantity);
    }
  };

  return (
    <main className="cart-page">
      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>Add some items to get started!</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          {/* Cart Items */}
          <section className="cart-items">
            <h2>Items in Cart ({totalItems})</h2>

            <div className="cart-items-list">
              {cart.map(({ product, quantity }) => (
                <div className="cart-item" key={product.id}>
                  {/* Product Image */}
                  <div className="cart-item-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  {/* Product Details */}
                  <div className="cart-item-details">
                    <h3>{product.name}</h3>
                    <p className="category">{product.category}</p>
                    <p className="price">${product.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Control */}
                  <div className="cart-quantity-control">
                    <label>Quantity:</label>
                    <div className="quantity-input">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        className="qty-input"
                      />
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="cart-item-total">
                    <p className="total-label">Subtotal:</p>
                    <p className="total-price">
                      ${(quantity * product.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="btn-remove"
                    onClick={() => removeFromCart(product.id)}
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Cart Summary */}
          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax (10%)</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>${(totalPrice * 1.1).toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-full">
              Proceed to Checkout
            </Link>
            <button onClick={clearCart} className="btn btn-secondary btn-full">
              Clear Cart
            </button>
            <Link to="/products" className="btn btn-secondary btn-full">
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
