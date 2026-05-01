import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import '../../styles/Auth/Register.css';

/**
 * Signup Page Component
 * Handles new user registration
 */
function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { authSignup, loading } = useStore();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Build API payload (exclude confirmPassword)
    const { confirmPassword, ...apiPayload } = formData;

    const result = await authSignup(apiPayload);

    if (!result.status) {
      setError(result.message);
      return;
    }

    setSuccess(result.message);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box auth-box-large">
        <h1>✨ Create Account</h1>
        <p className="auth-subtitle">Join us and start shopping</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">

          {/* First Name Field */}
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Last Name Field */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
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

          {/* Mobile Number Field */}
          <div className="form-group">
            <label htmlFor="mobileNo">Mobile Number</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="tel"
                id="mobileNo"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="9876543210"
                required
                maxLength={10}
                disabled={loading}
              />
            </div>
          </div>

          {/* Gender Field */}
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗯️'}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗯️'}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="terms">
              I agree to the{' '}
              <a href="#terms" className="link">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="#privacy" className="link">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-submit"
            disabled={loading || !agreedToTerms}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
