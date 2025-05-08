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
          <img src="/backend/public/images/logos/logo-white.png" alt="Spice Planet" />
          <span style={{ marginLeft: '10px' }}>Spice Planet</span>
        </Link>

        {/* Desktop Links */}
        <div className="icon-links">
          {userName && <span id="welcomeMessage">Welcome, {userName}!</span>}
          {!userName && <Link to="/login"><i className="bi bi-person-circle"></i></Link>}
          {userName && (
            <button id="logoutButton" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          )}
          <Link to="/cart"><i className="bi bi-cart"></i></Link>
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
