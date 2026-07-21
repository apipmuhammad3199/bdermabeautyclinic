import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import VideoGallery from './pages/VideoGallery';
import Socials from './pages/Socials';
import Booking from './pages/Booking';
import Promo50 from './pages/Promo50';
import Promo55 from './pages/Promo55';
import Promo45 from './pages/Promo45';
import Products from './pages/Products';
import AllTreatment from './pages/AllTreatment';
import PromoTreatment from './pages/PromoTreatment';
import Articles from './pages/Articles';
import Perawatan from './pages/Perawatan';
import BeforeAfter from './pages/BeforeAfter';
import { CMSProvider } from './context/CMSContext';

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('cms_auth') === 'true';
  return isAuth ? children : <Navigate to="/login" replace />;
};

// Setiap pindah halaman selalu mulai dari paling atas
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

function App() {
  useEffect(() => {
    document.title = "B'DERMABEAUTY CLINIC Premiere | Luxury Aesthetic & Skincare";
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <CMSProvider>
      <div className="bg-[#0F0F10] text-[#FAFAFA] min-h-screen selection:bg-[#D4AF37] selection:text-[#0F0F10]">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/treatments" element={<AllTreatment />} />
            <Route path="/promo" element={<PromoTreatment />} />
            <Route path="/promo-50" element={<Promo50 />} />
            <Route path="/promo-55" element={<Promo55 />} />
            <Route path="/promo-45" element={<Promo45 />} />
            <Route path="/products" element={<Products />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/perawatan" element={<Perawatan />} />
            <Route path="/before-after" element={<BeforeAfter />} />
            <Route path="/videos" element={<VideoGallery />} />
            <Route path="/socials" element={<Socials />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </Router>
      </div>
    </CMSProvider>
  );
}

export default App;
