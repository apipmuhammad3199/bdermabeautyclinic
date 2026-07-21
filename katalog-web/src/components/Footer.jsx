import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="elegant-footer" style={{ backgroundColor: '#0A0A0B', borderTop: '1px solid rgba(212, 175, 55, 0.25)', color: '#FAFAFA', padding: '4rem 2rem 2rem 2rem' }}>
      <div className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
        {/* Brand Column */}
        <div className="footer-column">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <img src={`${import.meta.env.BASE_URL}assets/logo.svg`} alt="B'DERMABEAUTY Logo" style={{ height: '40px' }} />
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.15rem', margin: 0, background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              B'DERMABEAUTY CLINIC Premiere
            </h3>
          </div>
          <p style={{ fontStyle: 'italic', color: '#FCF6BA', fontSize: '0.88rem', marginBottom: '1rem', fontFamily: 'Cinzel, serif' }}>
            "Elegance in Every Detail. Dermatological Excellence."
          </p>
          <p style={{ color: '#CCCCCC', fontSize: '0.85rem', lineHeight: '1.6' }}>
            Klinik estetika & kecantikan medis premiere terpercaya yang menghadirkan perawatan dermatologis berkualitas tinggi dengan standar keunggulan profesional.
          </p>
          <div className="social-icons-footer" style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
            <a href="https://instagram.com/bdermabeautyclinic" target="_blank" rel="noopener noreferrer" aria-label="Instagram Clinic" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', background: '#18181B', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#D4AF37' }}>
              <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@bdermabeauty.officiall" target="_blank" rel="noopener noreferrer" aria-label="TikTok CEO" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', background: '#18181B', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#D4AF37' }}>
              <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h4 style={{ fontFamily: 'Cinzel, serif', color: '#FCF6BA', fontSize: '1.05rem', marginBottom: '1.2rem', letterSpacing: '1px' }}>Tautan Cepat</h4>
          <Link to="/" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.6rem', textDecoration: 'none', fontSize: '0.88rem' }}>Beranda</Link>
          <Link to="/products" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.6rem', textDecoration: 'none', fontSize: '0.88rem' }}>Skincare Line</Link>
          <Link to="/perawatan" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.6rem', textDecoration: 'none', fontSize: '0.88rem' }}>Dokumen Perawatan</Link>
          <Link to="/promo" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.6rem', textDecoration: 'none', fontSize: '0.88rem' }}>Promo Special</Link>
          <Link to="/before-after" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.6rem', textDecoration: 'none', fontSize: '0.88rem' }}>Before & After</Link>
          <Link to="/socials" style={{ color: '#CCCCCC', display: 'block', marginBottom: '0.6rem', textDecoration: 'none', fontSize: '0.88rem' }}>Semua Media Sosial</Link>
        </div>

        {/* Official Marketplace Column */}
        <div className="footer-column">
          <h4 style={{ fontFamily: 'Cinzel, serif', color: '#FCF6BA', fontSize: '1.05rem', marginBottom: '1.2rem', letterSpacing: '1px' }}>Official Marketplace</h4>
          <a href="https://shopee.co.id/bdermabeauty_official_shop?smtt=0.288148504-1666797165.9" target="_blank" rel="noopener noreferrer" style={{ color: '#EE4D2D', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '600' }}>
            🛒 Shopee Official Store
          </a>
          <a href="https://www.tokopedia.com/bder?utm_source=salinlink&utm_medium=share&utm_campaign=Shop-72921724-14622950-271022-no" target="_blank" rel="noopener noreferrer" style={{ color: '#03AC0E', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '600' }}>
            🛍️ Tokopedia Official
          </a>
          <a href="https://s.lazada.co.id/s.RQxCM" target="_blank" rel="noopener noreferrer" style={{ color: '#5B8DEF', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '600' }}>
            📦 Lazada Official
          </a>
        </div>

        {/* Contact Info Column */}
        <div className="footer-column">
          <h4 style={{ fontFamily: 'Cinzel, serif', color: '#FCF6BA', fontSize: '1.05rem', marginBottom: '1.2rem', letterSpacing: '1px' }}>Klinik Samarinda</h4>
          <p style={{ color: '#CCCCCC', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
            Jl. Siradj Salman No.08, RT.52, Air Hitam, Kec. Samarinda Ulu, Kota Samarinda, Kalimantan Timur 75117
          </p>
          <p style={{ color: '#CCCCCC', fontSize: '0.85rem', marginBottom: '0.6rem' }}>
            <strong style={{ color: '#D4AF37' }}>WA Admin:</strong> <a href="https://wa.me/message/7AUW3MTYBWOZN1" target="_blank" rel="noopener noreferrer" style={{ color: '#FAFAFA', textDecoration: 'underline' }}>+62 811-500-993</a>
          </p>
          <p style={{ color: '#CCCCCC', fontSize: '0.85rem', marginBottom: '0.6rem' }}>
            <strong style={{ color: '#D4AF37' }}>WA Order:</strong> <a href="https://wa.me/message/ZA7HJ5GJNF7YL1" target="_blank" rel="noopener noreferrer" style={{ color: '#FAFAFA', textDecoration: 'underline' }}>Pesan Skincare</a>
          </p>
          <p style={{ color: '#CCCCCC', fontSize: '0.85rem' }}>
            <strong style={{ color: '#D4AF37' }}>Maps:</strong> <a href="https://g.co/kgs/J6jYSq" target="_blank" rel="noopener noreferrer" style={{ color: '#FCF6BA', textDecoration: 'underline' }}>B'DERMABEAUTY Samarinda</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '1.5rem', color: '#A0A0AB', fontSize: '0.85rem' }}>
        <p>Copyright &copy; 2026 B'DERMABEAUTY CLINIC Premiere (Samarinda). All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
