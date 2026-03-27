import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './ArchivistProfile.css';

const ARCHIVISTS = {
  'midnight_archive': {
    handle: 'midnight_archive',
    name: 'The Archivist',
    specialty: 'Specializing in 1990s Belgian minimalism and Japanese avant-garde. Every piece is sourced with a focus on structural integrity and historical relevance. The archive is a living history of silhouettes.',
    location: 'Brussels & Tokyo',
    since: 'Archiving Since 2019',
    rating: 4.97,
    sales: 312,
    responseTime: '< 2 hours',
    items: [
      {
        id: 'a1',
        name: 'Structured Wool Overcoat',
        designer: 'Yohji Yamamoto',
        price: 62000,
        era: '1994',
        imageUrl: 'https://images.unsplash.com/photo-1548778052-311f4bc2b502?w=700&q=85&auto=format&fit=crop'
      },
      {
        id: 'a2',
        name: 'Rough-Cut Mohair Coat',
        designer: 'Margiela',
        price: 44000,
        era: '1997',
        imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=85&auto=format&fit=crop'
      },
      {
        id: 'a3',
        name: 'Square-Toe Archive Boots',
        designer: 'Prada',
        price: 28500,
        era: '1996',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85&auto=format&fit=crop'
      }
    ],
    reviews: [
      {
        author: 'collector_a',
        text: 'The provenance of the items I received was meticulously documented. A true scholar of the garment.',
        rating: 5
      },
      {
        author: 'archiver_b',
        text: 'The 1994 Yamamoto coat arrived in museum-quality condition. The Archivist is unparalleled in their sourcing.',
        rating: 5
      }
    ]
  }
};

export default function ArchivistProfile({ products = [] }) {
  const { handle } = useParams();
  const archivistHandle = handle || 'midnight_archive';
  const archivist = ARCHIVISTS[archivistHandle] || ARCHIVISTS['midnight_archive'];

  const sellerProducts = products.filter(p => p.sellerId === archivistHandle);
  const displayItems = sellerProducts.length > 0 ? sellerProducts : archivist.items;

  return (
    <div className="archivist-page">
      {/* Hero */}
      <div className="archivist-hero">
        <div className="archivist-avatar-wrap">
          <div className="archivist-avatar">
            {archivist.handle.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="archivist-hero-info">
          <p className="archivist-since">{archivist.since}</p>
          <h1 className="archivist-name">{archivist.name}</h1>
          <p className="archivist-handle">@{archivist.handle}</p>
          <p className="archivist-handle">{archivist.location}</p>
          <p className="archivist-specialty">{archivist.specialty}</p>
          <div className="archivist-stats">
            <div className="archivist-stat">
              <span className="stat-value">★ {archivist.rating}</span>
              <span className="stat-label">Rating</span>
            </div>
            <div className="archivist-stat">
              <span className="stat-value">{archivist.sales}</span>
              <span className="stat-label">Sales</span>
            </div>
            <div className="archivist-stat">
              <span className="stat-value">{archivist.responseTime}</span>
              <span className="stat-label">Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* CuratorProvenance tag */}
      <div className="archivist-badge-row">
        <div className="archivist-badge">
          <span className="badge-icon">✓</span>
          <div>
            <p className="badge-title">CuratorProvenance</p>
            <p className="badge-sub">Authenticity Assured</p>
          </div>
        </div>
      </div>

      {/* Currently Available */}
      <section className="archivist-inventory">
        <div className="archivist-section-header">
          <h2>Currently Available</h2>
          <Link to="/shop" className="archivist-view-all">View All in Archive →</Link>
        </div>
        <div className="archivist-grid">
          {displayItems.map((item) => (
            <Link
              key={item.id}
              to={item.id ? `/product/${item.id}` : '/shop'}
              className="archivist-item-card"
            >
              <div className="archivist-item-image">
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
              </div>
              <div className="archivist-item-info">
                <span className="archivist-item-designer">{item.designer || item.category}</span>
                <h3 className="archivist-item-name">{item.name}</h3>
                <div className="archivist-item-bottom">
                  <span className="archivist-item-era">{item.era}</span>
                  <span className="archivist-item-price">₹{item.price?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="archivist-reviews">
        <h2>From the Collection</h2>
        <div className="archivist-reviews-grid">
          {archivist.reviews.map((review, i) => (
            <div key={i} className="archivist-review-card">
              <div className="review-stars">{'★'.repeat(review.rating)}</div>
              <p className="review-text">"{review.text}"</p>
              <span className="review-author">— @{review.author}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="page-footer">
        <div className="footer-links-row">
          {['The Archive', 'Provenance', 'Sustainability', 'Privacy Policy', 'Terms of Service', 'Instagram', 'Twitter'].map(link => (
            <Link key={link} to="#" className="footer-link">{link}</Link>
          ))}
        </div>
        <p>© 2024 ReThread Archive. Sourced globally, curated locally.</p>
      </footer>
    </div>
  );
}
