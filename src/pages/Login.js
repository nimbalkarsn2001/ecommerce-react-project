import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { authLogin } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = authLogin({ email, password });
    if (!result.status) {
      setError(result.message);
      return;
    }
    navigate('/');
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-pill"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-pill"
          />
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit" className="btn login-btn">
            Login
          </button>
        </form>
        <p className="login-help">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
