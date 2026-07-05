import React, { useContext, useEffect } from 'react';
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
  const { treatments, perawatanPDFs } = useContext(CMSContext);

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

  const promoTreatments = treatments.filter(t => t.discount === 45 && isPromoActive(t.startDate, t.endDate));

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', paddingBottom: '4rem', backgroundColor: '#fafafa' }}>
      <Header />
      
      <section className="catalog-container" data-aos="fade-up" style={{ marginTop: '30px' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 className="section-title-grey" style={{ color: 'var(--primary-color)' }}>HALAMAN PERAWATAN</h2>
          <p style={{ color: 'var(--text-light)', marginTop: '1rem' }}>
            Jelajahi dokumen perawatan eksklusif serta promo perawatan premium Enef Clinic.
          </p>
        </div>

        {/* Perawatan PDFs Section */}
        {perawatanPDFs && perawatanPDFs.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ color: '#444', marginBottom: '1.5rem', textAlign: 'center' }}>Perawatan</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {perawatanPDFs.map((pdf, index) => (
                <div key={index} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  {pdf.image ? (
                    <div style={{ width: '100%', height: '150px', marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={pdf.image} alt={pdf.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📄</div>
                  )}
                  <h4 style={{ color: '#333', marginBottom: '1rem', fontSize: '1.1rem' }}>{pdf.name}</h4>
                  <a href={pdf.pdfLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'var(--primary-color)', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>Lihat PDF</a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h3 style={{ color: '#444' }}>Promo Spesial 45%</h3>
        </div>

        {promoTreatments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
            Saat ini tidak ada perawatan diskon 45%.
          </div>
        ) : (
          <div className="catalog-grid">
            {promoTreatments.map((treatment, index) => (
              <TreatmentCard key={index} treatment={{ ...treatment, effectiveDiscount: 45 }} />
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

