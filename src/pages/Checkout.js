import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

function Checkout() {
  const { cart, totalPrice, clearCart } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cardNumber || !expiry || !cvv) {
      setMessage('Please fill in all payment fields.');
      return;
    }
    setMessage('Payment successful! Thank you for your order.');
    clearCart();
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <main className="content">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add products before checking out.</p>
      ) : (
        <section className="checkout-grid">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
              {cart.map(({ product, quantity }) => (
                <li key={product.id}>
                  {product.name} x {quantity} = ${(product.price * quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="total">Total: ${totalPrice.toFixed(2)}</p>
          </div>

          <div className="payment-form">
            <h2>Payment Information</h2>
            {message && <p className="success">{message}</p>}
            <form onSubmit={handleSubmit}>
              <label>
                Full Name
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label>
                Card Number
                <input
                  type="text"
                  maxLength="19"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                Expiry Date
                <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
              </label>
              <label>
                CVV
                <input type="password" maxLength="4" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
              </label>
              <button className="btn" type="submit">
                Pay ${totalPrice.toFixed(2)}
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}

export default Checkout;
