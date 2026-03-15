import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ArtworkDetail from './pages/ArtworkDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="flex flex-col min-h-screen bg-cream fade-in-enter">
          <Navbar />
          <main className="flex-grow pt-24 min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/artwork/:id" element={<ArtworkDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
