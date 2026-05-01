import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import '../../styles/Auth.css';

/**
 * Login Page Component
 * Handles user authentication
 */

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { authLogin, loading } = useStore();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setError('');
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    const result = await authLogin(formData);

    if (!result.status) {
      setError(result.message);
      return;
    }

    setSuccess('Login successful! Redirecting...');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="input-wrapper">

              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={loading}
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>

            </div>
          </div>

          {/* Forgot Password */}
          <div className="forgot-password-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

        </form>

        {/* Signup Link */}
        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">
            Create one here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
