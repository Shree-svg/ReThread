import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

export default function Cart({ cartItems = [], products = [], removeFromCart, clearCart }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartProducts = cartItems.map(id => products.find(p => p.id === id)).filter(Boolean);
  const subtotal = cartProducts.reduce((sum, p) => sum + (p.price || 0), 0);
  const shipping = 1200;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setOrderPlaced(true);
    if (clearCart) clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="cart-page">
        <div className="cart-success">
          <div className="success-icon">✓</div>
          <h1>Archive Acquired</h1>
          <p>Your order has been placed. Each piece will be authenticated and prepared with archival care.</p>
          <Link to="/shop" className="btn-primary">Continue Browsing</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header-area">
        <p className="cart-label">Commerce</p>
        <h1 className="cart-title">Your Archive</h1>
        <p className="cart-subtitle">Curated Selections & Found Pieces</p>
      </div>

      {cartProducts.length === 0 ? (
        <div className="cart-empty">
          <p>Your archive is empty.</p>
          <Link to="/shop" className="btn-primary">Explore the Archive</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartProducts.map((product) => (
              <div key={product.id} className="cart-item">
                <div className="cart-item-image">
                  {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-meta">
                    <span className="cart-item-era">{product.era}</span>
                    <span className="cart-item-seller">@{product.sellerId}</span>
                  </div>
                  <h3 className="cart-item-name">{product.name}</h3>
                  <p className="cart-item-condition">{product.condition}</p>
                  <p className="cart-item-price">₹{product.price?.toLocaleString('en-IN')}</p>
                  {removeFromCart && (
                    <button className="cart-remove-btn" onClick={() => removeFromCart(product.id)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="cart-provenance-note">
              <div className="provenance-icon">archive</div>
              <div className="provenance-text">
                <h4>A Note on Provenance</h4>
                <p>Each piece in your archive is a single-edition artifact. By selecting this item, you are preserving a chapter of sartorial history. All items are authenticated and treated with archival care.</p>
              </div>
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-header">
              <h2>Order Summary</h2>
              <div className="summary-badges">
                <span className="summary-badge">🔒 Secure Encrypted Transaction</span>
                <span className="summary-badge">✓ Lifetime Authenticity</span>
              </div>
            </div>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal ({cartProducts.length} {cartProducts.length === 1 ? 'piece' : 'pieces'})</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-line">
                <span>Archival Shipping</span>
                <span>₹{shipping.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-line summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button className="btn-primary checkout-btn" onClick={handleCheckout}>
              Complete Acquisition
            </button>

            <p className="authenticity-note">
              Every transaction is backed by the ReThread authenticity guarantee.
              <br />Curating the finest archival fashion for the modern collector.
            </p>
          </div>
        </div>
      )}

      <footer className="cart-footer">
        <p className="cart-footer-brand">© 2024 ReThread. Wear the Past. Own the Future.</p>
        <div className="cart-footer-links">
          {['About', 'Lookbook', 'Journal', 'Shipping', 'FAQ', 'Returns', 'Privacy', 'Terms'].map(link => (
            <Link key={link} to="#" className="cart-footer-link">{link}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
