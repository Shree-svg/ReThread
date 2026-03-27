import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Journal.css';

// All images are high-quality Unsplash photos — unique per article
const JOURNAL_ARTICLES = [
  {
    id: 'j1',
    slug: 'architecture-modern-minimalism',
    category: 'ESSAY',
    tag: 'Architecture',
    title: 'The Architecture of Modern Minimalism',
    subtitle: 'How the void became the most expressive tool in contemporary tailoring.',
    author: 'Clara Vesper',
    date: 'March 2024',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=85&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'j2',
    slug: 'history-90s-leather',
    category: 'HISTORY',
    tag: 'Materials',
    title: 'A History of 90s Leather',
    subtitle: 'From biker subculture to the high-fashion runway — the decade that made leather iconic.',
    author: 'Marcus Fell',
    date: 'February 2024',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=85&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'j3',
    slug: 'care-for-vintage-silk',
    category: 'GUIDE',
    tag: 'Care',
    title: 'How to Care for Vintage Silk',
    subtitle: 'A definitive archival guide to preserving silk garments across generations.',
    author: 'Amara Diallo',
    date: 'January 2024',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'j4',
    slug: 'ethics-of-archiving',
    category: 'CULTURE',
    tag: 'Ethics',
    title: 'The Ethics of Archiving',
    subtitle: 'Who has the right to own history? An exploration of the moral weight of curation.',
    author: 'Seren Hughes',
    date: 'December 2023',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=85&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'j5',
    slug: 'tracing-makers-mark',
    category: 'INVESTIGATION',
    tag: 'Provenance',
    title: "Tracing the Maker's Mark",
    subtitle: 'How label research became the new form of fashion archaeology.',
    author: 'Tobias Klein',
    date: 'November 2023',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=85&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'j6',
    slug: 'londons-forgotten-tailors',
    category: 'HISTORY',
    tag: 'Places',
    title: "London's Forgotten Tailors",
    subtitle: 'The ateliers of the East End that quietly shaped British fashion for three decades.',
    author: 'Vivienne Park',
    date: 'October 2023',
    readTime: '9 min read',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'j7',
    slug: 'symmetry-is-a-myth',
    category: 'ESSAY',
    tag: 'Design',
    title: 'Symmetry is a Myth',
    subtitle: 'Exploring the beauty of asymmetry in the 80s avant-garde movement.',
    author: 'Hiroshi T.',
    date: 'September 2023',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=85&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'j8',
    slug: 'fabric-of-rebellion',
    category: 'HISTORY',
    tag: 'Subculture',
    title: 'The Fabric of Rebellion',
    subtitle: 'From safety pins to shredded knits: how punk rewrote the rules of reconstruction.',
    author: 'Clara Vesper',
    date: 'August 2023',
    readTime: '11 min read',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'j9',
    slug: 'six-against-the-world',
    category: 'CULTURE',
    tag: 'Legacy',
    title: 'Six Against the World',
    subtitle: 'The enduring impact of the Antwerp Six on modern global fashion systems.',
    author: 'Marcus Fell',
    date: 'July 2023',
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=85&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'j10',
    slug: 'archiving-the-invisible',
    category: 'GUIDE',
    tag: 'Fragrance',
    title: 'Archiving the Invisible',
    subtitle: 'Can scent be curated? The challenges of preserving archival olfactory experiences.',
    author: 'Amara Diallo',
    date: 'June 2023',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=85&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'j11',
    slug: 'less-but-better',
    category: 'ESSAY',
    tag: 'Aesthetic',
    title: 'Less but Better',
    subtitle: 'Navigating the quiet revolution of 90s minimalism and its return to relevance.',
    author: 'Tobias Klein',
    date: 'May 2023',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85&auto=format&fit=crop',
    featured: false
  }
];

const CATEGORIES = ['All', 'Essay', 'History', 'Guide', 'Culture', 'Investigation'];

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('All');
  const featured = JOURNAL_ARTICLES.find(a => a.featured);
  const rest = JOURNAL_ARTICLES.filter(a => !a.featured);

  const filtered = activeCategory === 'All'
    ? rest
    : rest.filter(a => a.category === activeCategory.toUpperCase());

  return (
    <div className="journal-page">
      {/* Header */}
      <div className="journal-header">
        <span className="journal-label">Editorial</span>
        <h1 className="journal-title">The Journal</h1>
        <p className="journal-subtitle">Essays, histories &amp; investigations from the front lines of archival fashion.</p>
      </div>

      {/* Featured Article */}
      {featured && (
        <div className="journal-featured">
          <div className="journal-featured-image">
            <img src={featured.imageUrl} alt={featured.title} />
            <div className="journal-featured-tag">{featured.tag}</div>
          </div>
          <div className="journal-featured-content">
            <span className="journal-article-category">{featured.category}</span>
            <h2 className="journal-featured-title">{featured.title}</h2>
            <p className="journal-featured-subtitle">{featured.subtitle}</p>
            <div className="journal-article-byline">
              <span>{featured.author}</span>
              <span className="byline-sep">·</span>
              <span>{featured.date}</span>
              <span className="byline-sep">·</span>
              <span>{featured.readTime}</span>
            </div>
            <button className="btn-primary journal-read-btn">Read the Essay →</button>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="journal-filter-strip">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`journal-filter-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Archive Spotlight Section */}
      <div className="archive-spotlight">
        <div className="spotlight-overlay"></div>
        <div className="spotlight-content">
          <span className="spotlight-label">Deep Dive</span>
          <h2 className="spotlight-title">Belgian Modernism: The 1986 Breakway</h2>
          <p className="spotlight-text">
            When six young designers from Antwerp rented a truck and drove to London, they didn't just bring 
            clothes—they brought a new language. Explore the movement that dismantled couture 
            formality through deconstruction and intellectual rigor.
          </p>
          <button className="btn-outline spotlight-btn">Explore the Timeline</button>
        </div>
      </div>

      {/* Article Grid */}
      <div className="journal-grid">
        {filtered.map(article => (
          <article key={article.id} className="journal-card">
            <div className="journal-card-image">
              <img src={article.imageUrl} alt={article.title} loading="lazy" />
              <span className="journal-card-tag">{article.tag}</span>
            </div>
            <div className="journal-card-content">
              <span className="journal-article-category">{article.category}</span>
              <h3 className="journal-card-title">{article.title}</h3>
              <p className="journal-card-subtitle">{article.subtitle}</p>
              <div className="journal-article-byline">
                <span>{article.author}</span>
                <span className="byline-sep">·</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="journal-cta">
        <div className="journal-cta-inner">
          <h2>Join the Archive</h2>
          <p>Receive our editorial dispatches. New essays, discoveries, and archive drops — delivered with intention.</p>
          <div className="journal-cta-form">
            <input type="email" placeholder="your@address.com" className="journal-email-input" />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <p>© 2024 ReThread. <em>Wear the Past. Own the Future.</em></p>
      </footer>
    </div>
  );
}
