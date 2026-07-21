import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CMSContext } from '../context/CMSContext';
import localPdfs from '../data/localPdfs.json';

const normalizeName = (value = '') => (value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, ' ');

const isSameTreatmentName = (left, right) => {
  const leftName = normalizeName(left);
  const rightName = normalizeName(right);
  return leftName === rightName || leftName === `${rightName} 2` || `${leftName} 2` === rightName;
};

const getDiscountBadge = (discount, isProduct) => {
  if (discount === 50) return <div className="badge" style={{ background: 'var(--gold-gradient)', color: '#0F0F10', padding: '0.35rem 0.9rem', fontSize: '0.7rem', fontWeight: 'bold' }}>50% OFF</div>;
  if (discount === 45) return <div className="badge" style={{ background: 'var(--gold-gradient)', color: '#0F0F10', padding: '0.35rem 0.9rem', fontSize: '0.7rem', fontWeight: 'bold' }}>45% OFF</div>;
  if (isProduct) return <div className="badge" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '0.3rem 0.8rem', fontSize: '0.65rem', fontWeight: '600', tracking: '1px' }}>PREMIERE LINE</div>;
  return <div className="badge" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '0.3rem 0.8rem', fontSize: '0.65rem', fontWeight: '600', tracking: '1px' }}>DOCTOR'S CHOICE</div>;
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

const isUsablePdfLink = (link) => Boolean(link) && link !== '#' && !link.startsWith('blob:');

const TreatmentCard = ({ treatment, isProduct = false }) => {
  const { perawatanPDFs } = useContext(CMSContext);

  if (!treatment) return null;

  const matchedPdf = perawatanPDFs?.find(p => p.name?.trim().toLowerCase() === treatment.name?.trim().toLowerCase());
  
  const localMatch = localPdfs.find(filename => {
    const cleanFile = filename.replace(/\.+pdf$/i, '').trim();
    const cleanName = treatment.name?.trim() || '';
    return isSameTreatmentName(cleanFile, cleanName) || cleanFile.toLowerCase().includes(cleanName.toLowerCase()) || cleanName.toLowerCase().includes(cleanFile.toLowerCase());
  });

  const preferredPdfLink = (treatment.name || '').toLowerCase().includes('body treatment')
    ? `${import.meta.env.BASE_URL}assets/perawatan/BODY%20TREATMENT2.pdf`
    : null;

  const finalPdfLink = preferredPdfLink
    || (isUsablePdfLink(treatment.pdfLink) ? treatment.pdfLink : null)
    || (isUsablePdfLink(matchedPdf?.pdfLink) ? matchedPdf.pdfLink : null);
  
  const activeDiscount = treatment.effectiveDiscount !== undefined ? treatment.effectiveDiscount : treatment.discount;

  const promoPdfUrl = (activeDiscount > 0 && treatment.filename)
    ? `${import.meta.env.BASE_URL}assets/treatments/${treatment.filename}`
    : null;

  const pdfUrl = promoPdfUrl
    || finalPdfLink 
    || (localMatch ? `${import.meta.env.BASE_URL}assets/perawatan/${localMatch}` : null)
    || (treatment.filename ? `${import.meta.env.BASE_URL}assets/treatments/${treatment.filename}` : null);

  const fallbackImage = localMatch ? `${import.meta.env.BASE_URL}assets/perawatan/image/${localMatch.replace(/\.+pdf$/i, '.png')}` : null;
  
  const displayImage = treatment.image 
    ? (treatment.image.startsWith('data:') || treatment.image.startsWith('http') ? treatment.image : `${import.meta.env.BASE_URL}${treatment.image.startsWith('/') ? treatment.image.substring(1) : treatment.image}`) 
    : fallbackImage;

  const waText = encodeURIComponent(`Halo B'DERMABEAUTY CLINIC Premiere, saya berminat untuk reservasi/order ${treatment.name}`);
  const waUrl = `https://api.whatsapp.com/send?phone=628214464406&text=${waText}`;

  return (
    <div className="treatment-card card-glass group relative flex flex-col justify-between p-6 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#18181B] transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)]" data-aos="fade-up">
      {treatment.isNew ? (
        <div className="badge" style={{ background: 'var(--gold-gradient)', color: '#0F0F10', padding: '0.4rem 1rem', borderRadius: '0 0 0 8px', fontWeight: 'bold' }}>BEST SELLER</div>
      ) : (
        getDiscountBadge(activeDiscount, isProduct)
      )}
      
      <div className="card-image-container relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-[#141416] border border-[rgba(212,175,55,0.15)]">
        {displayImage ? (
          <img src={displayImage} alt={treatment.name} className="card-image w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="card-image-placeholder w-full h-full flex items-center justify-center bg-[#18181B]">
            <svg className="placeholder-icon w-12 h-12 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
        <div className="card-overlay absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
        {!isProduct && pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="card-view-details">
            <span>View Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
        )}
      </div>

      <div className="card-content flex-grow text-center">
        <h3 className="treatment-name font-['Cinzel',serif] text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
          {treatment.name}
        </h3>
        {treatment.price && (
          <div className="price-container mb-2">
            {activeDiscount > 0 ? (
              <div className="discount-wrapper flex items-center justify-center gap-2">
                <span className="original-price line-through text-[#A0A0AB] text-sm">{treatment.price}</span>
                <span className="discounted-price font-bold text-[#FCF6BA] text-lg">
                  {calculateDiscountedPrice(treatment.price, activeDiscount)}
                </span>
              </div>
            ) : (
              <span className="regular-price font-bold text-[#FCF6BA] text-base">{treatment.price}</span>
            )}
          </div>
        )}
        {treatment.endDate && (
          <div className="promo-date text-xs text-[#A0A0AB] mb-3">
            *Promo s/d {formatDate(treatment.endDate)}
          </div>
        )}
      </div>
      
      <div className="treatment-actions-group mt-4 flex flex-col gap-2">
        <a 
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="book-now-btn btn-gold w-full text-center py-2.5 rounded-xl font-bold text-sm text-[#0F0F10] tracking-wide shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.45)] transition-all duration-300"
        >
          {isProduct ? 'Order Skincare' : 'Book Treatment'}
        </a>
      </div>
    </div>
  );
};

export default TreatmentCard;
