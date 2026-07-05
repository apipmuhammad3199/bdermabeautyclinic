import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Perawatan() {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', paddingBottom: '4rem', backgroundColor: '#fafafa' }}>
      <Header />
      
      <section className="catalog-container" data-aos="fade-up" style={{ marginTop: '100px' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 className="section-title-grey" style={{ color: 'var(--primary-color)' }}>HALAMAN PERAWATAN</h2>
          <p style={{ color: 'var(--text-light)', marginTop: '1rem' }}>
            Konten halaman Perawatan akan ditambahkan di sini.
          </p>
        </div>
      </section>
<Footer />

      <FloatingWhatsApp />
    </div>
  );
}

export default Perawatan;

