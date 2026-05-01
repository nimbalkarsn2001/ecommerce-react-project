import React from 'react';
import '../../styles/Pages.css';

/**
 * Professional About Page
 * Company information with mission, vision, stats, and team
 */

function About() {
  return (
    <main className="page-content about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <h1>About EcommerceHub</h1>
        <p>
          Empowering online shopping with innovation, reliability, and
          customer-first experiences.
        </p>
      </section>

      {/* Company Story */}
      <section className="page-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2020, EcommerceHub began with a simple vision — to make
          online shopping faster, easier, and more reliable. What started as a
          small digital store has grown into a trusted e-commerce platform
          serving thousands of customers every day.
        </p>

        <p>
          Our journey is driven by technology, customer trust, and a passion
          for delivering quality products at competitive prices.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="about-grid">

        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To provide a seamless shopping experience by connecting customers
            with quality products, reliable delivery, and secure transactions.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Vision</h2>
          <p>
            To become one of the most trusted and customer-centric e-commerce
            platforms globally by continuously innovating and improving the
            online shopping experience.
          </p>
        </div>

      </section>

      {/* Company Statistics */}
      <section className="about-stats">

        <div className="stat">
          <h3>50K+</h3>
          <p>Happy Customers</p>
        </div>

        <div className="stat">
          <h3>10K+</h3>
          <p>Products Available</p>
        </div>

        <div className="stat">
          <h3>200+</h3>
          <p>Trusted Brands</p>
        </div>

        <div className="stat">
          <h3>24/7</h3>
          <p>Customer Support</p>
        </div>

      </section>

      {/* Why Choose Us */}
      <section className="page-section">
        <h2>Why Choose EcommerceHub?</h2>

        <ul className="benefits-list">
          <li>✔ Premium quality products</li>
          <li>✔ Secure payment options</li>
          <li>✔ Fast and reliable delivery</li>
          <li>✔ Easy return and refund policy</li>
          <li>✔ 24/7 customer support</li>
          <li>✔ Competitive pricing</li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="page-section team-section">
        <h2>Meet Our Team</h2>
        <p>Our dedicated team works tirelessly to bring you the best shopping experience.</p>
      </section>
    </main>
  );
}

export default About;
