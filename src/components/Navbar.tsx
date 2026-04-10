import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/imgs/logo.png';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-img-wrap">
              <img src={logoImg} alt="Silk & Shine Club" width={36} height={36} />
            </div>
            <div className="navbar__logo-text">
              <div className="navbar__logo-mark">Silk <span>&</span> Shine</div>
              <div className="navbar__logo-sub">Club · Everlast Wellness</div>
            </div>
          </Link>

          <div className="navbar__links">
            <Link to="/" className={`navbar__link${isActive('/') ? ' navbar__link--active' : ''}`}>Home</Link>
            <Link to="/about" className={`navbar__link${isActive('/about') ? ' navbar__link--active' : ''}`}>About</Link>
            <Link to="/contact" className={`navbar__link${isActive('/contact') ? ' navbar__link--active' : ''}`}>Contact</Link>
          </div>

          <div className="navbar__gender-links">
            <Link to="/for-women" className={`navbar__gender-link${isActive('/for-women') ? ' navbar__gender-link--active' : ''}`}>For Women</Link>
            <Link to="/for-men" className={`navbar__gender-link${isActive('/for-men') ? ' navbar__gender-link--active' : ''}`}>For Men</Link>
          </div>

          <div className="navbar__cta">
            <Link to="/contact" className="btn-primary">Get Membership</Link>
          </div>

          <button
            className={`navbar__toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile${menuOpen ? ' open' : ''}`}>
        <Link to="/" className={`navbar__mobile-link${isActive('/') ? ' navbar__mobile-link--active' : ''}`}>Home</Link>
        <Link to="/for-women" className={`navbar__mobile-link${isActive('/for-women') ? ' navbar__mobile-link--active' : ''}`}>For Women</Link>
        <Link to="/for-men" className={`navbar__mobile-link${isActive('/for-men') ? ' navbar__mobile-link--active' : ''}`}>For Men</Link>
        <Link to="/about" className={`navbar__mobile-link${isActive('/about') ? ' navbar__mobile-link--active' : ''}`}>About</Link>
        <Link to="/contact" className={`navbar__mobile-link${isActive('/contact') ? ' navbar__mobile-link--active' : ''}`}>Contact</Link>
        <div className="navbar__mobile-cta">
          <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Membership</Link>
        </div>
      </div>
    </>
  );
}
