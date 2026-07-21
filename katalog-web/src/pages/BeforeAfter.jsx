import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CMSContext } from '../context/CMSContext';

function BeforeAfter() {
  const sliderRef = useRef(null);
  const { beforeAfterImages } = useContext(CMSContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const container = sliderRef.current;
        const scrollAmount = container.clientWidth >= 768 ? 320 : container.clientWidth;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth >= 768 ? 320 : sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth >= 768 ? 320 : sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <Header />
      
      <section className="catalog-container" style={{ paddingTop: '20px', marginTop: '20px', paddingBottom: '10px' }}>
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }} data-aos="fade-up">
          <div className="section-subtitle-gold">TRANSFORMASI EKSKLUSIF</div>
          <h2 className="section-title-grey" style={{ marginBottom: '1rem', fontSize: '2.2rem' }}>BEFORE & AFTER GALERI</h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto' }}>
            Lihat perubahan luar biasa dan bukti nyata dari pasien-pasien kami setelah menjalani perawatan di B'DERMABEAUTY CLINIC Premiere.
          </p>
        </div>
      </section>

      <div className="slider-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto 4rem auto' }} data-aos="fade-up" data-aos-delay="100">
        <button onClick={scrollLeft} className="slider-btn left" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#18181B', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '50%', width: '48px', height: '48px', boxShadow: '0 4px 15px rgba(0,0,0,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#D4AF37', transition: 'all 0.3s ease' }}>&#10094;</button>
          
          <div 
            ref={sliderRef}
            className="slider-container"
            style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              scrollBehavior: 'smooth', 
              gap: '24px',
              padding: '20px 10px 40px 10px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {beforeAfterImages.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', width: '100%', color: 'var(--text-light)' }}>Belum ada foto transformasi yang diunggah.</div>
            ) : beforeAfterImages.map((slide, index) => (
              <div key={index} style={{ 
                minWidth: '330px', 
                maxWidth: '360px',
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Dark Luxury Gold Card */}
                <div style={{
                  borderRadius: '20px',
                  background: '#18181B',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backdropFilter: 'blur(12px)',
                  padding: '1.5rem',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)'
                }}>
                  {/* Clinic Watermark & Logo Tag */}
                  <div style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '1px'
                    }}>
                      B'DERMABEAUTY
                    </span>
                    <span style={{
                      fontSize: '0.65rem',
                      color: 'rgba(212, 175, 55, 0.8)',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontFamily: 'Montserrat, sans-serif'
                    }}>
                      PREMIERE
                    </span>
                  </div>

                  {/* Title Pill */}
                  <div style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#FCF6BA',
                    padding: '0.4rem 1.2rem',
                    borderRadius: '30px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    fontFamily: 'Cinzel, serif',
                    marginBottom: '1.2rem',
                    textAlign: 'center',
                    width: '100%'
                  }}>
                    {slide.title}
                  </div>

                  {/* Image Frame with Gold Precision Border & Watermark */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    marginBottom: '1.5rem',
                    backgroundColor: '#141416'
                  }}>
                    <img 
                      src={slide.img} 
                      alt={`Before After ${index + 1}`} 
                      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                      loading="lazy"
                    />

                    {/* Preserved High-Precision Watermark Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(15, 15, 16, 0.75)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      backdropFilter: 'blur(4px)',
                      color: '#D4AF37',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.6rem',
                      fontWeight: '600',
                      letterSpacing: '1px'
                    }}>
                      B'DERMABEAUTY Premiere
                    </div>
                    
                    {/* Before Pill */}
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '15px',
                      backgroundColor: 'rgba(15, 15, 16, 0.85)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      color: '#FCF6BA',
                      padding: '0.25rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                    }}>
                      Before
                    </div>
                    
                    {/* After Pill */}
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '15px',
                      backgroundColor: 'rgba(212, 175, 55, 0.9)',
                      color: '#0F0F10',
                      padding: '0.25rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                    }}>
                      After
                    </div>
                  </div>

                  {/* Bottom Doctor Info & Signature */}
                  <div style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: 'auto',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(212, 175, 55, 0.15)'
                  }}>
                    <div style={{
                      color: '#D4AF37',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {slide.doctor || "Treatment by : dr. B'DERMA"}
                    </div>
                    <div style={{
                      color: '#A0A0AB',
                      fontSize: '0.6rem',
                      fontWeight: '600',
                      textAlign: 'right',
                      letterSpacing: '1px'
                    }}>
                      #PREMIEREBEAUTY
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={scrollRight} className="slider-btn right" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#18181B', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '50%', width: '48px', height: '48px', boxShadow: '0 4px 15px rgba(0,0,0,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#D4AF37', transition: 'all 0.3s ease' }}>&#10095;</button>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .slider-container::-webkit-scrollbar {
            display: none;
          }
          .slider-btn:hover {
            background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728) !important;
            color: #0F0F10 !important;
            border-color: #FCF6BA !important;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.5) !important;
          }
          @media (max-width: 768px) {
            .slider-btn {
              display: none !important;
            }
            .slider-container > div {
              min-width: 85% !important;
            }
          }
        `}} />

      <Footer />

      <FloatingWhatsApp />
    </div>
  );
}

export default BeforeAfter;
