import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import TreatmentCard from '../components/TreatmentCard';
import ProductCard from '../components/ProductCard';
import PromoSlider from '../components/PromoSlider';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import AOS from 'aos';
import { CMSContext } from '../context/CMSContext';
import '../index.css';
import Header from '../components/Header';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { treatments, promos, videos, promoSettings, skincareProducts, testimonials, articles } = useContext(CMSContext);
  const marqueeRef = useRef(null);
  const testiMarqueeRef = useRef(null);
  const contactDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target)) {
        setIsContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Skincare Marquee
      if (marqueeRef.current) {
        const container = marqueeRef.current;
        const cardWidth = 260 + 24; // product-card width + gap
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
      // Testimonial Marquee
      if (testiMarqueeRef.current) {
        const container = testiMarqueeRef.current;
        const cardWidth = 320 + 32; // testi-card min-width roughly + gap
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
    // Add small delay refresh for dynamic content
    setTimeout(() => AOS.refresh(), 500);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const isPromoActive = (startDate, endDate) => {
    if (!startDate || !endDate) return true;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    return today >= start && today <= end;
  };

  const processedTreatments = (treatments || []).map(treatment => {
    let effectiveDiscount = treatment.discount;
    if (treatment.discount > 0 && !isPromoActive(treatment.startDate, treatment.endDate)) {
      effectiveDiscount = 0;
    }
    return { ...treatment, effectiveDiscount };
  });

  const treatments55 = processedTreatments.filter(t => t.effectiveDiscount === 55 && (t.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
  const treatments50 = processedTreatments.filter(t => t.effectiveDiscount === 50 && (t.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
  const treatments45 = processedTreatments.filter(t => t.effectiveDiscount === 45 && (t.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
  
  const treatmentsAll = processedTreatments.filter(t => {
    const matchesSearch = (t.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (searchTerm === '') {
      return t.effectiveDiscount === 0 && matchesSearch;
    }
    return matchesSearch;
  });

  const searchedProducts = (skincareProducts || []).filter(p => (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()));

  // Duplicate array for infinite marquee effect
  const marqueeProducts = [...(skincareProducts || []), ...(skincareProducts || [])];

  const marqueeTestimonials = [...(testimonials || []), ...(testimonials || [])];

  const preview55 = treatments55.slice(0, 4);
  const preview50 = treatments50.slice(0, 4);
  const preview45 = treatments45.slice(0, 4);

  const hasActive55 = processedTreatments.some(t => t.effectiveDiscount === 55);
  const hasActive50 = processedTreatments.some(t => t.effectiveDiscount === 50);
  const hasActive45 = processedTreatments.some(t => t.effectiveDiscount === 45);

  return (
    <div className="app-container">
      <Header />

      {/* Banner Promo / Slider Container */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="card-glass overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <PromoSlider />
        </div>
      </div>

      {/* Hero Section */}
      <section id="beranda" className="hero py-12 px-4 text-center max-w-5xl mx-auto" data-aos="fade-up">
        {/* Badge Atas */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(24,24,27,0.8)] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-6 shadow-[0_2px_12px_rgba(212,175,55,0.15)]">
          <span>✦ PREMIERE MEDICAL BEAUTY & AESTHETIC</span>
        </div>

        {/* Headline Utama */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] leading-tight">
          Redefining Medical Beauty & Aesthetic Excellence
        </h1>

        {/* Sub-headline */}
        <p className="text-base md:text-xl text-[#CCCCCC] max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Unveiling Your Radiant Skin with Personalized Care
        </p>
        
        {/* Call To Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <Link 
            to="/booking" 
            className="btn-gold px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:scale-105 transition-all duration-300"
          >
            Reservasi Konsultasi
          </Link>
          <Link 
            to="/perawatan" 
            className="px-8 py-3.5 rounded-full border border-[#D4AF37] text-[#FAFAFA] font-semibold text-sm tracking-wide bg-transparent hover:bg-[rgba(212,175,55,0.15)] hover:text-[#D4AF37] transition-all duration-300"
          >
            Eksplor Treatment
          </Link>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Cari perawatan atau produk..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Search Results Section */}
      {searchTerm !== '' ? (
        <section id="search-results" className="catalog-container" style={{ paddingTop: '2rem', marginTop: '1rem', }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 className="section-title-grey">HASIL PENCARIAN</h2>
            <p style={{ color: 'var(--text-light)' }}>Menampilkan hasil untuk: <strong>"{searchTerm}"</strong></p>
          </div>

          {treatmentsAll.length === 0 && searchedProducts.length === 0 ? (
             <div style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>
               Tidak ada perawatan atau produk yang cocok dengan pencarian Anda.
             </div>
          ) : (
            <div className="catalog-grid">
              {treatmentsAll.map((treatment, index) => (
                <TreatmentCard key={`t-${index}`} treatment={treatment} />
              ))}
              {searchedProducts.map((product, index) => (
                <ProductCard key={`p-${index}`} product={product} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Skincare Products Section */}
      <section id="skincare" className="catalog-container" data-aos="fade-up" data-aos-delay="50" style={{ paddingBottom: '2rem', paddingTop: '2rem', marginTop: '1rem' }}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <div className="section-subtitle-gold">REKOMENDASI PRODUK</div>
          <h2 className="section-title-grey">PILIHAN TERBAIK UNTUKMU</h2>
        </div>
        
        <div className="marquee-container-stepped" ref={marqueeRef}>
          <div className="marquee-content-stepped">
            {marqueeProducts.map((product, index) => (
              <div key={`prod-${index}`} className="stepped-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
          <Link to="/products" className="btn-produk-lainnya">
            Produk Lainnya &rarr;
          </Link>
        </div>
      </section>

      {/* Bukti Nyata (Video) Section */}
      <section id="testimoni" className="video-section" data-aos="fade-up" style={{ textAlign: 'left', padding: '2rem 1rem', marginTop: '1rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="section-subtitle-gold">BUKTI NYATA</div>
          <h2 className="section-title-grey">MEREKA YANG TELAH MEMBUKTIKANNYA</h2>
        </div>
        <div className="video-grid">
          {(videos || []).slice(0, 4).map((vid, idx) => {
            const isMp4 = vid.src.includes('firebasestorage') || vid.src.endsWith('.mp4');
            return (
            <div key={idx} className="video-card" data-aos="fade-up" data-aos-delay={100 * (idx + 1)}>
              <div style={{ width: '100%', height: '340px', overflow: 'hidden', position: 'relative', background: '#000' }}>
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
              <div className="video-info">
                <h3>{vid.title}</h3>
              </div>
            </div>
            );
          })}
        </div>
        {(videos && videos.length > 4) && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/videos" className="btn-produk-lainnya">
              Lihat Lebih Banyak &rarr;
            </Link>
          </div>
        )}
      </section>



      {/* Location Section */}
      <section id="lokasi" style={{ backgroundColor: 'transparent', paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div className="maps-section-wrapper" data-aos="fade-up">
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div className="section-subtitle-gold">DAPATKAN LOKASI TERDEKAT</div>
            <h2 className="section-title-grey" style={{ fontSize: '2.2rem' }}>EXECUTIVE SUITE & KLINIK KAMI</h2>
          </div>

          <div className="maps-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {/* Left Info Column */}
            <div className="maps-info-left card-glass" style={{ background: '#18181B', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '20px', padding: '2rem', backdropFilter: 'blur(12px)' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#FAFAFA', marginBottom: '0.8rem', background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                B'DERMABEAUTY CLINIC Premiere
              </h3>
              <p className="maps-address" style={{ color: '#CCCCCC', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.8rem' }}>
                Ruko Emporium Citra Niaga No. 10<br/>Jl. Palagan Ambarawa, Ngrawan Kidul, Bawen,<br/>Jawa Tengah, Indonesia.
              </p>
              
              <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#FCF6BA', marginBottom: '1rem', letterSpacing: '1px' }}>
                ✦ JAM OPERASIONAL
              </h4>
              <div className="op-hours-table" style={{ background: '#141416', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '1rem' }}>
                <div className="op-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', color: '#FAFAFA', fontSize: '0.9rem' }}><span>Senin - Sabtu</span><span style={{ color: '#FCF6BA', fontWeight: 'bold' }}>11:00 - 19:00 WIB</span></div>
                <div className="op-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: '#FAFAFA', fontSize: '0.9rem' }}><span>Minggu</span><span style={{ color: '#FCF6BA', fontWeight: 'bold' }}>11:00 - 19:00 WIB</span></div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <a 
                  href="https://maps.google.com/?q=Enef+clinic+Bawen" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-gold" 
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '10px', padding: '0.85rem' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                  Petunjuk Arah Google Maps
                </a>
              </div>
            </div>
            
            {/* Right Maps & Preview Column */}
            <div className="maps-container-right" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.3)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', minHeight: '320px' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.07705354904!2d110.40742187515155!3d-7.231998592774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708170d3752e25%3A0xe5f92ff4cbffb1e6!2sEnef%20clinic!5e0!3m2!1sid!2sid!4v1709618195846!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '320px', display: 'block' }} 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="B'DERMABEAUTY CLINIC Premiere Location"
                ></iframe>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: '180px' }}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.25)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                  <img src={`${import.meta.env.BASE_URL}assets/Maps1.jpeg`} alt="B'DERMABEAUTY CLINIC Exterior" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.25)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                  <img src={`${import.meta.env.BASE_URL}assets/Maps2.jpeg`} alt="B'DERMABEAUTY CLINIC Interior" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      )}

      {/* Floating WhatsApp */}

      <FloatingWhatsApp />

      {/* Testimonial Gallery Section */}
      <section id="galeri-testimoni" className="testimonial-section" data-aos="fade-up">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="section-subtitle-gold">KATA MEREKA</div>
          <h2 className="section-title-grey">GALERI TESTIMONI</h2>
        </div>
        <div className="marquee-container-stepped" ref={testiMarqueeRef}>
          <div className="marquee-content-stepped">
            {marqueeTestimonials.map((testi, index) => (
              <div key={`testi-${index}`} className="stepped-item" style={{ minWidth: '320px' }}>
                <div className="testi-card">
                  <div className="testi-quote">
                    <p>{testi.quote}</p>
                  </div>
                  <div className="testi-author">
                    <div className="testi-avatar">
                      {testi?.image ? <img src={testi.image} alt={testi?.name} /> : (testi?.name || '?').charAt(0)}
                    </div>
                    <div>
                      <div className="testi-name">{testi?.name}</div>
                      <div className="testi-treatment">{testi?.treatment}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips and Insight Section */}
      <section id="insight" style={{ backgroundColor: '#fafafa', paddingTop: '4rem', marginTop: '2rem' }}>
        <div className="catalog-container" data-aos="fade-up">
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div className="section-subtitle-gold">TIPS DAN INSIGHT</div>
            <h2 className="section-title-grey" style={{ textTransform: 'uppercase' }}>SELALU DAPATKAN UPDATE INSIGHT KECANTIKAN</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', gap: '2rem' }}>
            {/* Featured Article (Left) */}
            {articles.length > 0 && (
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }} data-aos="fade-right">
                <div style={{ width: '100%', height: '300px', overflow: 'hidden', borderRadius: '8px' }}>
                  <img src={articles[0].image && articles[0].image.startsWith('/') ? `${import.meta.env.BASE_URL}${articles[0].image.substring(1)}` : articles[0].image} alt={articles[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginTop: '0.5rem', lineHeight: '1.4' }}>{articles[0].title}</h3>
                <Link to="/articles" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem' }}>Selengkapnya</Link>
              </div>
            )}
            
            {/* Other Articles (Right) */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'flex-start' }} data-aos="fade-left">
              {articles.slice(1, 5).map((article, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: idx < 3 ? '1px solid #eaeaea' : 'none', paddingBottom: idx < 3 ? '1rem' : '0' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', fontWeight: '500', lineHeight: '1.4' }}>{article.title}</h4>
                  <Link to="/articles" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem' }}>Selengkapnya</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Footer */}
      <Footer />
    </div>
  );
}

export default Home;


