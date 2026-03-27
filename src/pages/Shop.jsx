import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

const CATEGORIES = ['All Pieces', 'Tops', 'Outerwear', 'Bottoms', 'Accessories'];
const ERAS = ['70s', '80s', '90s', '00s'];

export default function Shop({ products = [], addToCart, addToWishlist, cartItems = [] }) {
  const [activeCategory, setActiveCategory] = useState('All Pieces');
  const [activeEra, setActiveEra] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All Pieces' || p.category === activeCategory;
    const matchEra = !activeEra || p.era === activeEra;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchEra && matchSearch;
  });

  return (
    <div className="shop-page container-fade">
      <div className="shop-header">
        <p className="shop-label">The Archive</p>
        <h1 className="display-text archive-title">Shop</h1>
        <div className="search-wrap">
          <input
            type="text"
            placeholder="Search the collection..."
            className="archive-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="shop-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Category</h3>
            <div className="sidebar-links">
              {CATEGORIES.map(cat => (
                <span
                  key={cat}
                  className={`sidebar-link ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-title">Era</h3>
            <div className="pill-grid">
              {ERAS.map(era => (
                <span
                  key={era}
                  className={`pill ${activeEra === era ? 'active' : ''}`}
                  onClick={() => setActiveEra(prev => prev === era ? null : era)}
                >
                  {era}
                </span>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <p style={{ fontSize: '0.75rem', color: 'var(--outline)' }}>
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} in the archive
            </p>
          </div>
        </aside>

        <div className="product-grid">
          {filtered.length === 0 ? (
            <p className="empty-message italic">No pieces found in the archive...</p>
          ) : (
            filtered.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-image-wrap">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
                    alt={product.name}
                  />
                  <div className="product-badge">{product.condition}</div>
                  <div className="product-card-actions">
                    <button
                      className="product-quick-buy"
                      onClick={(e) => {
                        e.preventDefault();
                        if (addToCart) addToCart(product.id);
                      }}
                      disabled={cartItems.includes(product.id)}
                    >
                      {cartItems.includes(product.id) ? 'In Archive' : 'Quick Add'}
                    </button>
                  </div>
                </Link>
                <div className="product-details">
                  <div className="product-main-row">
                    <Link to={`/product/${product.id}`} className="product-title-link">
                      <h2 className="product-title">{product.name}</h2>
                    </Link>
                    <span className="product-price">₹{product.price?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="product-meta">
                    <Link to={`/archivist/${product.sellerId}`} className="product-seller">
                      @{product.sellerId}
                    </Link>
                    <span className="product-era">{product.era} Archive</span>
                  </div>
                  <div className="product-card-bottom">
                    <button
                      className="btn-primary product-add-cart"
                      onClick={() => addToCart && addToCart(product.id)}
                      disabled={cartItems.includes(product.id)}
                    >
                      {cartItems.includes(product.id) ? '✓ In Archive' : 'Add to Archive'}
                    </button>
                    <button
                      className="product-wishlist-btn"
                      onClick={() => addToWishlist && addToWishlist(product.id)}
                      aria-label="Add to wishlist"
                    >
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="page-footer">
        <p>© 2024 ReThread. <em>Wear the Past. Own the Future.</em></p>
      </footer>
    </div>
  );
}
