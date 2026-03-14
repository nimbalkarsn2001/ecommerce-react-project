import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">EcommerceApp</div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#products" className="nav-link">Products</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>
      </nav>

      <main className="content">
        <section id="home">
          <h1>Welcome to EcommerceApp</h1>
          <p>Use the navbar above to navigate between sections.</p>
        </section>

        <section id="products">
          <h2>Products</h2>
          <p>Product listing will go here.</p>
        </section>

        <section id="about">
          <h2>About</h2>
          <p>This is a demo e-commerce site built with React.</p>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>Contact details and form content goes here.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
