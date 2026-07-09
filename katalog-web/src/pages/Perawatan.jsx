import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import TreatmentCard from '../components/TreatmentCard';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../index.css';
import { CMSContext } from '../context/CMSContext';

function Perawatan() {
  const { perawatanPDFs } = useContext(CMSContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPDFs = (perawatanPDFs || []).filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Header />
      
      <section className="catalog-container" data-aos="fade-up" style={{ marginTop: '30px', paddingBottom: '4rem' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 className="section-title-grey" style={{ color: 'var(--primary-color)' }}>HALAMAN PERAWATAN</h2>
          <p style={{ color: 'var(--text-light)', marginTop: '1rem' }}>
            Jelajahi dokumen perawatan eksklusif Enef Clinic.
          </p>
        </div>

        <div className="search-container" style={{ marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 3rem auto' }}>
          <input 
            type="text" 
            placeholder="Cari perawatan..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredPDFs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
            {searchTerm ? 'Perawatan tidak ditemukan.' : 'Saat ini tidak ada perawatan.'}
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredPDFs.map((pdf, index) => (
              <TreatmentCard key={index} treatment={{ ...pdf, effectiveDiscount: 0, endDate: null, discount: 0 }} />
            ))}
          </div>
        )}
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default Perawatan;

