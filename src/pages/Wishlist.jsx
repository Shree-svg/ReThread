import React from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const WISHLIST_MOCK = [
  {
    id: 'w1',
    name: 'Distressed Leather Overcoat',
    designer: 'Helmut Lang',
    era: '1996',
    price: 32000,
    condition: 'Archive Grade',
    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=85&auto=format&fit=crop',
    saved: '2 days ago'
  },
  {
    id: 'w2',
    name: 'Raw Wool Pilot Shearling',
    designer: 'Maison Margiela',
    era: '1999',
    price: 58000,
    condition: 'Museum Quality',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85&auto=format&fit=crop',
    saved: '1 week ago'
  },
  {
    id: 'w3',
    name: 'Draped Charmeuse Gown',
    designer: 'Yohji Yamamoto',
    era: '1993',
    price: 48500,
    condition: 'Pristine',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85&auto=format&fit=crop',
    saved: '3 days ago'
  },
  {
    id: 'w4',
    name: 'Brushed Charcoal Mohair',
    designer: 'Comme des Garçons',
    era: '1997',
    price: 22000,
    condition: 'Gently Worn',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=85&auto=format&fit=crop',
    saved: '5 days ago'
  }
];

export default function Wishlist({ wishlist = [], products = [], removeFromWishlist }) {
  // Use mock data if no real wishlist items
  const displayItems = wishlist.length > 0
    ? wishlist.map(id => products.find(p => p.id === id)).filter(Boolean)
    : WISHLIST_MOCK;

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <span className="wishlist-label">Discovery</span>
        <h1 className="wishlist-title">Your Curated Archives</h1>
        <p className="wishlist-subtitle">Pieces reserved for further consideration — an act of curation in itself.</p>
      </div>

      <div className="wishlist-grid">
        {displayItems.map((item) => (
          <div key={item.id} className="wishlist-card">
            <div className="wishlist-card-image">
              {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
              <div className="wishlist-card-overlay">
                <Link to="/shop" className="wishlist-view-btn">View Archive</Link>
              </div>
            </div>
            <div className="wishlist-card-info">
              <div className="wishlist-card-meta">
                <span className="wishlist-designer">{item.designer}</span>
                <span className="wishlist-era">{item.era || item.era}</span>
              </div>
              <h3 className="wishlist-card-name">{item.name}</h3>
              <div className="wishlist-card-bottom">
                <div className="wishlist-card-condition-price">
                  <span className="wishlist-condition">{item.condition}</span>
                  <span className="wishlist-price">₹{item.price?.toLocaleString('en-IN')}</span>
                </div>
                <div className="wishlist-actions">
                  <button className="btn-primary wishlist-add-cart">Add to Archive</button>
                  {removeFromWishlist && (
                    <button className="wishlist-remove-btn" onClick={() => removeFromWishlist(item.id)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
              {item.saved && <p className="wishlist-saved">Saved {item.saved}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="wishlist-empty-cta">
        <div className="wishlist-cta-inner">
          <h2>Expand Your Archive</h2>
          <p>Discover more singular pieces from our curators worldwide.</p>
          <Link to="/shop" className="btn-primary">Browse the Archive</Link>
        </div>
      </div>

      <footer className="page-footer">
        <p>© 2024 ReThread. <em>Wear the Past. Own the Future.</em></p>
      </footer>
    </div>
  );
}
