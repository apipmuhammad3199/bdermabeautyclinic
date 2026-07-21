import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../index.css';

const waAdminSamarinda = "https://wa.me/message/7AUW3MTYBWOZN1";
const waOrderProduk = "https://wa.me/message/ZA7HJ5GJNF7YL1";
const waGeneral = "https://api.whatsapp.com/send?phone=628214464406";

function Socials() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="socials-container">
      <div className="socials-card" data-aos="fade-up" style={{ maxWidth: '540px' }}>
        
        <Link to="/" className="back-link">
          &larr; Kembali ke Beranda
        </Link>
        
        <div className="socials-header">
          <img src={`${import.meta.env.BASE_URL}assets/logo.svg`} alt="B'DERMABEAUTY CLINIC Premiere Logo" className="socials-logo" style={{ height: '60px' }} />
          <h1 className="clinic-name">B'DERMABEAUTY</h1>
          <p className="clinic-tagline" style={{ color: 'var(--accent)', fontSize: '0.85rem', letterSpacing: '2px' }}>CLINIC PREMIERE (SAMARINDA)</p>
        </div>

        <div className="socials-links">
          {/* Main Booking & WA Admin */}
          <Link to="/booking" className="social-btn wa-btn" data-aos="fade-up" data-aos-delay="100">
            <span>📅 Booking Online Treatment</span>
          </Link>

          <a href={waAdminSamarinda} target="_blank" rel="noopener noreferrer" className="social-btn wa-btn" data-aos="fade-up" data-aos-delay="130" style={{ backgroundColor: '#25D366' }}>
            <span>💬 WA Admin Klinik Samarinda</span>
          </a>

          <a href={waOrderProduk} target="_blank" rel="noopener noreferrer" className="social-btn wa-btn" data-aos="fade-up" data-aos-delay="160" style={{ backgroundColor: '#128C7E' }}>
            <span>🛍️ WA Order Skincare Line</span>
          </a>

          {/* Official Marketplaces */}
          <div style={{ margin: '1rem 0 0.5rem 0', textAlign: 'center', fontSize: '0.8rem', color: '#D4AF37', fontWeight: '700', letterSpacing: '1px' }}>
            OFFICIAL MARKETPLACE
          </div>

          <a href="https://shopee.co.id/bdermabeauty_official_shop?smtt=0.288148504-1666797165.9" target="_blank" rel="noopener noreferrer" className="social-btn" data-aos="fade-up" data-aos-delay="190" style={{ backgroundColor: '#EE4D2D', color: '#FFF' }}>
            <span>🛒 Shopee Official Store</span>
          </a>

          <a href="https://www.tokopedia.com/bder?utm_source=salinlink&utm_medium=share&utm_campaign=Shop-72921724-14622950-271022-no" target="_blank" rel="noopener noreferrer" className="social-btn" data-aos="fade-up" data-aos-delay="220" style={{ backgroundColor: '#03AC0E', color: '#FFF' }}>
            <span>🛍️ Tokopedia Official Store</span>
          </a>

          <a href="https://s.lazada.co.id/s.RQxCM" target="_blank" rel="noopener noreferrer" className="social-btn" data-aos="fade-up" data-aos-delay="250" style={{ backgroundColor: '#0F146D', color: '#FFF' }}>
            <span>📦 Lazada Official Store</span>
          </a>

          {/* Official Social Media */}
          <div style={{ margin: '1rem 0 0.5rem 0', textAlign: 'center', fontSize: '0.8rem', color: '#D4AF37', fontWeight: '700', letterSpacing: '1px' }}>
            OFFICIAL SOCIAL MEDIA
          </div>

          <a href="https://instagram.com/bdermabeautyclinic" target="_blank" rel="noopener noreferrer" className="social-btn ig-btn" data-aos="fade-up" data-aos-delay="280">
            <span>📷 Instagram @bdermabeautyclinic</span>
          </a>

          <a href="https://instagram.com/bdermabeauty" target="_blank" rel="noopener noreferrer" className="social-btn ig-btn" data-aos="fade-up" data-aos-delay="310">
            <span>📷 Instagram @bdermabeauty</span>
          </a>

          <a href="https://www.tiktok.com/@bdermabeauty.officiall" target="_blank" rel="noopener noreferrer" className="social-btn tiktok-btn" data-aos="fade-up" data-aos-delay="340">
            <span>🎵 TikTok @bdermabeauty.officiall</span>
          </a>

          <a href="https://www.tiktok.com/@bdermabeautycontent" target="_blank" rel="noopener noreferrer" className="social-btn tiktok-btn" data-aos="fade-up" data-aos-delay="370">
            <span>🎬 TikTok @bdermabeautycontent</span>
          </a>

          {/* Location */}
          <div style={{ margin: '1rem 0 0.5rem 0', textAlign: 'center', fontSize: '0.8rem', color: '#D4AF37', fontWeight: '700', letterSpacing: '1px' }}>
            LOKASI KLINIK
          </div>

          <a href="https://g.co/kgs/J6jYSq" target="_blank" rel="noopener noreferrer" className="social-btn maps-btn" data-aos="fade-up" data-aos-delay="400">
            <span>📍 Google Maps Klinik Samarinda</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Socials;


