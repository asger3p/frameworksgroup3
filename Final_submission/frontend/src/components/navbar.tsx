import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 
import { useAuth } from '../context/authContext'; 


function Navbar() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container d-flex justify-content-between align-items-center">
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
          <Link to="/checkout"><i className="bi bi-credit-card"></i></Link> {/* NEW */}
          <Link to="/basket"><i className="bi bi-cart"></i></Link>
      </div>

        {/* Burger menu icon */}
        <div className="burger-menu d-flex d-md-none"
          onClick={() => setMenuOpen(o => !o)}
          style={{ fontSize: '1.8rem', cursor: 'pointer', color: 'white' }}
        >
          ☰
        </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'show-menu' : ''}`}>
          <Link to="/products">All products</Link>
          <Link to="/login">Login/profile</Link>
          <Link to="/basket">Checkout</Link>
          <Link to="/basket">Basket</Link>
        </div>
    </nav>
  );
}

export default Navbar;
