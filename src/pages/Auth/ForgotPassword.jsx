import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Forgot Password Page
 * Handles password reset request and renders inside AuthLayout
 */
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate email
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Simulate sending reset email
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  // --- SUCCESS STATE UI ---
  if (submitted) {
    return (
      <div className="auth-box">
        <div className="auth-header">
          <h1>Check Your Email</h1>
          <p className="auth-subtitle">Password reset instructions sent</p>
        </div>

        <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
          We've sent password reset instructions to <strong>{email}</strong>. Please check your email
          and follow the link to reset your password.
        </div>

        <p style={{ textAlign: 'center', color: 'var(--auth-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Didn't receive the email? Check your spam folder or{' '}
          <button
            onClick={() => {
              setSubmitted(false);
              setEmail('');
            }}
            className="auth-link"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontSize: 'inherit',
              fontFamily: 'inherit'
            }}
          >
            try again
          </button>
        </p>

        <Link to="/login" className="btn-submit" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          Back to Login
        </Link>
      </div>
    );
  }

  // --- DEFAULT FORM UI ---
  return (
    <div className="auth-box">
      <div className="auth-header">
        <h1>Reset Password</h1>
        <p className="auth-subtitle">Enter your email to receive reset instructions</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <p className="auth-footer">
        Remember your password?{' '}
        <Link to="/login" className="auth-link">
          Sign in here
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;