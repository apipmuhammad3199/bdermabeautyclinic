import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import TreatmentCard from '../components/TreatmentCard';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../index.css';
import { CMSContext } from '../context/CMSContext';
import { sortTreatments } from '../utils/sortTreatments';

function AllTreatment() {
  const { treatments, skincareProducts } = useContext(CMSContext);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  const filteredTreatments = sortTreatments(treatments).filter(t => {
    if (activeTab === 'all') return true;
    if (activeTab === 'laser') return (t.name || '').toLowerCase().includes('laser') || (t.name || '').toLowerCase().includes('pico') || (t.name || '').toLowerCase().includes('ipl');
    if (activeTab === 'facial') return (t.name || '').toLowerCase().includes('facial') || (t.name || '').toLowerCase().includes('peel') || (t.name || '').toLowerCase().includes('acne');
    if (activeTab === 'skincare') return false;
    return true;
  });

  return (
    <div className="app-container" style={{ minHeight: '100vh' }}>
      <Header />

      <section className="catalog-container" data-aos="fade-up" style={{ marginTop: '20px' }}>
        <div className="catalog-header text-center" style={{ marginBottom: '2.5rem' }}>
          <div className="section-subtitle-gold">PREMIERE KATALOG</div>
          <h2 className="section-title-grey" style={{ fontSize: '2.2rem' }}>LAYANAN EKSKLUSIF & PERAWATAN</h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0.8rem auto 0' }}>
            Jelajahi seluruh rangkaian perawatan estetika dan medis terbaik dari B'DERMABEAUTY CLINIC Premiere untuk memancarkan kecantikan alami Anda.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button 
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'all' ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#0F0F10] shadow-[0_4px_15px_rgba(212,175,55,0.3)]' : 'bg-[#18181B] text-[#CCCCCC] border border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:text-[#FAFAFA]'}`}
            onClick={() => setActiveTab('all')}
          >
            Semua Layanan
          </button>
          <button 
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'laser' ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#0F0F10] shadow-[0_4px_15px_rgba(212,175,55,0.3)]' : 'bg-[#18181B] text-[#CCCCCC] border border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:text-[#FAFAFA]'}`}
            onClick={() => setActiveTab('laser')}
          >
            Laser & Light
          </button>
          <button 
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'facial' ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#0F0F10] shadow-[0_4px_15px_rgba(212,175,55,0.3)]' : 'bg-[#18181B] text-[#CCCCCC] border border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:text-[#FAFAFA]'}`}
            onClick={() => setActiveTab('facial')}
          >
            Facial & Peeling
          </button>
          <button 
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'skincare' ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#0F0F10] shadow-[0_4px_15px_rgba(212,175,55,0.3)]' : 'bg-[#18181B] text-[#CCCCCC] border border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:text-[#FAFAFA]'}`}
            onClick={() => setActiveTab('skincare')}
          >
            Skincare Line
          </button>
        </div>
        
        {activeTab === 'skincare' ? (
          <div className="catalog-grid">
            {skincareProducts.map((product, index) => (
              <ProductCard key={`skincare-${index}`} product={product} />
            ))}
          </div>
        ) : filteredTreatments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
            Belum ada perawatan yang tersedia untuk kategori ini.
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredTreatments.map((treatment, index) => (
              <TreatmentCard key={index} treatment={treatment} />
            ))}
          </div>
        )}
      </section>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default AllTreatment;
