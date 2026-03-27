import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Lookbook.css';

// All images use high-quality Unsplash photos — unique per look
const LOOKBOOK_VOLUMES = [
  {
    id: 'v1',
    title: 'The Archives: Volume 1',
    issue: 'Issue No. 01',
    season: 'Autumn / Winter',
    year: '2024',
    editorial: 'A record of silhouettes at the edge of time.',
    coverUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=90&auto=format&fit=crop',
    looks: [
      {
        id: 'l1',
        name: 'The 1992 Overcoat',
        caption: 'Sourced from a private estate in Milan. The weight of history made fabric.',
        price: 62000,
        imageUrl: 'https://images.unsplash.com/photo-1548778052-311f4bc2b502?w=900&q=85&auto=format&fit=crop',
        era: '1992',
        designer: 'Gianfranco Ferré',
        layout: 'full'
      },
      {
        id: 'l2',
        name: 'Obsidian Silk',
        caption: 'The language of restraint spoken through a single sculptural fold.',
        price: 38000,
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85&auto=format&fit=crop',
        era: '1997',
        designer: 'Yohji Yamamoto',
        layout: 'half'
      },
      {
        id: 'l3',
        name: 'The Patina Biker',
        caption: 'Chromatic oxidation as biography. Every scratch a testament to lived experience.',
        price: 28500,
        imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=85&auto=format&fit=crop',
        era: '1988',
        designer: 'Issey Miyake',
        layout: 'half'
      },
      {
        id: 'l4',
        name: 'Architecture of Wool',
        caption: 'Structure without rigidity. The blueprint of Belgian modernism.',
        price: 55000,
        imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&auto=format&fit=crop',
        era: '1995',
        designer: 'Martin Margiela',
        layout: 'full'
      },
      {
        id: 'l5',
        name: 'Soft Brutalism',
        caption: 'When couture meets construction — a manifesto in heavy cotton canvas.',
        price: 41000,
        imageUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=85&auto=format&fit=crop',
        era: '2001',
        designer: 'Raf Simons',
        layout: 'half'
      }
    ]
  }
];

export default function Lookbook() {
  const [activeVolume] = useState(0);
  const volume = LOOKBOOK_VOLUMES[activeVolume];
  const fullLooks = volume.looks.filter(l => l.layout === 'full');
  const halfLooks = volume.looks.filter(l => l.layout === 'half');

  return (
    <div className="lookbook-page">
      {/* Header */}
      <div className="lookbook-header">
        <span className="lookbook-label">Visual Archive</span>
        <h1 className="lookbook-title">Lookbook</h1>
        <p className="lookbook-subtitle">{volume.season} {volume.year} — {volume.issue}</p>
      </div>

      {/* Volume Cover */}
      <div className="lookbook-cover">
        <div className="lookbook-cover-image">
          <img src={volume.coverUrl} alt={volume.title} />
          <div className="lookbook-cover-overlay">
            <h2 className="lookbook-cover-title">{volume.title}</h2>
            <p className="lookbook-cover-editorial">{volume.editorial}</p>
          </div>
        </div>
      </div>

      {/* Editorial Pull Quote */}
      <div className="lookbook-pullquote">
        <blockquote>
          "We do not inherit clothes; we inherit the memories woven into their fibers."
        </blockquote>
      </div>

      {/* Full-Width Looks */}
      {fullLooks.map((look) => (
        <div key={look.id} className="lookbook-item lookbook-item--full">
          <div className="lookbook-item-image">
            <img src={look.imageUrl} alt={look.name} loading="lazy" />
          </div>
          <div className="lookbook-item-caption">
            <div className="lookbook-item-meta">
              <span className="lookbook-item-designer">{look.designer}</span>
              <span className="lookbook-item-era">Circa {look.era}</span>
            </div>
            <h3 className="lookbook-item-name">{look.name}</h3>
            <p className="lookbook-item-text">{look.caption}</p>
            <div className="lookbook-item-cta">
              <span className="lookbook-item-price">₹{look.price?.toLocaleString('en-IN')}</span>
              <Link to="/shop" className="btn-primary">Acquire</Link>
            </div>
          </div>
        </div>
      ))}

      {/* Half-Width Grid */}
      <div className="lookbook-grid">
        {halfLooks.map((look) => (
          <div key={look.id} className="lookbook-item lookbook-item--half">
            <div className="lookbook-item-image">
              <img src={look.imageUrl} alt={look.name} loading="lazy" />
            </div>
            <div className="lookbook-item-caption">
              <div className="lookbook-item-meta">
                <span className="lookbook-item-designer">{look.designer}</span>
                <span className="lookbook-item-era">Circa {look.era}</span>
              </div>
              <h3 className="lookbook-item-name">{look.name}</h3>
              <p className="lookbook-item-text">{look.caption}</p>
              <div className="lookbook-item-cta">
                <span className="lookbook-item-price">₹{look.price?.toLocaleString('en-IN')}</span>
                <Link to="/shop" className="btn-primary">Acquire</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Quote section */}
      <div className="lookbook-end">
        <div className="lookbook-end-inner">
          <h2>The Archive Awaits</h2>
          <p>Every piece in our archive tells a story. Become part of the next chapter.</p>
          <Link to="/shop" className="btn-primary">Enter the Archive</Link>
        </div>
      </div>

      <footer className="page-footer">
        <p>© 2024 ReThread. <em>Wear the Past. Own the Future.</em></p>
      </footer>
    </div>
  );
}
