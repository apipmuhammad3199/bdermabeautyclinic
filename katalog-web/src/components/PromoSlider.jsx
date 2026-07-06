import React, { useState, useEffect, useContext } from 'react';
import { CMSContext } from '../context/CMSContext';

const PromoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { promos: slides } = useContext(CMSContext);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="promo-slider">
      {slides.map((slide, index) => (
        <div className={`slide ${index === currentIndex ? 'active' : ''}`} key={index}>
          <img src={(slide.url || slide).startsWith('data:') || (slide.url || slide).startsWith('http') ? (slide.url || slide) : `${import.meta.env.BASE_URL}${(slide.url || slide).startsWith('/') ? (slide.url || slide).substring(1) : (slide.url || slide)}`} alt={`Enef Clinic Promo ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default PromoSlider;
