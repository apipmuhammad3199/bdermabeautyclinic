import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CMSContext } from '../context/CMSContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { users } = useContext(CMSContext);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check against users from Firestore
    const userFound = users.find(u => u.username === username && u.password === password);
    
    if (userFound || (username === 'admin' && password === 'admin123')) { // Fallback to hardcoded just in case
      localStorage.setItem('cms_auth', 'true');
      navigate('/admin');
    } else {
      setError('Username atau Password salah!');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Silakan isi Username Anda terlebih dahulu sebelum menekan Lupa Password.");
      return;
    }
    const message = encodeURIComponent(`Halo Developer, saya ingin reset password dengan Username saya: ${username}`);
    window.open(`https://wa.me/6287714001013?text=${message}`, '_blank');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Inter' }}>
      <div style={{ background: 'white', padding: '3rem 2.5rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#222', fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>Selamat Datang</h2>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>Login ke Enef CMS Dashboard</p>
        </div>
        
        {error && <div style={{ background: '#ffeeee', color: '#ff4757', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem', border: '1px solid #ffccd1' }}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: '#555' }}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', transition: 'border 0.2s' }}
              placeholder="Masukkan username"
              required
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: '#555' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', transition: 'border 0.2s' }}
              placeholder="Masukkan password"
              required
            />
          </div>
          <button 
            type="submit"
            style={{ width: '100%', padding: '1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(186, 155, 92, 0.3)', marginBottom: '1rem' }}
            onMouseOver={(e) => e.target.style.filter = 'brightness(1.1)'}
            onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
          >
            Masuk ke Dashboard
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <button 
              type="button" 
              onClick={handleForgotPassword}
              style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
            >
              Lupa Password? Hubungi Developer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
