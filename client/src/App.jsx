import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import Header from './components/Header'
import HeaderStrip from './components/HeaderStrip'
import HeroSlider from './components/HeroSlider'
import QuickLinks from './components/QuickLinks'
import Products from './components/Products'
import Offers from './components/Offers'
import MobileBanking from './components/MobileBanking'
import Security from './components/Security'
import Footer from './components/Footer'
import MobileMenu from './components/MobileMenu'
import ChatFloat from './components/ChatFloat'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import PlayStorePage from './pages/PlayStorePage'
import PlayStorePageDark from './pages/PlayStorePageDark'

function HomePage({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate()
  
  const handleHomeClick = (e) => {
    const target = e.target
    if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('.fixed')) return
    navigate('/login')
  }
  
  return (
    <div className="min-h-screen bg-white" onClick={handleHomeClick}>
      <SplashScreen />
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <HeaderStrip />
      </div>
      <div className="pt-[84px]">
        <HeroSlider />
        <QuickLinks />
        <Products />
        <Offers />
        <MobileBanking />
        <Security />
        <Footer />
      </div>
      <MobileMenu menuOpen={menuOpen} />
      <ChatFloat />
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/app" element={<PlayStorePage />} />
        <Route path="/app-dark" element={<PlayStorePageDark />} />
        <Route path="/" element={<HomePage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
      </Routes>
    </Router>
  )
}

export default App
