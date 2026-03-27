import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Sell from './pages/Sell';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import ArchivistProfile from './pages/ArchivistProfile';
import Journal from './pages/Journal';
import Lookbook from './pages/Lookbook';
import Manifesto from './pages/Manifesto';

const initialMockProducts = [
  {
    id: '1',
    name: "Helmut Lang Archive Denim",
    category: "Bottoms",
    era: "90s",
    price: 18500,
    condition: "Like New",
    sellerId: "user_rt_01",
    description: "A seminal piece from the 1994 collection, featuring raw indigo finish and the classic straight-cut silhouette.",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '2',
    name: "Raw Silk Knit Cardigan",
    category: "Outerwear",
    era: "90s",
    price: 4200,
    condition: "Pristine",
    sellerId: "user_rt_02",
    description: "Vintage high-quality cashmere sweater in neutral tones of beige and cream.",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '3',
    name: "80s Heavy Grain Biker Jacket",
    category: "Outerwear",
    era: "80s",
    price: 8750,
    condition: "Gently Used",
    sellerId: "midnight_archive",
    description: "Oversized vintage leather bomber jacket with a heavy grain texture and archival brass hardware.",
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '4',
    name: "Y2K Pinstripe Blazer",
    category: "Tops",
    era: "00s",
    price: 6800,
    condition: "Like New",
    sellerId: "archive_01",
    description: "Sharp Y2K-era pinstripe blazer with a structured shoulder and tailored fit. An unlikely icon.",
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '5',
    name: "Faded Band Tee '78",
    category: "Tops",
    era: "70s",
    price: 3200,
    condition: "Gently Used",
    sellerId: "midnight_archive",
    description: "Authentic 1978 concert tee with beautiful sun-bleached fade. The softness of six decades of cotton.",
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '6',
    name: "Sterling Silver Bolo",
    category: "Accessories",
    era: "80s",
    price: 2400,
    condition: "Pristine",
    sellerId: "archive_01",
    description: "Genuine sterling silver bolo tie with turquoise inlay. A masterpiece of American Southwest craft.",
    imageUrl: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '7',
    name: "90s Boxy Wool Blazer",
    category: "Tops",
    era: "90s",
    price: 12500,
    condition: "Like New",
    designer: "Jil Sander",
    sellerId: "user_rt_01",
    description: "A minimalist icon. Structured shoulders and a sharp, boxy silhouette in charcoal virgin wool.",
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '8',
    name: "Vintage 501s - 1982",
    category: "Bottoms",
    era: "80s",
    price: 7200,
    condition: "Gently Used",
    designer: "Levi's",
    sellerId: "user_rt_02",
    description: "Classic red-tab 501s from 1982. Beautiful natural whiskering and a perfect straight-leg fit.",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '9',
    name: "Silk Slip Dress",
    category: "Tops",
    era: "90s",
    price: 8900,
    condition: "Pristine",
    designer: "Calvin Klein",
    sellerId: "midnight_archive",
    description: "The definitive 90s silhouette. Heavy-weight silk bias-cut dress in a deep obsidian hue.",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '10',
    name: "Oversized Cashmere Scarf",
    category: "Accessories",
    era: "00s",
    price: 11000,
    condition: "Like New",
    designer: "Loro Piana",
    sellerId: "archive_01",
    description: "Unparalleled softness. Hand-loomed cashmere in a generous size, perfect for layering.",
    imageUrl: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '11',
    name: "Deconstructed Knit Sweater",
    category: "Tops",
    era: "90s",
    price: 15500,
    condition: "Archive Grade",
    designer: "Maison Margiela",
    sellerId: "user_rt_01",
    description: "An exploration of construction. Visible seams and intentional distressing from the 1997 runway.",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '12',
    name: "Lug Sole Archive Boots",
    category: "Accessories",
    era: "90s",
    price: 24000,
    condition: "Gently Used",
    designer: "Ann Demeulemeester",
    sellerId: "midnight_archive",
    description: "Heavy lug sole with triple-wrapped laces. A gothic-minimalist staple in premium calf leather.",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '13',
    name: "High-Waist Pleated Trousers",
    category: "Bottoms",
    era: "80s",
    price: 6800,
    condition: "Pristine",
    designer: "Armani",
    sellerId: "user_rt_02",
    description: "Fluid tailoring from the master of soft structure. Deep double pleats in a lightweight wool crepe.",
    imageUrl: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '14',
    name: "Technical Nylon Parka",
    category: "Outerwear",
    era: "00s",
    price: 32000,
    condition: "Like New",
    designer: "Prada",
    sellerId: "archive_01",
    description: "Industrial elegance. Weatherproof technical nylon with archival red stripe branding on the cuff.",
    imageUrl: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=900&q=85&auto=format&fit=crop"
  },
  {
    id: '15',
    name: "Minimalist Leather Tote",
    category: "Accessories",
    era: "90s",
    price: 18000,
    condition: "Gently Used",
    designer: "Celine",
    sellerId: "midnight_archive",
    description: "Phoebe Philo era-inspired geometry. Single-piece construction in buttery soft nappa leather.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=85&auto=format&fit=crop"
  }
];

