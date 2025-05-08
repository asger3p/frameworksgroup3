import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css'; 

function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in and retrieve name
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const fname = localStorage.getItem('fname');
    if (isLoggedIn === 'true' && fname) {
      setUserName(fname);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('fname');
    setUserName(null);
    navigate('/');
  };

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
          {userName && <span id="welcomeMessage">Welcome, {userName}!</span>}
          {!userName && <Link to="/login"><i className="bi bi-person-circle"></i></Link>}
          {userName && (
            <button id="logoutButton" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
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
          {!userName && <Link to="/login">Login</Link>}
          {userName && <button id="logoutButton" onClick={handleLogout}>Logout</button>}
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
