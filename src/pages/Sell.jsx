import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sell.css';

export default function Sell({ addProduct }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Outerwear',
    era: '90s',
    condition: 'Gently Used',
    price: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=85&auto=format&fit=crop'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now().toString(),
      price: Number(formData.price),
      sellerId: 'user_rt_' + Math.floor(Math.random() * 1000)
    };
    addProduct(newProduct);
    navigate('/shop');
  };

  return (
    <div className="sell-page container-fade">
      <div className="sell-layout">
        <section className="form-section">
          <h1 className="display-text sell-title">Archive Your Piece</h1>
          <p className="sell-subtitle">Curate the future of vintage by listing your authentic finds.</p>

          <form onSubmit={handleSubmit} className="sell-form">
            <div className="form-group-custom">
              <label className="label-gallery">Imagery</label>
              <div className="upload-zone">
                <span className="material-symbols-outlined">add_a_photo</span>
                <p>Click to upload high-fidelity shots</p>
              </div>
            </div>

            <div className="form-group-custom">
              <label className="label-gallery">Item Name</label>
              <input 
                type="text" 
                name="name"
                className="input-archive" 
                placeholder="e.g. 1994 Helmut Lang Raw Denim" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group-custom">
                <label className="label-gallery">Category</label>
                <select name="category" className="select-archive" value={formData.category} onChange={handleChange}>
                  <option>Outerwear</option>
                  <option>Tops</option>
                  <option>Bottoms</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label className="label-gallery">Era</label>
                <select name="era" className="select-archive" value={formData.era} onChange={handleChange}>
                  <option>70s</option>
                  <option>80s</option>
                  <option>90s</option>
                  <option>Y2K</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label className="label-gallery">Condition</label>
                <select name="condition" className="select-archive" value={formData.condition} onChange={handleChange}>
                  <option>Like New</option>
                  <option>Gently Used</option>
                  <option>Worn</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label className="label-gallery">Price (₹)</label>
                <input 
                  type="number" 
                  name="price"
                  className="input-archive" 
                  placeholder="0.00" 
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group-custom">
              <label className="label-gallery">Provenance</label>
              <textarea 
                name="description"
                className="textarea-archive" 
                rows="4" 
                placeholder="Describe the silhouette, fabric quality, and historical context..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
              Finalize Listing
            </button>
          </form>
        </section>

        <aside className="preview-section">
          <div className="preview-sticky">
            <h3 className="sidebar-title" style={{ marginBottom: '2rem' }}>Live Archive Preview</h3>
            <div className="preview-card-large">
              <div className="preview-img-wrap">
                <img src={formData.imageUrl} alt="Preview" />
              </div>
              <div className="preview-info">
                <h2 className="display-text" style={{ fontSize: '2rem' }}>{formData.name || 'Your Item Title'}</h2>
                <span className="price-tag">₹{formData.price || '0'}</span>
                <p className="preview-desc">{formData.description || 'A seminal piece from the archive...'}</p>
                <div className="tag-row">
                  <span className="pill">{formData.era}</span>
                  <span className="pill">{formData.category}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
