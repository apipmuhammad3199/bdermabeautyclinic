import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CMSContext } from '../context/CMSContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

function VideoGallery() {
  const { videos } = useContext(CMSContext);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh' }}>
      <Header />

      <section className="catalog-container" style={{ paddingTop: '2.5rem', marginTop: '1rem', minHeight: '60vh' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="section-subtitle-gold">MEDIA & INSIGHTS</div>
          <h2 className="section-title-grey" style={{ fontSize: '2.2rem' }}>BD Channel (Beauty Insights)</h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0.8rem auto 0' }}>
            Kumpulan video edukasi, perawatan medis estetika, dan ulasan eksklusif dari tim dokter spesialis B'DERMABEAUTY CLINIC Premiere.
          </p>
        </div>
        
        {videos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
            Belum ada video yang diunggah.
          </div>
        ) : (
          <>
            <div className="video-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {videos.slice(0, visibleCount).map((vid, idx) => {
                const isMp4 = vid.src.includes('firebasestorage') || vid.src.endsWith('.mp4');
                return (
                  <div key={idx} className="video-card card-glass group" style={{ background: '#18181B', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '20px', overflow: 'hidden', transition: 'all 0.3s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                    <div style={{ width: '100%', height: '320px', overflow: 'hidden', position: 'relative', background: '#000' }}>
                      {/* Play Icon Badge Accent */}
                      <div className="play-accent-badge" style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 5, background: 'rgba(15, 15, 16, 0.8)', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', boxShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>

                      {isMp4 ? (
                        <video 
                          src={vid.src} 
                          controls 
                          playsInline 
                          onPlay={(e) => {
                            const allVideos = document.querySelectorAll('video');
                            allVideos.forEach(v => {
                              if (v !== e.target) v.pause();
                            });
                          }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <iframe src={vid.src} sandbox="allow-scripts allow-same-origin allow-presentation" width="100%" height="460" frameBorder="0" scrolling="no" allowtransparency="true" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ display: 'block', position: 'absolute', top: '-55px', left: 0, border: 'none', overflow: 'hidden' }}></iframe>
                      )}
                    </div>
                    <div className="video-info" style={{ padding: '1.25rem 1.5rem', background: '#18181B' }}>
                      <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.05rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, lineHeight: '1.4' }}>
                        {vid.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {visibleCount < videos.length && (
              <div style={{ textAlign: 'center', marginTop: '3.5rem', marginBottom: '2rem' }}>
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="btn-gold"
                  style={{ padding: '0.85rem 2.2rem', borderRadius: '30px', fontSize: '0.95rem' }}
                >
                  Tampilkan Lebih Banyak &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default VideoGallery;
