import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import '../styles/Pages.css';

/**
 * Checkout Page
 * Handles payment and order finalization
 */
function Checkout() {
  const { cart, totalPrice, clearCart } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate form
    if (!Object.values(formData).every((field) => field.trim())) {
      setMessage('Please fill in all fields.');
      setMessageType('error');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setMessage('✓ Payment successful! Thank you for your order.');
      setMessageType('success');
      clearCart();
      setTimeout(() => navigate('/'), 2000);
    }, 1500);
  };

  const finalTotal = totalPrice * 1.1; // Including tax

  return (
    <main className="page-content">
      <h1>🛒 Checkout</h1>

      {cart.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="checkout-container">
          {/* Order Summary */}
          <div className="checkout-section">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.map(({ product, quantity }) => (
                <div className="order-item" key={product.id}>
                  <span>{product.name} x {quantity}</span>
                  <span>${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (10%):</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="total-row final-total">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="checkout-section">
            <h2>Billing & Payment</h2>
            {message && <div className={`alert alert-${messageType}`}>{message}</div>}

            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Billing Information */}
              <fieldset>
                <legend>Billing Information</legend>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Payment Information */}
              <fieldset>
                <legend>Payment Information</legend>

                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="password"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Payment...' : `Pay $${finalTotal.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Checkout;
