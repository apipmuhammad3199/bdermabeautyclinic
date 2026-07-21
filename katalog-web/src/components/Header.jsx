import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contactDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target)) {
        setIsContactOpen(false);
      }
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) && 
        !event.target.closest('.hamburger-btn')
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent background scroll when mobile drawer is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle smooth scroll for Home links if already on home, else navigate
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Container */}
        <div className="logo-container">
          <Link to="/" className="brand-logo-link" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src={`${import.meta.env.BASE_URL}assets/logo.svg`} 
              alt="B'DERMABEAUTY CLINIC Premiere" 
              className="logo" 
            />
            <div className="brand-title-wrap">
              <div className="brand-title-main">
                <span className="clinic-name">B'DERMABEAUTY</span>
                <span className="clinic-sub">CLINIC</span>
              </div>
              <span className="clinic-premiere-tag">PREMIERE</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links">
          <Link to="/" className={`nav-link ${isActive('/') && location.hash === '' ? 'active' : ''}`}>
            Beranda
          </Link>
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
            Skincare
          </Link>
          <Link to="/perawatan" className={`nav-link ${isActive('/perawatan') ? 'active' : ''}`}>
            Perawatan
          </Link>
          <Link to="/promo" className={`nav-link ${isActive('/promo') ? 'active' : ''}`}>
            Promo Special
          </Link>
          <Link to="/before-after" className={`nav-link ${isActive('/before-after') ? 'active' : ''}`}>
            Before & After
          </Link>
          <Link to="/videos" className={`nav-link ${isActive('/videos') ? 'active' : ''}`}>
            BD Channel
          </Link>
          <a href="/" onClick={(e) => handleNavClick(e, 'lokasi')} className="nav-link">
            Klinik Kami
          </a>
        </nav>

        {/* Header Actions (CTA + Mobile Toggle) */}
        <div className="header-actions">
          {/* Reservasi & Kontak Dropdown */}
          <div className="social-links click-dropdown" ref={contactDropdownRef}>
            <button 
              className="contact-us-btn" 
              onClick={(e) => {
                e.preventDefault();
                setIsContactOpen(!isContactOpen);
              }}
              aria-label="Reservasi & Kontak"
            >
              <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="14" height="14"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
              <span className="contact-text">Reservasi & Kontak</span>
              <svg className={`chevron-icon ${isContactOpen ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="10"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            </button>
            
            <div className={`click-dropdown-content ${isContactOpen ? 'show' : ''}`}>
              <Link to="/booking" onClick={() => { setIsContactOpen(false); setIsMobileMenuOpen(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="16"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48V448c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM400 192H48V448H400V192zM96 256h64c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16z"/></svg>
                Booking Online
              </Link>
              <a href="https://wa.me/message/7AUW3MTYBWOZN1" target="_blank" rel="noopener noreferrer" onClick={() => { setIsContactOpen(false); setIsMobileMenuOpen(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="16"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.8c-33 0-65.4-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.1l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                Chat Admin WA Samarinda
              </a>
              <a href="https://instagram.com/bdermabeautyclinic" target="_blank" rel="noopener noreferrer" onClick={() => { setIsContactOpen(false); setIsMobileMenuOpen(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="16"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                Instagram Clinic
              </a>
              <a href="https://www.tiktok.com/@bdermabeauty.officiall" target="_blank" rel="noopener noreferrer" onClick={() => { setIsContactOpen(false); setIsMobileMenuOpen(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="16"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                TikTok Official
              </a>
            </div>
          </div>

          {/* Hamburger Toggle Button */}
          <button 
            className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay & Drawer */}
      <div 
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'show' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">MENU UTAMA</span>
          <button 
            className="mobile-close-btn" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="mobile-nav-links">
          <Link to="/" className={`mobile-nav-link ${isActive('/') && location.hash === '' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <span>Beranda</span>
            <span className="nav-arrow">→</span>
          </Link>
          <Link to="/products" className={`mobile-nav-link ${isActive('/products') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <span>Skincare</span>
            <span className="nav-arrow">→</span>
          </Link>
          <Link to="/perawatan" className={`mobile-nav-link ${isActive('/perawatan') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <span>Perawatan</span>
            <span className="nav-arrow">→</span>
          </Link>
          <Link to="/promo" className={`mobile-nav-link ${isActive('/promo') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <span>Promo Special</span>
            <span className="nav-badge">HOT</span>
          </Link>
          <Link to="/before-after" className={`mobile-nav-link ${isActive('/before-after') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <span>Before & After</span>
            <span className="nav-arrow">→</span>
          </Link>
          <Link to="/videos" className={`mobile-nav-link ${isActive('/videos') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <span>BD Channel</span>
            <span className="nav-arrow">→</span>
          </Link>
          <a href="/" onClick={(e) => handleNavClick(e, 'lokasi')} className="mobile-nav-link">
            <span>Klinik Kami</span>
            <span className="nav-arrow">→</span>
          </a>
        </nav>

        <div className="mobile-drawer-cta">
          <Link to="/booking" className="btn-gold style-full" onClick={() => setIsMobileMenuOpen(false)} style={{ width: '100%', textAlign: 'center' }}>
            Reservasi Konsultasi
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

