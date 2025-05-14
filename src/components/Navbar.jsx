import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const checkLoginStatus = () => {
      const user = localStorage.getItem('user')
      setIsLoggedIn(!!user)
    }

    window.addEventListener('scroll', handleScroll)
    checkLoginStatus()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="logo">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="logo-circle"></span>
              <span className="logo-text">Mindful Space</span>
            </motion.div>
          </Link>

          <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Menu">
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>

          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link to="/mood-tracker" className={location.pathname === '/mood-tracker' ? 'active' : ''}>Mood Tracker</Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link to="/meditations" className={location.pathname === '/meditations' ? 'active' : ''}>Meditations</Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link to="/breathing" className={location.pathname === '/breathing' ? 'active' : ''}>Breathing</Link>
              </motion.li>
            </ul>
          </nav>

          <div className="nav-cta">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar