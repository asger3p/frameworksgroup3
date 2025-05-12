import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 
import { useAuth } from '../context/authContext'; 


function Navbar() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };


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
        <div className="icon-links d-flex align-items-center gap-3">
        <div className="dropdown">
          <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
            <i className="bi bi-grid me-1"></i> Products
          </button>
        <ul className="dropdown-menu dropdown-menu-end">
        <li><Link className="dropdown-item" to="/products">All Products</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><strong className="dropdown-header">By Type</strong></li>
        <li><Link className="dropdown-item" to="/products/type/whole">Whole</Link></li>
        <li><Link className="dropdown-item" to="/products/type/ground">Ground</Link></li>
        <li><Link className="dropdown-item" to="/products/type/blends">Blends</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><strong className="dropdown-header">By Cuisine</strong></li>
        <li><Link className="dropdown-item" to="/products/cuisine/indian">Indian</Link></li>
        <li><Link className="dropdown-item" to="/products/cuisine/mediterranean">Mediterranean</Link></li>
        <li><Link className="dropdown-item" to="/products/cuisine/asian">Asian</Link></li>
        <li><Link className="dropdown-item" to="/products/cuisine/latin-american">Latin American</Link></li>
        </ul>
        </div>

        
        <div className="icon-links d-flex align-items-center gap-3">
        {user ? (
          <>
          <span className="text-white">Welcome, {user.fname}!</span>
          <button onClick={logout} className="btn btn-sm btn-outline-light">
            <i className="bi bi-box-arrow-right me-1"></i> 
          </button>
          </>
        ) : (
    <Link to="/login" className="text-white">
      <i className="bi bi-person-circle me-1"></i>
    </Link>
  )}
          <Link to="/checkout"><i className="bi bi-credit-card"></i></Link> {/* NEW */}
          <Link to="/cart"><i className="bi bi-cart"></i></Link>
        </div>
      </div>

        {/* Burger menu icon */}
        <div className="burger-menu" onClick={toggleMobileMenu}>
          ☰
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'show-menu' : ''}`}>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
