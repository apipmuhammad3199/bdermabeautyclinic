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
  const waUrl = `https://wa.me/message/ZA7HJ5GJNF7YL1`;

  return (
    <>
      <div 
        className="product-card card-glass group relative flex flex-col justify-between p-5 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#18181B] transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)] h-full overflow-hidden" 
        style={{ cursor: 'pointer', textDecoration: 'none', display: 'flex', position: 'relative' }}
        onClick={() => setIsModalOpen(true)}
      >
        <div 
          className="badge" 
          style={{ 
            background: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)', 
            color: '#0F0F10', 
            padding: '0.35rem 0.85rem', 
            fontSize: '0.65rem', 
            fontWeight: '700', 
            letterSpacing: '1px', 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            borderBottomLeftRadius: '10px',
            borderTopRightRadius: '16px',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}
        >
          PREMIERE LINE
        </div>

        <div className="product-image-container relative w-full aspect-[4/3] bg-[#141416] rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-[rgba(212,175,55,0.15)] mt-2">
          <img 
            src={product.image && product.image.startsWith('http') ? product.image : 'https://images.unsplash.com/photo-1608248597309-45da1707ad33?auto=format&fit=crop&w=800&q=85'} 
            alt={product.name} 
            className="product-image w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="product-content text-center flex-grow flex flex-col justify-between mb-4">
          <h3 className="product-name font-['Cinzel',serif] text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] uppercase tracking-wide line-clamp-2 min-h-[2.4rem] flex items-center justify-center">
            {product.name}
          </h3>
          {product.price && (
            <p className="font-bold text-[#FCF6BA] text-sm md:text-base mt-2">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
        
        <a 
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn-gold w-full text-center py-2.5 rounded-xl font-bold text-xs text-[#0F0F10] tracking-wide shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.45)] transition-all duration-300"
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
              src={product.image && product.image.startsWith('http') ? product.image : 'https://images.unsplash.com/photo-1608248597309-45da1707ad33?auto=format&fit=crop&w=800&q=85'} 
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
              <p style={{ color: '#CCCCCC', lineHeight: '1.6', fontSize: '0.9rem', whiteSpace: 'pre-wrap', marginTop: '0.25rem' }}>
                {product.description}
              </p>
            )}

            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#D4AF37', letterSpacing: '1px', uppercase: 'true' }}>
                ORDER VIA MARKETPLACE & WA
              </div>
              <a 
                href="https://wa.me/message/ZA7HJ5GJNF7YL1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full text-center py-2.5 rounded-xl font-bold text-xs text-[#0F0F10]"
              >
                💬 Order via WhatsApp Admin
              </a>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <a 
                  href="https://shopee.co.id/bdermabeauty_official_shop?smtt=0.288148504-1666797165.9"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#EE4D2D', color: '#FFF', padding: '0.55rem 0.25rem', borderRadius: '10px',
                    textAlign: 'center', fontSize: '0.75rem', fontWeight: '700', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                  }}
                >
                  Shopee
                </a>
                <a 
                  href="https://www.tokopedia.com/bder?utm_source=salinlink&utm_medium=share&utm_campaign=Shop-72921724-14622950-271022-no"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#03AC0E', color: '#FFF', padding: '0.55rem 0.25rem', borderRadius: '10px',
                    textAlign: 'center', fontSize: '0.75rem', fontWeight: '700', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                  }}
                >
                  Tokopedia
                </a>
                <a 
                  href="https://s.lazada.co.id/s.RQxCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#0F146D', color: '#FFF', padding: '0.55rem 0.25rem', borderRadius: '10px',
                    textAlign: 'center', fontSize: '0.75rem', fontWeight: '700', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                  }}
                >
                  Lazada
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProductCard;

