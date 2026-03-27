import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

export default function ProductDetail({ products = [], addToCart, addToWishlist, cartItems = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('provenance');
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === id) || {
    id: 'demo',
    name: 'Vintage Leather Biker Jacket',
    category: 'Outerwear',
    era: '80s',
    price: 8750,
    condition: 'Gently Used',
    sellerId: 'midnight_archive',
    description: 'Oversized vintage leather bomber jacket with a heavy grain texture and archival brass hardware. A seminal piece representing the raw energy of the decade.',
    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1000&q=85&auto=format&fit=crop'
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const inCart = cartItems.includes(product.id);

  const handleAddToCart = () => {
    if (addToCart && !inCart) {
      addToCart(product.id);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <Link to="/shop" className="pd-back">← The Archive</Link>
        <span className="pd-breadcrumb-sep">/</span>
        <span>{product.category}</span>
      </div>

      <div className="pd-layout">
        {/* Left – Image Panel */}
        <div className="pd-image-panel">
          <div className="pd-main-image">
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
            <div className="pd-image-badge">
              <span>{product.condition}</span>
            </div>
          </div>
          <div className="pd-image-strip">
            <div className="pd-image-thumb active">
              {product.imageUrl && <img src={product.imageUrl} alt="" />}
            </div>
            <div className="pd-image-thumb">
              {product.imageUrl && <img src={product.imageUrl} alt="" style={{ filter: 'brightness(0.6)' }} />}
            </div>
            <div className="pd-image-thumb">
              {product.imageUrl && <img src={product.imageUrl} alt="" style={{ filter: 'saturate(0)' }} />}
            </div>
          </div>
        </div>

        {/* Right – Product Info */}
        <div className="pd-info-panel">
          <div className="pd-meta-row">
            <span className="pd-era-tag">{product.era}</span>
            <span className="pd-category-tag">{product.category}</span>
          </div>

          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-seller-row">
            <div className="pd-seller-avatar">
              {product.sellerId?.charAt(0).toUpperCase()}
            </div>
            <div className="pd-seller-info">
              <span className="pd-seller-handle">@{product.sellerId}</span>
              <span className="pd-seller-badge">Verified Archivist</span>
            </div>
          </div>

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price?.toLocaleString('en-IN')}</span>
            <span className="pd-price-note">Inclusive of authentication fee</span>
          </div>

          <div className="pd-actions">
            <button
              className={`btn-primary pd-cart-btn ${inCart || addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={inCart}
            >
              {inCart ? 'In Your Archive' : addedToCart ? 'Added ✓' : 'Acquire This Piece'}
            </button>
            <button className="pd-wishlist-btn" onClick={() => addToWishlist && addToWishlist(product.id)}>
              ♡ Save
            </button>
          </div>

          <div className="pd-auth-bar">
            <div className="pd-auth-item">
              <span className="pd-auth-icon">✓</span>
              <span>Authenticated</span>
            </div>
            <div className="pd-auth-item">
              <span className="pd-auth-icon">📦</span>
              <span>Archival Packaging</span>
            </div>
            <div className="pd-auth-item">
              <span className="pd-auth-icon">↩</span>
              <span>14-Day Returns</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="pd-tabs">
            {['provenance', 'story', 'care'].map(tab => (
              <button
                key={tab}
                className={`pd-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="pd-tab-content">
            {activeTab === 'provenance' && (
              <div className="pd-tab-panel">
                <p>{product.description}</p>
                <div className="pd-provenance-grid">
                  <div className="pd-prov-item">
                    <span className="pd-prov-label">Era</span>
                    <span className="pd-prov-value">{product.era}</span>
                  </div>
                  <div className="pd-prov-item">
                    <span className="pd-prov-label">Condition</span>
                    <span className="pd-prov-value">{product.condition}</span>
                  </div>
                  <div className="pd-prov-item">
                    <span className="pd-prov-label">Category</span>
                    <span className="pd-prov-value">{product.category}</span>
                  </div>
                  <div className="pd-prov-item">
                    <span className="pd-prov-label">Authentication</span>
                    <span className="pd-prov-value">Certified</span>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'story' && (
              <div className="pd-tab-panel">
                <p className="pd-story-lead">Every piece carries a history. Here is the story of this garment.</p>
                <p>{product.description}</p>
                <p>Sourced directly from an estate sale in London's Portobello Road, this piece has been verified by our in-house authentication team. It represents a defining moment in post-war fashion.</p>
              </div>
            )}
            {activeTab === 'care' && (
              <div className="pd-tab-panel">
                <ul className="pd-care-list">
                  <li>Dry clean only — do not machine wash</li>
                  <li>Store away from direct sunlight in a breathable garment bag</li>
                  <li>Condition leather annually with a specialist product</li>
                  <li>Avoid extended exposure to humidity</li>
                  <li>Handle metal hardware with care to preserve patina</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More from the Archive */}
      {relatedProducts.length > 0 && (
        <section className="pd-related">
          <div className="pd-related-header">
            <h2>More from the Archive</h2>
            <Link to="/shop" className="pd-related-all">View All →</Link>
          </div>
          <div className="pd-related-grid">
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="pd-related-card">
                <div className="pd-related-image">
                  {p.imageUrl && <img src={p.imageUrl} alt={p.name} />}
                </div>
                <div className="pd-related-info">
                  <span className="pd-related-era">{p.era}</span>
                  <h4>{p.name}</h4>
                  <span className="pd-related-price">₹{p.price?.toLocaleString('en-IN')}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="page-footer">
        <p>© 2024 ReThread. <em>Wear the Past. Own the Future.</em></p>
      </footer>
    </div>
  );
}