function Navigation({ cartCount, wishlistCount }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <header className="header-nav">
      <Link to="/" className="brand-link">ReThread</Link>
      <nav className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'active' : ''}`}>Shop</Link>
        <Link to="/lookbook" className={`nav-link ${isActive('/lookbook') ? 'active' : ''}`}>Lookbook</Link>
        <Link to="/journal" className={`nav-link ${isActive('/journal') ? 'active' : ''}`}>Journal</Link>
        <Link to="/manifesto" className={`nav-link ${isActive('/manifesto') ? 'active' : ''}`}>Manifesto</Link>
        <Link to="/sell" className={`nav-link ${isActive('/sell') ? 'active' : ''}`}>Sell</Link>
      </nav>
      <div className="nav-actions">
        <Link to="/wishlist" className={`nav-icon-btn ${isActive('/wishlist') ? 'active' : ''}`} aria-label="Wishlist">
          ♡{wishlistCount > 0 && <span className="nav-count">{wishlistCount}</span>}
        </Link>
        <Link to="/cart" className={`nav-icon-btn ${isActive('/cart') ? 'active' : ''}`} aria-label="Cart">
          ○{cartCount > 0 && <span className="nav-count">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default function App() {
  const [products, setProducts] = useState(() => {
    try {
      const PRODUCTS_VERSION = 'v5'; // bump this to reset cached products
      const savedVersion = localStorage.getItem('rethread_products_version');
      if (savedVersion !== PRODUCTS_VERSION) {
        localStorage.setItem('rethread_products_version', PRODUCTS_VERSION);
        localStorage.removeItem('rethread_products');
        return initialMockProducts;
      }
      const saved = localStorage.getItem('rethread_products');
      return saved ? JSON.parse(saved) : initialMockProducts;
    } catch (e) {
      return initialMockProducts;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('rethread_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('rethread_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem('rethread_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rethread_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rethread_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const addToCart = (productId) => {
    setCart((prev) => prev.includes(productId) ? prev : [...prev, productId]);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(id => id !== productId));
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (productId) => {
    setWishlist((prev) => prev.includes(productId) ? prev : [...prev, productId]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter(id => id !== productId));
  };

  return (
    <Router>
      <div className="grain-overlay" />
      <Navigation cartCount={cart.length} wishlistCount={wishlist.length} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop products={products} addToCart={addToCart} addToWishlist={addToWishlist} cartItems={cart} />} />
          <Route path="/sell" element={<Sell addProduct={addProduct} />} />
          <Route path="/cart" element={<Cart cartItems={cart} products={products} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} products={products} removeFromWishlist={removeFromWishlist} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} addToWishlist={addToWishlist} cartItems={cart} />} />
          <Route path="/archivist/:handle" element={<ArchivistProfile products={products} />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}
