import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">The Digital Curator</p>
          <h1 className="hero-headline">
            Wear the Past. <br />
            <span className="italic">Own the Future.</span>
          </h1>
          <p className="hero-subtext">
            A curated archive of high-fidelity vintage fashion. <br />
            Every item is a piece of history, authenticated and archived for the modern wardrobe.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-primary">Explore Archive</Link>
            <Link to="/sell" className="btn-secondary">List a Piece</Link>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="visual-float image-1">
             <img src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=700&q=85&auto=format&fit=crop" alt="Archive Biker" />
          </div>
          <div className="visual-float image-2">
             <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=85&auto=format&fit=crop" alt="Helmut Archive" />
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-grid">
           <div className="manifesto-item">
              <h2>Curated Selection</h2>
              <p>We source only the finest archival pieces from the 70s, 80s, and 90s, ensuring every item meets our high standards of quality and provenance.</p>
           </div>
           <div className="manifesto-item">
              <h2>Slow Fashion</h2>
              <p>ReThread is a commitment to sustainable style. We believe in the longevity of well-crafted garments over the fleeting nature of fast fashion.</p>
           </div>
        </div>
      </section>

      <footer className="footer-landing">
        <div className="footer-content">
           <div className="brand">ReThread</div>
           <p>© 2026 Editorial Archive. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
