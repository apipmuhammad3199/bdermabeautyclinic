import React, { createContext, useState, useEffect } from 'react';
import defaultTreatments from '../data.json';

export const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [treatments, setTreatments] = useState([]);
  const [promos, setPromos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [promoSettings, setPromoSettings] = useState({ 
    show45: true, show50: true
  });

  useEffect(() => {
    // Load treatments
    const savedTreatments = localStorage.getItem('cms_treatments');
    if (savedTreatments) {
      setTreatments(JSON.parse(savedTreatments));
    } else {
      setTreatments(defaultTreatments);
    }

    // Load promos
    const savedPromos = localStorage.getItem('cms_promos');
    if (savedPromos) {
      setPromos(JSON.parse(savedPromos));
    } else {
      setPromos([
        `${import.meta.env.BASE_URL}assets/Slide1.jpg`,
        `${import.meta.env.BASE_URL}assets/Slide2.jpg`,
        `${import.meta.env.BASE_URL}assets/Slide3.jpg`,
      ]);
    }

    // Load videos
    const savedVideos = localStorage.getItem('cms_videos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      setVideos([
        { src: `${import.meta.env.BASE_URL}assets/videos/enefclinic1.mp4`, title: "Enef Clinic Treatment" },
        { src: `${import.meta.env.BASE_URL}assets/videos/enefclinic2.mp4`, title: "Treatment Review" }
      ]);
    }

    // Load promo settings
    const savedPromoSettings = localStorage.getItem('cms_promo_settings');
    if (savedPromoSettings) {
      setPromoSettings(prev => ({ ...prev, ...JSON.parse(savedPromoSettings) }));
    }
  }, []);

  const addTreatment = (newTreatment) => {
    const updated = [newTreatment, ...treatments];
    setTreatments(updated);
    localStorage.setItem('cms_treatments', JSON.stringify(updated));
  };

  const removeTreatment = (index) => {
    const updated = treatments.filter((_, i) => i !== index);
    setTreatments(updated);
    localStorage.setItem('cms_treatments', JSON.stringify(updated));
  };

  const addPromo = (promoUrl) => {
    const updated = [promoUrl, ...promos];
    setPromos(updated);
    localStorage.setItem('cms_promos', JSON.stringify(updated));
  };

  const removePromo = (index) => {
    const updated = promos.filter((_, i) => i !== index);
    setPromos(updated);
    localStorage.setItem('cms_promos', JSON.stringify(updated));
  };

  const addVideo = (videoObj) => {
    const updated = [videoObj, ...videos];
    setVideos(updated);
    localStorage.setItem('cms_videos', JSON.stringify(updated));
  };

  const removeVideo = (index) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
    localStorage.setItem('cms_videos', JSON.stringify(updated));
  };

  const updatePromoSettings = (settings) => {
    setPromoSettings(settings);
    localStorage.setItem('cms_promo_settings', JSON.stringify(settings));
  };

  return (
    <CMSContext.Provider value={{
      treatments, addTreatment, removeTreatment,
      promos, addPromo, removePromo,
      videos, addVideo, removeVideo,
      promoSettings, updatePromoSettings
    }}>
      {children}
    </CMSContext.Provider>
  );
};
