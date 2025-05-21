import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 
import { useAuth } from '../context/authContext'; 


function Navbar() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  // Close burgermenu if clicked outside or window is resized
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img 
            src="http://localhost:3000/images/logos/logo-white.png" 
            alt="Spice Planet" 
            style={{ height: '3rem', width: 'auto' }} />
  
        </Link>

        {/* Desktop Links */}
        <div className="icon-links d-none d-md-flex align-items-center gap-3">
        {/* All products */}
        <Link to="/products" className="nav-link text-white">
          All products
        </Link>

        {user ? (
          /* If “user” is truthy (i.e. someone is logged in)… */
          <Link to="/profile" className="nav-link text-white">
            <i className="bi bi-person-circle"></i> 
          </Link>
        ) : (
          /* Otherwise (no user), show the “login” link */
          <Link to="/login" className="nav-link text-white">
            <i className="bi bi-person-circle me-1"></i>
          </Link>
         )}
          <Link to="/basket"><i className="bi bi-cart text-white"></i></Link>
      </div>

        {/* Burger menu icon (Mobile) */}
        <div
          ref={burgerRef}
          className="burger-menu d-flex d-md-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ fontSize: '1.8rem', cursor: 'pointer', color: 'white' }}
        >
          ☰
        </div>
      </div>

        {/* Mobile Dropdown Menu */}
        <div ref={menuRef} className={`mobile-menu ${menuOpen ? 'show-menu' : ''}`}>
        <Link to="/products">All products</Link>
        {user ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/basket">Basket</Link>
      </div>
    </nav>
  );
}

export default Navbar;
