import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (price) => {
    if (!price) return '';
    return 'Rp. ' + Number(price).toLocaleString('id-ID');
  };

  return (
    <>
      <div 
        className="product-card" 
        style={{ cursor: 'pointer', textDecoration: 'none', display: 'block' }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="product-image-container">
          <img 
            src={product.image && (product.image.startsWith('data:') || product.image.startsWith('http') || product.image.includes('assets')) ? product.image : `${import.meta.env.BASE_URL}assets/product_skincare/${product.image}`} 
            alt={product.name} 
            className="product-image"
          />
        </div>
        <div className="product-content">
          <h3 className="product-name">{product.name}</h3>
          {product.price && (
            <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', marginTop: '0.5rem' }}>
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>

      {isModalOpen && createPortal(
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(5px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 9999, padding: '1rem', boxSizing: 'border-box'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: '#fff', borderRadius: '16px', padding: '2rem',
              width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)', position: 'relative',
              display: 'flex', flexDirection: 'column', gap: '1rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem', background: 'transparent',
                border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666'
              }}
            >
              &times;
            </button>
            <img 
              src={product.image && (product.image.startsWith('data:') || product.image.startsWith('http') || product.image.includes('assets')) ? product.image : `${import.meta.env.BASE_URL}assets/product_skincare/${product.image}`} 
              alt={product.name} 
              style={{ width: '100%', height: '250px', objectFit: 'contain', borderRadius: '12px' }}
            />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{product.name}</h3>
            {product.price && (
              <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>
                {formatPrice(product.price)}
              </p>
            )}
            {product.description && (
              <p style={{ color: '#555', lineHeight: '1.5', whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
                {product.description}
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProductCard;
