import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="elegant-footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Enef Clinic</h3>
          <p>Klinik kecantikan terpercaya yang memberikan solusi terbaik untuk masalah kulit Anda. Kami berkomitmen memberikan pelayanan dan hasil yang memuaskan.</p>
          <div className="social-icons-footer">
            <a href="https://www.instagram.com/enefclinic/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@enefclinic" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Tautan Cepat</h3>
          <Link to="/">Beranda</Link>
          <Link to="/promo-45">Promo 45%</Link>
          <Link to="/promo-50">Promo 50%</Link>
          <Link to="/products">Produk Skincare</Link>
          <Link to="/articles">Tips dan Insight</Link>
          <a href="#/" onClick={(e) => { e.preventDefault(); const el = document.getElementById('lokasi'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); } else { window.location.href = '/#/'; } }}>Lokasi Klinik</a>
        </div>
        <div className="footer-column">
          <h3>Kontak Kami</h3>
          <p>Ruko Emporium Citra Niaga No. 10<br/>Jl. Palagan Ambarawa, Bawen<br/>Jawa Tengah, Indonesia</p>
          <p><strong>WhatsApp:</strong> <br/>0821-4464-406</p>
          <p><strong>Email:</strong> <br/>enefclinic@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Enef Clinic. All rights reserved. | Elegance in every detail.</p>
      </div>
    </footer>
  );
}

export default Footer;
