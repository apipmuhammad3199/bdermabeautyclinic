import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) return null;

  const formatPrice = (price) => {
    if (!price) return '';
    return 'Rp. ' + Number(price).toLocaleString('id-ID');
  };

  const waText = encodeURIComponent(`Halo B'DERMABEAUTY CLINIC Premiere, saya ingin pesan produk Skincare: ${product.name}`);
  const waUrl = `https://api.whatsapp.com/send?phone=628214464406&text=${waText}`;

  return (
    <>
      <div 
        className="product-card card-glass group relative flex flex-col justify-between p-5 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#18181B] transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)]" 
        style={{ cursor: 'pointer', textDecoration: 'none', display: 'flex' }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="badge" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '0.3rem 0.8rem', fontSize: '0.65rem', fontWeight: '600', tracking: '1px', position: 'absolute', top: 0, right: 0, borderBottomLeftRadius: '8px' }}>
          PREMIERE LINE
        </div>

        <div className="product-image-container relative w-full h-56 bg-[#141416] rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-[rgba(212,175,55,0.15)]">
          <img 
            src={product.image && (product.image.startsWith('data:') || product.image.startsWith('http') || product.image.includes('assets')) ? product.image : `${import.meta.env.BASE_URL}assets/product_skincare/${product.image}`} 
            alt={product.name} 
            className="product-image w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="product-content text-center flex-grow">
          <h3 className="product-name font-['Cinzel',serif] text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] uppercase tracking-wide mb-2">
            {product.name}
          </h3>
          {product.price && (
            <p className="font-bold text-[#FCF6BA] text-sm mb-3">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
        <a 
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn-gold w-full text-center py-2 rounded-xl font-bold text-xs text-[#0F0F10] tracking-wide shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.45)] transition-all duration-300"
        >
          Order Skincare
        </a>
      </div>

      {isModalOpen && createPortal(
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 9999, padding: '1rem', boxSizing: 'border-box'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: '#18181B', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '20px', padding: '2rem',
              width: '100%', maxWidth: '420px', maxHeight: '90vh', overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)', position: 'relative',
              display: 'flex', flexDirection: 'column', gap: '1rem', color: '#FAFAFA'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem', background: 'transparent',
                border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#D4AF37'
              }}
            >
              &times;
            </button>
            <img 
              src={product.image && (product.image.startsWith('data:') || product.image.startsWith('http') || product.image.includes('assets')) ? product.image : `${import.meta.env.BASE_URL}assets/product_skincare/${product.image}`} 
              alt={product.name} 
              style={{ width: '100%', height: '240px', objectFit: 'contain', borderRadius: '12px', backgroundColor: '#141416' }}
            />
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0.5rem 0 0 0' }}>{product.name}</h3>
            {product.price && (
              <p style={{ color: '#FCF6BA', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>
                {formatPrice(product.price)}
              </p>
            )}
            {product.description && (
              <p style={{ color: '#CCCCCC', lineHeight: '1.6', fontSize: '0.9rem', whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
                {product.description}
              </p>
            )}
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full text-center py-3 rounded-xl font-bold text-sm text-[#0F0F10] mt-2"
            >
              Pesan Sekarang via WA
            </a>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProductCard;
