import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

/**
 * 404 Not Found Page
 */
function NotFound() {
  return (
    <main className="page-content error-page">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>

        <Link to="/" className="btn btn-primary btn-large">
          Go Back Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
