import React from 'react';
import { Link } from 'react-router-dom';
import './Manifesto.css';

const MANIFESTO_SECTIONS = [
  {
    id: 'm1',
    number: '01',
    title: 'Circular Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=85&auto=format&fit=crop',
    body: 'The fashion industry is the second largest contributor to global pollution. We believe that the most radical act is also the most simple: to stop and to look at what already exists. Each piece that is given a second life removes demand for a new one. The archive is not nostalgia — it is mathematics.',
    stat: '95%',
    statLabel: 'of textile waste is recyclable or reusable'
  },
  {
    id: 'm2',
    number: '02',
    title: 'The Art of Sourcing',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=85&auto=format&fit=crop',
    subsections: [
      {
        icon: '◎',
        title: 'Uncovering Hidden Histories',
        body: 'We work with a global network of archivists, estate curators, and private collectors. Every source is verified. Every piece is documented. We do not cherry-pick; we excavate.'
      },
      {
        icon: '◈',
        title: 'Quality First',
        body: 'Our curation process is predicated on structural integrity. We reject the idea of "acceptable wear." Every garment must be able to live its next life without apology.'
      },
      {
        icon: '◉',
        title: 'Origins',
        body: 'We believe in total transparency. Every piece on ReThread carries a documented provenance — where it was made, who made it, and where it has been.'
      }
    ]
  },
  {
    id: 'm3',
    number: '03',
    title: 'Environmental Impact',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1000&q=85&auto=format&fit=crop',
    stats: [
      { value: '3,000L', label: 'of water saved per vintage cotton shirt vs. new production' },
      { value: '70%', label: 'lower carbon footprint compared to buying new' },
      { value: '100%', label: 'of our packaging is recycled or plant-based' },
      { value: '0', label: 'items sent to landfill from our verified sellers' }
    ],
    body: 'Choosing vintage is not a compromise — it is a correction. Every transaction on ReThread is an act of environmental intelligence.'
  }
];

export default function Manifesto() {
  return (
    <div className="manifesto-page">
      {/* Hero */}
      <div className="manifesto-hero">
        <span className="manifesto-label">Our Philosophy</span>
        <h1 className="manifesto-title">Sustainability & Provenance</h1>
        <div className="manifesto-hero-image">
          <img src="https://images.unsplash.com/photo-1537832816519-689ad163238b?w=1600&q=90&auto=format&fit=crop" alt="Archival Detail" />
        </div>
        <p className="manifesto-lead">
          We are not a marketplace. We are an argument — for slowness, for depth, for a relationship with clothing that outlasts the season.
        </p>
      </div>

      {/* Sections */}
      {MANIFESTO_SECTIONS.map(section => (
        <section key={section.id} className="manifesto-section">
          <div className="manifesto-section-number">{section.number}</div>
          <h2 className="manifesto-section-title">{section.title}</h2>

          <div className="manifesto-image-container">
            <img src={section.imageUrl} alt={section.title} loading="lazy" />
          </div>

          {/* Circular Fashion */}
          {section.body && !section.subsections && !section.stats && (
            <div className="manifesto-section-content">
              <p className="manifesto-body">{section.body}</p>
              {section.stat && (
                <div className="manifesto-stat-block">
                  <span className="manifesto-stat-value">{section.stat}</span>
                  <span className="manifesto-stat-label">{section.statLabel}</span>
                </div>
              )}
            </div>
          )}

          {/* Art of Sourcing with subsections */}
          {section.subsections && (
            <div className="manifesto-subsections">
              {section.subsections.map((sub, i) => (
                <div key={i} className="manifesto-sub">
                  <div className="manifesto-sub-icon">{sub.icon}</div>
                  <div className="manifesto-sub-content">
                    <h3>{sub.title}</h3>
                    <p>{sub.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Environmental Impact stats */}
          {section.stats && (
            <div className="manifesto-section-content">
              <div className="manifesto-stats-grid">
                {section.stats.map((s, i) => (
                  <div key={i} className="manifesto-impact-stat">
                    <span className="manifesto-impact-value">{s.value}</span>
                    <span className="manifesto-impact-label">{s.label}</span>
                  </div>
                ))}
              </div>
              <p className="manifesto-body">{section.body}</p>
            </div>
          )}
        </section>
      ))}

      {/* Final CTA */}
      <div className="manifesto-cta">
        <div className="manifesto-cta-inner">
          <h2>Write the next chapter.</h2>
          <p>Every piece you choose to archive instead of discard is a decision that echoes forward. Join us in building a wardrobe that lasts.</p>
          <div className="manifesto-cta-actions">
            <Link to="/shop" className="btn-primary">Explore the Archive</Link>
            <Link to="/sell" className="btn-ghost">Become an Archivist</Link>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <p>© 2024 ReThread. <em>Wear the Past. Own the Future.</em></p>
      </footer>
    </div>
  );
}
