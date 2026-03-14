import React, { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../component/ProductCard';

function Products() {
  const { products, addToCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist } = useStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(0);

  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category))], [products]);

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (category === 'All' ? true : p.category === category))
      .filter((p) => (maxPrice > 0 ? p.price <= maxPrice : true));
  }, [products, search, category, maxPrice]);

  return (
    <main className="content">
      <h1>Products</h1>

      <section className="filters">
        <input
          type="search"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </section>

      <section className="products-grid">
        {filtered.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={isInWishlist(product.id) ? removeFromWishlist : addToWishlist}
              isInWishlist={isInWishlist(product.id)}
              isInCart={isInCart(product.id)}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default Products;
