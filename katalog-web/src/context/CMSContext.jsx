import React, { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import defaultTreatments from '../data.json';
import { articles as defaultArticles } from '../data/articles';

export const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [treatments, setTreatments] = useState([]);
  const [promos, setPromos] = useState([
    { id: 'default1', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85' },
    { id: 'default2', url: 'https://images.unsplash.com/photo-1512290900673-7002df3ce6a9?auto=format&fit=crop&w=1600&q=85' },
    { id: 'default3', url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1600&q=85' },
    { id: 'default4', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85' },
    { id: 'default5', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=85' },
  ]);
  const [videos, setVideos] = useState([]);
  const [promoSettings, setPromoSettings] = useState({ 
    show45: true, show50: true
  });
  
  const [skincareProducts, setSkincareProducts] = useState([]);
  const [perawatanPDFs, setPerawatanPDFs] = useState([]);
  const [beforeAfterImages, setBeforeAfterImages] = useState([]);
  const [users, setUsers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [articles, setArticles] = useState([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seedDatabase = async () => {
      try {
        const seedDocRef = doc(db, 'settings', 'seedStatusV8');
        const seedDocSnap = await getDoc(seedDocRef);
        if (!seedDocSnap.exists() || !seedDocSnap.data().isSeeded) {
          console.log("Seeding database with defaults...");
          const now = Date.now();
          
          const promosSnap = await getDocs(collection(db, 'promos'));
          if (promosSnap.empty) {
            const defaultPromos = [
              { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85' },
              { url: 'https://images.unsplash.com/photo-1512290900673-7002df3ce6a9?auto=format&fit=crop&w=1600&q=85' },
              { url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1600&q=85' },
              { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85' },
              { url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=85' }
            ];
            for (const p of defaultPromos) await addDoc(collection(db, 'promos'), { ...p, createdAt: now });
          }

          const videosSnap = await getDocs(collection(db, 'videos'));
          if (videosSnap.empty) {
            const defaultVideos = [
              { title: 'Testimoni 1', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
            ];
            for (const v of defaultVideos) await addDoc(collection(db, 'videos'), { ...v, createdAt: now });
          }

          const beforeAfterSnap = await getDocs(collection(db, 'before_after'));
          if (beforeAfterSnap.empty) {
            const correctTitles = [
              "Microdermabrasion", "Injeksi Acne", "Meso Non-Needle + RF Wajah", "Thread Lift Hidung", "Thread Lift Hidung",
              "Threadlift Columella", "Acne Recovery", "Ultimate Acne Booster", "Cauter Skin Tag", "Treatment Skin Tag",
              "Acne Recovery", "IPL Hair Removal (Ketiak)", "Skinbooster Acne"
            ];
            const cleanUnsplashBAs = [
              "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1512290900673-7002df3ce6a9?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1512290900673-7002df3ce6a9?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=85",
              "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85"
            ];
            const defaultBeforeAfters = Array.from({ length: 13 }, (_, i) => ({
              title: correctTitles[i],
              img: cleanUnsplashBAs[i % cleanUnsplashBAs.length]
            }));
            for (const ba of defaultBeforeAfters) await addDoc(collection(db, 'before_after'), { ...ba, createdAt: now });
          }

          const skincareSnap = await getDocs(collection(db, 'skincare_products'));
          if (skincareSnap.empty) {
            const defaultSkincare = [
              { name: 'Body Whitening', image: 'https://images.unsplash.com/photo-1608248597309-45da1707ad33?auto=format&fit=crop&w=800&q=85', price: '83000', description: 'Body Whitening SPF 20 Strawberry.' },
              { name: 'Facial Wash', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85', price: '83000', description: 'Bye Acne Facial Wash.' },
              { name: 'Toner', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85', price: '83000', description: 'Bye Acne Toner.' },
              { name: 'Gentle Cleanser', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=85', price: '53000', description: 'Cera Niacin Gentle Cleanser.' },
              { name: 'Night Cream', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85', price: '83000', description: 'Dreamy Glow HyaluMoist.' },
            ];
            for (const s of defaultSkincare) await addDoc(collection(db, 'skincare_products'), { ...s, createdAt: now });
          }

          const treatmentsSnap = await getDocs(collection(db, 'treatments'));
          if (treatmentsSnap.empty && defaultTreatments) {
            for (const t of defaultTreatments) await addDoc(collection(db, 'treatments'), { ...t, createdAt: now });
          }
          
          const pdfsSnap = await getDocs(collection(db, 'perawatan_pdfs'));
          const existingPdfNames = pdfsSnap.docs.map(doc => doc.data().name?.trim().toLowerCase());
          
          const localPdfs = [
            "ACNE TREATMENT.pdf", "BODY CONTOUR.pdf", "BODY TREATMENT2.pdf", "BOTOX TREATMENT.pdf",
            "CAUTER.pdf", "FACE CONTOUR TREATMENT.pdf", "FACIAL TREATMENT.pdf", "FILLER.pdf",
            "GLOWING TREATMENT.pdf", "HAIR REMOVEL TRATMENT.pdf", "INJECTION TREATMENT.pdf",
            "LASER TREATMENT.pdf", "LUXURY SKINBOOSTER.pdf", "MASSAGE BADAN.pdf",
            "MELASMA FLEK TREATMENT.pdf", "MESOLIPO.pdf", "PAKET BODY CONTOUR.pdf",
            "PEELING.pdf", "RADIO FREQUENCY.pdf", "SCAR TREATMENT.pdf", "SUBSISI.pdf",
            "THREADLIFT..pdf", "TUNGGAL TREATMENT.pdf", "WHITENING TREATMENT.pdf"
          ];
          
          for (const filename of localPdfs) {
            const cleanName = filename.replace(/\.+pdf$/i, '').trim();
            if (!existingPdfNames.includes(cleanName.toLowerCase())) {
              await addDoc(collection(db, 'perawatan_pdfs'), {
                name: cleanName,
                pdfLink: `${import.meta.env.BASE_URL}assets/perawatan/${filename}`,
                createdAt: now
              });
            }
          }

          const articlesSnap = await getDocs(collection(db, 'articles'));
          if (articlesSnap.empty && defaultArticles) {
            for (const a of defaultArticles) await addDoc(collection(db, 'articles'), { ...a, createdAt: now });
          }

          const testimonialsSnap = await getDocs(collection(db, 'testimonials'));
          if (testimonialsSnap.empty) {
            const defaultTestimonials = [
              { name: 'Rina Sari', treatment: 'Facial Acne', quote: 'Pelayanannya sangat ramah dan tempatnya bersih. Wajah saya terasa lebih glowing setelah perawatan pertama!', image: '' },
              { name: 'Dwi Wahyuni', treatment: 'Peeling Glow', quote: 'Dokternya sabar banget jelasin kondisi kulit saya. Krimnya juga cocok dan nggak bikin iritasi.', image: '' },
              { name: 'Anita Kusuma', treatment: 'Laser Rejuvenation', quote: 'Klinik favorit! Harganya terjangkau tapi hasilnya nggak main-main. Sangat direkomendasikan.', image: '' },
              { name: 'Siti Rahma', treatment: 'IPL Hair Removal', quote: 'Hasilnya langsung terlihat sejak treatment pertama. Stafnya sangat profesional dan membantu.', image: '' }
            ];
            for (const t of defaultTestimonials) await addDoc(collection(db, 'testimonials'), { ...t, createdAt: now });
          }

          await setDoc(seedDocRef, { isSeeded: true });
          console.log("Seeding complete!");
        }
      } catch (err) {
        console.error("Error during seedDatabase:", err);
      }
    };

    seedDatabase();
    
    // ONE-TIME FORCE SYNC IMAGES
    const forceSyncImages = async () => {
      try {
        if (!defaultTreatments) return;
        
        // Sync treatments
        const treatmentsSnap = await getDocs(collection(db, 'treatments'));
        for (const docSnap of treatmentsSnap.docs) {
          const data = docSnap.data();
          if (!data.image) {
            const defaultT = defaultTreatments.find(dt => dt.name && data.name && dt.name.toLowerCase() === data.name.toLowerCase());
            if (defaultT && defaultT.image) {
              await setDoc(doc(db, 'treatments', docSnap.id), { image: defaultT.image }, { merge: true });
            }
          }
        }
        
        // Sync perawatan_pdfs
        const pdfsSnap = await getDocs(collection(db, 'perawatan_pdfs'));
        for (const docSnap of pdfsSnap.docs) {
          const data = docSnap.data();
          if (!data.image) {
            const defaultT = defaultTreatments.find(dt => dt.name && data.name && dt.name.toLowerCase() === data.name.toLowerCase());
            if (defaultT && defaultT.image) {
              await setDoc(doc(db, 'perawatan_pdfs', docSnap.id), { image: defaultT.image }, { merge: true });
            }
          }
        }
        console.log("Force sync images complete!");
      } catch (err) {
        console.error("Error during force sync:", err);
      }
    };
    forceSyncImages();

    // ONE-TIME FORCE RE-SEED CLEAN UNSPLASH V6
    const forceReseedCleanUnsplashV6 = async () => {
      try {
        const seedFlag = localStorage.getItem('hasReseededCleanUnsplashV6');
        if (seedFlag || !defaultTreatments) return;
        
        console.log("Wiping and re-seeding clean Unsplash collections...");
        const now = Date.now();

        // 1. Promos
        const promosSnap = await getDocs(collection(db, 'promos'));
        for (const docSnap of promosSnap.docs) {
          await deleteDoc(doc(db, 'promos', docSnap.id));
        }
        const cleanPromos = [
          { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85' },
          { url: 'https://images.unsplash.com/photo-1512290900673-7002df3ce6a9?auto=format&fit=crop&w=1600&q=85' },
          { url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1600&q=85' },
          { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85' },
          { url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=85' }
        ];
        for (const p of cleanPromos) await addDoc(collection(db, 'promos'), { ...p, createdAt: now });

        // 2. Skincare Products
        const skincareSnap = await getDocs(collection(db, 'skincare_products'));
        for (const docSnap of skincareSnap.docs) {
          await deleteDoc(doc(db, 'skincare_products', docSnap.id));
        }
        const cleanSkincare = [
          { name: 'Body Whitening', image: 'https://images.unsplash.com/photo-1608248597309-45da1707ad33?auto=format&fit=crop&w=800&q=85', price: '83000', description: 'Body Whitening SPF 20 Strawberry.' },
          { name: 'Facial Wash', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85', price: '83000', description: 'Bye Acne Facial Wash.' },
          { name: 'Toner', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85', price: '83000', description: 'Bye Acne Toner.' },
          { name: 'Gentle Cleanser', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=85', price: '53000', description: 'Cera Niacin Gentle Cleanser.' },
          { name: 'Night Cream', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85', price: '83000', description: 'Dreamy Glow HyaluMoist.' }
        ];
        for (const s of cleanSkincare) await addDoc(collection(db, 'skincare_products'), { ...s, createdAt: now });

        // 3. Before & After
        const baSnap = await getDocs(collection(db, 'before_after'));
        for (const docSnap of baSnap.docs) {
          await deleteDoc(doc(db, 'before_after', docSnap.id));
        }
        const correctTitles = [
          "Microdermabrasion", "Injeksi Acne", "Meso Non-Needle + RF Wajah", "Thread Lift Hidung", "Thread Lift Hidung",
          "Threadlift Columella", "Acne Recovery", "Ultimate Acne Booster", "Cauter Skin Tag", "Treatment Skin Tag",
          "Acne Recovery", "IPL Hair Removal (Ketiak)", "Skinbooster Acne"
        ];
        const cleanUnsplashBAs = [
          "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1512290900673-7002df3ce6a9?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1512290900673-7002df3ce6a9?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=85",
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85"
        ];
        const defaultBeforeAfters = Array.from({ length: 13 }, (_, i) => ({
          title: correctTitles[i],
          img: cleanUnsplashBAs[i % cleanUnsplashBAs.length]
        }));
        for (const ba of defaultBeforeAfters) await addDoc(collection(db, 'before_after'), { ...ba, createdAt: now });

        // 4. Treatments
        const treatmentsSnap = await getDocs(collection(db, 'treatments'));
        for (const docSnap of treatmentsSnap.docs) {
          await deleteDoc(doc(db, 'treatments', docSnap.id));
        }
        for (const t of defaultTreatments) {
          await addDoc(collection(db, 'treatments'), { ...t, createdAt: now });
        }

        // 5. Videos
        const videosSnap = await getDocs(collection(db, 'videos'));
        for (const docSnap of videosSnap.docs) {
          await deleteDoc(doc(db, 'videos', docSnap.id));
        }
        const cleanVideos = [
          { title: "B'DERMABEAUTY Aesthetic Clinic", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "Dermatological Excellence Samarinda", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ];
        for (const v of cleanVideos) await addDoc(collection(db, 'videos'), { ...v, createdAt: now });
        
        localStorage.setItem('hasReseededCleanUnsplashV6', 'true');
        console.log("Re-seed clean Unsplash V6 complete!");
      } catch (err) {
        console.error(err);
      }
    };
    forceReseedCleanUnsplashV6();

    // Listen to treatments
    const unsubTreatments = onSnapshot(collection(db, 'treatments'), (snapshot) => {
      const treatmentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Inject local LHALA PEEL TREATMENT
      if (!treatmentsData.find(t => t.name === 'LHALA PEEL TREATMENT')) {
        treatmentsData.push({
          id: 'local_lhala_peel',
          name: 'LHALA PEEL TREATMENT',
          price: '', // Removed price as requested
          discount: 0,
          pdfLink: '/assets/perawatan/LHALA PEEL TREATMENT.pdf',
          image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
          isNew: true, // Flag for the New Treatment badge
          createdAt: Date.now()
        });
      }
      
      treatmentsData.sort((a, b) => b.createdAt - a.createdAt);
      setTreatments(treatmentsData);
    });

    // Listen to promos
    const unsubPromos = onSnapshot(collection(db, 'promos'), (snapshot) => {
      const promosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      promosData.sort((a, b) => b.createdAt - a.createdAt);
      setPromos(promosData);
    });

    // Listen to videos
    const unsubVideos = onSnapshot(collection(db, 'videos'), (snapshot) => {
      const videosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      videosData.sort((a, b) => b.createdAt - a.createdAt);
      setVideos(videosData);
    });

    // Listen to promo settings
    const unsubPromoSettings = onSnapshot(doc(db, 'settings', 'promoSettings'), (docSnap) => {
      if (docSnap.exists()) {
        setPromoSettings(docSnap.data());
      }
    });

    const unsubSkincare = onSnapshot(collection(db, 'skincare_products'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => b.createdAt - a.createdAt);
      setSkincareProducts(data);
    });

    const unsubPerawatan = onSnapshot(collection(db, 'perawatan_pdfs'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => b.createdAt - a.createdAt);
      setPerawatanPDFs(data);
    });

    const unsubBeforeAfter = onSnapshot(collection(db, 'before_after'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => b.createdAt - a.createdAt);
      
      setBeforeAfterImages(data);
    });

    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Automatically create a default admin if collection is completely empty
      if (data.length === 0 && !loading) {
        addDoc(collection(db, 'users'), { username: 'admin', password: 'admin123', createdAt: Date.now() });
      }
      setUsers(data);
    });

    setLoading(false);


    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => b.createdAt - a.createdAt);
      
      setTestimonials(data);
    });

    const unsubArticles = onSnapshot(collection(db, 'articles'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => b.createdAt - a.createdAt);
      if (data.length === 0 && defaultArticles) {
        setArticles(defaultArticles);
      } else {
        setArticles(data);
      }
    });
    
    return () => {
      unsubTreatments();
      unsubPromos();
      unsubVideos();
      unsubPromoSettings();
      unsubSkincare();
      unsubPerawatan();
      unsubBeforeAfter();
      unsubUsers();
      unsubTestimonials();
      unsubArticles();
    };
  }, []);

  const addTestimonial = async (data) => {
    try {
      await addDoc(collection(db, 'testimonials'), { ...data, createdAt: Date.now() });
    } catch (error) {
      console.error('Error adding testimonial: ', error);
    }
  };

  const updateTestimonial = async (id, updatedData) => {
    try {
      await setDoc(doc(db, 'testimonials', id), updatedData, { merge: true });
    } catch (e) {
      console.error("Error updating testimonial: ", e);
    }
  };

  const removeTestimonial = async (id) => {
    if(id.startsWith('t')) return; // block deleting defaults
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (error) {
      console.error('Error removing testimonial: ', error);
    }
  };

  const addTreatment = async (newTreatment) => {
    try {
      await addDoc(collection(db, 'treatments'), { ...newTreatment, createdAt: Date.now() });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateTreatment = async (id, updatedData) => {
    try {
      await setDoc(doc(db, 'treatments', id), updatedData, { merge: true });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const removeTreatment = async (id) => {
    try {
      await deleteDoc(doc(db, 'treatments', id));
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  const addPromo = async (promoUrl) => {
    try {
      await addDoc(collection(db, 'promos'), { url: promoUrl, createdAt: Date.now() });
    } catch (e) {
      console.error("Error adding promo: ", e);
    }
  };

  const updatePromo = async (id, updatedData) => {
    try {
      await setDoc(doc(db, 'promos', id), updatedData, { merge: true });
    } catch (e) {
      console.error("Error updating promo: ", e);
    }
  };

  const removePromo = async (id) => {
    try {
      await deleteDoc(doc(db, 'promos', id));
    } catch (e) {
      console.error("Error removing promo: ", e);
    }
  };

  const addVideo = async (videoObj) => {
    try {
      await addDoc(collection(db, 'videos'), { ...videoObj, createdAt: Date.now() });
    } catch (e) {
      console.error("Error adding video: ", e);
    }
  };

  const updateVideo = async (id, updatedData) => {
    try {
      await setDoc(doc(db, 'videos', id), updatedData, { merge: true });
    } catch (e) {
      console.error("Error updating video: ", e);
    }
  };

  const removeVideo = async (id) => {
    try {
      await deleteDoc(doc(db, 'videos', id));
    } catch (e) {
      console.error("Error removing video: ", e);
    }
  };

  const updatePromoSettings = async (settings) => {
    try {
      await setDoc(doc(db, 'settings', 'promoSettings'), settings);
    } catch (e) {
      console.error("Error updating settings: ", e);
    }
  };

  const addSkincare = async (product) => {
    try { await addDoc(collection(db, 'skincare_products'), { ...product, createdAt: Date.now() }); } catch (e) { console.error(e); }
  };
  const updateSkincare = async (id, updatedData) => {
    try { await setDoc(doc(db, 'skincare_products', id), updatedData, { merge: true }); } catch (e) { console.error(e); }
  };
  const removeSkincare = async (id) => {
    try { await deleteDoc(doc(db, 'skincare_products', id)); } catch (e) { console.error(e); }
  };

  const addPerawatanPDF = async (pdf) => {
    try { await addDoc(collection(db, 'perawatan_pdfs'), { ...pdf, createdAt: Date.now() }); } catch (e) { console.error(e); throw e; }
  };
  const updatePerawatanPDF = async (id, updatedData) => {
    try { await setDoc(doc(db, 'perawatan_pdfs', id), updatedData, { merge: true }); } catch (e) { console.error(e); throw e; }
  };
  const removePerawatanPDF = async (id) => {
    try { await deleteDoc(doc(db, 'perawatan_pdfs', id)); } catch (e) { console.error(e); }
  };

  const addBeforeAfter = async (image) => {
    try { await addDoc(collection(db, 'before_after'), { ...image, createdAt: Date.now() }); } catch (e) { console.error(e); }
  };
  const updateBeforeAfter = async (id, updatedData) => {
    try { await setDoc(doc(db, 'before_after', id), updatedData, { merge: true }); } catch (e) { console.error(e); }
  };
  const removeBeforeAfter = async (id) => {
    try { await deleteDoc(doc(db, 'before_after', id)); } catch (e) { console.error(e); }
  };

  const addUser = async (user) => {
    try { await addDoc(collection(db, 'users'), { ...user, createdAt: Date.now() }); } catch (e) { console.error(e); }
  };
  const removeUser = async (id) => {
    try { await deleteDoc(doc(db, 'users', id)); } catch (e) { console.error(e); }
  };

  const addArticle = async (article) => {
    try { await addDoc(collection(db, 'articles'), { ...article, createdAt: Date.now() }); } catch (e) { console.error(e); }
  };
  const updateArticle = async (id, updatedData) => {
    try { await setDoc(doc(db, 'articles', id), updatedData, { merge: true }); } catch (e) { console.error(e); }
  };
  const removeArticle = async (id) => {
    try { await deleteDoc(doc(db, 'articles', id)); } catch (e) { console.error(e); }
  };

  return (
    <CMSContext.Provider value={{
      treatments, addTreatment, updateTreatment, removeTreatment,
      promos, addPromo, updatePromo, removePromo,
      videos, addVideo, updateVideo, removeVideo,
      promoSettings, updatePromoSettings,
      skincareProducts, addSkincare, updateSkincare, removeSkincare,
      perawatanPDFs, addPerawatanPDF, updatePerawatanPDF, removePerawatanPDF,
      beforeAfterImages, addBeforeAfter, updateBeforeAfter, removeBeforeAfter,
      users, addUser, removeUser,
      testimonials, addTestimonial, updateTestimonial, removeTestimonial,
      articles, addArticle, updateArticle, removeArticle,
      loading
    }}>
      {children}
    </CMSContext.Provider>
  );
};
