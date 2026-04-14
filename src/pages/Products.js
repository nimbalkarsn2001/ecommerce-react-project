import React, { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../component/ProductCard';
import '../styles/Products.css';

/**
 * Products Page Component
 * Displays all products with filtering and search capabilities
 */
function Products() {
  const {
    products,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInCart,
    isInWishlist,
  } = useStore();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [maxPrice, setMaxPrice] = useState(200);

  // Get unique categories
  const categories = useMemo(
    () => ['All', ...new Set(products.map((p) => p.category))],
    [products]
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (category === 'All' ? true : p.category === category))
      .filter((p) => p.price <= maxPrice);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, category, maxPrice, sortBy]);

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <main className="products-page">
      <h1>🛍️ Shop Our Collection</h1>

      <div className="products-container">
        {/* Sidebar - Filters */}
        <aside className="filters-sidebar">
          <h3>Filter & Search</h3>

          {/* Search Input */}
          <div className="filter-group">
            <label htmlFor="search">Search Products</label>
            <input
              type="search"
              id="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="filter-input"
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <label htmlFor="price">Max Price: ${maxPrice}</label>
            <input
              type="range"
              id="price"
              min="0"
              max="200"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
            <div className="price-range">
              <span>$0</span>
              <span>$200</span>
            </div>
          </div>

          {/* Sort Options */}
          <div className="filter-group">
            <label htmlFor="sort">Sort By</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="results-count">
            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        </aside>

        {/* Main Products Area */}
        <section className="products-main">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">🔍</p>
              <h2>No products found</h2>
              <p>Try adjusting your filters or search term</p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearch('');
                  setCategory('All');
                  setMaxPrice(200);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => ( 
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist(product.id)}
                  isInCart={isInCart(product.id)}
                />
              ))}   
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Products;
