import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import VideoGallery from './pages/VideoGallery';
import Socials from './pages/Socials';
import { CMSProvider } from './context/CMSContext';

function App() {
  return (
    <CMSProvider>
      {/* 
        Using HashRouter is the most robust way to handle client-side routing
        on GitHub Pages without needing special 404.html redirects.
      */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoGallery />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </CMSProvider>
  );
}

export default App;
