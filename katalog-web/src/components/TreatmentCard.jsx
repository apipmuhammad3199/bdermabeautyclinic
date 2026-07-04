import React from 'react';

const getDiscountBadge = (discount) => {
  if (discount === 50) return <div className="badge badge-50">50% OFF</div>;
  if (discount === 45) return <div className="badge badge-45">45% OFF</div>;
  return null;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const calculateDiscountedPrice = (priceStr, discountPercent) => {
  if (!priceStr || !discountPercent) return priceStr;
  
  const numericString = priceStr.replace(/[^0-9]/g, '');
  if (!numericString) return priceStr;
  
  const originalPrice = parseInt(numericString, 10);
  const discountedPrice = originalPrice - (originalPrice * (discountPercent / 100));
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(discountedPrice);
};

const TreatmentCard = ({ treatment }) => {
  const pdfUrl = treatment.pdfLink || `${import.meta.env.BASE_URL}assets/treatments/${treatment.filename}`;

  const activeDiscount = treatment.effectiveDiscount !== undefined ? treatment.effectiveDiscount : treatment.discount;

  return (
    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="treatment-card" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
      {getDiscountBadge(activeDiscount)}
      
      <div>
        <h3 className="treatment-name">{treatment.name}</h3>
        {treatment.price && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'var(--text-light)', fontWeight: '500' }}>
            {activeDiscount > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div>
                  <span style={{ textDecoration: 'line-through', marginRight: '0.5rem', opacity: 0.7 }}>{treatment.price}</span>
                  <span style={{ color: 'var(--primary-color)', fontWeight: '700', fontSize: '1.1rem' }}>
                    {calculateDiscountedPrice(treatment.price, activeDiscount)}
                  </span>
                </div>
              </div>
            ) : (
              <span>{treatment.price}</span>
            )}
          </div>
        )}
        {treatment.endDate && (
          <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '600', marginTop: treatment.price ? '0.2rem' : '0.5rem' }}>
            *Promo s/d {formatDate(treatment.endDate)}
          </div>
        )}
      </div>
      
      <div className="treatment-action">
        <span>View Details</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </div>
    </a>
  );
};

export default TreatmentCard;
