import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CMSContext } from '../context/CMSContext';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

function VideoGallery() {
  const { videos } = useContext(CMSContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container">
      {/* Header (Simplified) */}
      <header className="header" style={{ justifyContent: 'center', padding: '1.5rem' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'var(--text-dark)' }}>
          <img src={`${import.meta.env.BASE_URL}assets/logo.jpg`} alt="Enef Clinic Logo" className="logo" />
          <div className="clinic-name">Enef Clinic</div>
        </Link>
      </header>

      {/* Main Video Section */}
      <section className="video-section" style={{ paddingTop: '2rem', minHeight: '60vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2>Semua Koleksi Video</h2>
          <Link to="/" style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-color)', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '500' }}>
            &larr; Kembali ke Beranda
          </Link>
        </div>
        
        {videos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
            Belum ada video yang diunggah.
          </div>
        ) : (
          <div className="video-grid">
            {videos.map((vid, idx) => (
              <div key={idx} className="video-card">
                <video controls src={vid.src}></video>
                <div className="video-info">
                  <h3>{vid.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <FloatingWhatsApp />

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Enef Clinic. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>Elegance in every detail.</p>
      </footer>
    </div>
  );
}

export default VideoGallery;
