import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

function Cart() {
  const { cart, totalPrice, removeFromCart, updateCartQuantity, clearCart } = useStore();

  return (
    <main className="content">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-message">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <section className="cart-items">
            {cart.map(({ product, quantity }) => (
              <div className="cart-row" key={product.id}>
                <img src={product.image} alt={product.name} className="cart-image" />
                <div className="cart-info">
                  <h3>{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateCartQuantity(product.id, quantity - 1)}>-</button>
                    <input value={quantity} readOnly />
                    <button onClick={() => updateCartQuantity(product.id, quantity + 1)}>+</button>
                  </div>
                  <button className="btn-secondary" onClick={() => removeFromCart(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          <section className="checkout-box">
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button className="btn" onClick={clearCart}>
              Clear Cart
            </button>
            <Link to="/checkout" className="btn">
              Proceed to Checkout
            </Link>
          </section>
        </>
      )}
    </main>
  );
}

export default Cart;
