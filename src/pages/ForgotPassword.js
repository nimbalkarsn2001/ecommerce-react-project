import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }
    setMessage('If this email is registered, we sent reset instructions.');
    setTimeout(() => navigate('/login'), 1800);
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <h2>Forgot Password</h2>
        {message && <p className="success">{message}</p>}
        <form onSubmit={handleReset} className="login-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-pill"
            required
          />
          <button type="submit" className="btn login-btn">
            Reset Password
          </button>
        </form>
        <p className="login-help">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;
