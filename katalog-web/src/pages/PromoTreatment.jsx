import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../index.css';
import { CMSContext } from '../context/CMSContext';

function PromoTreatment() {
  const { treatments } = useContext(CMSContext);

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

  const has45 = treatments.some(t => t.discount === 45 && isPromoActive(t.startDate, t.endDate));
  const has50 = treatments.some(t => t.discount === 50 && isPromoActive(t.startDate, t.endDate));
  const has55 = treatments.some(t => t.discount === 55 && isPromoActive(t.startDate, t.endDate));

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', }}>
      <Header />

      <section className="catalog-container" data-aos="fade-up" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="catalog-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>Pilih Promo Treatment</h2>
          <p style={{ color: 'var(--text-light)' }}>Silakan pilih kategori promo yang ingin Anda lihat.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '1000px' }}>
          
          {has45 && (
            <Link to="/promo-45" style={{ textDecoration: 'none', flex: '1', minWidth: '280px' }} data-aos="fade-right">
              <div style={{
                background: 'linear-gradient(135deg, #fff 0%, #f9f9f9 100%)',
                border: '1px solid #eaeaea',
                borderRadius: '16px',
                padding: '3rem 2rem',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem', fontWeight: 'bold' }}>45%</div>
                <h3 style={{ color: 'var(--text-dark)', marginBottom: '1rem', fontSize: '1.5rem' }}>Promo Spesial 45%</h3>
                <p style={{ color: 'var(--text-light)' }}>Perawatan premium dengan harga terbaik untuk Anda.</p>
                <div style={{ marginTop: '2rem', display: 'inline-block', padding: '10px 24px', backgroundColor: 'var(--primary-color)', color: '#fff', borderRadius: '30px', fontWeight: '600' }}>
                  Lihat Promo &rarr;
                </div>
              </div>
            </Link>
          )}

          {has50 && (
            <Link to="/promo-50" style={{ textDecoration: 'none', flex: '1', minWidth: '280px' }} data-aos="fade-up">
              <div style={{
                background: 'linear-gradient(135deg, var(--primary-color) 0%, #d4b572 100%)',
                borderRadius: '16px',
                padding: '3rem 2rem',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(212,181,114,0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(212,181,114,0.5)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,181,114,0.3)' }}>
                <div style={{ fontSize: '3rem', color: '#fff', marginBottom: '1rem', fontWeight: 'bold' }}>50%</div>
                <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem' }}>Promo Spesial 50%</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)' }}>Penawaran spesial terbatas, jangan sampai terlewatkan!</p>
                <div style={{ marginTop: '2rem', display: 'inline-block', padding: '10px 24px', backgroundColor: '#fff', color: 'var(--primary-color)', borderRadius: '30px', fontWeight: '600' }}>
                  Lihat Promo &rarr;
                </div>
              </div>
            </Link>
          )}

          {has55 && (
            <Link to="/promo-55" style={{ textDecoration: 'none', flex: '1', minWidth: '280px' }} data-aos="fade-left">
              <div style={{
                background: 'linear-gradient(135deg, #111 0%, #333 100%)',
                borderRadius: '16px',
                padding: '3rem 2rem',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.5)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem', fontWeight: 'bold' }}>55%</div>
                <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem' }}>Promo Ekstra 55%</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Kesempatan terbaik dengan diskon terbesar kami.</p>
                <div style={{ marginTop: '2rem', display: 'inline-block', padding: '10px 24px', backgroundColor: 'var(--primary-color)', color: '#fff', borderRadius: '30px', fontWeight: '600' }}>
                  Lihat Promo &rarr;
                </div>
              </div>
            </Link>
          )}

          {!has45 && !has50 && !has55 && (
            <div style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem', width: '100%' }}>
              Saat ini tidak ada promo yang aktif.
            </div>
          )}

        </div>
      </section>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default PromoTreatment;

