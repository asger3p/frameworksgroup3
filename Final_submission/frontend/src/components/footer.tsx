import React from 'react';
import '../styles.css'; // Ensure this includes your footer styles
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-5 py-4">
      <div className="container">
        <div className="row">
          {/* About Spice Planet */}
          <div className="col-md-6 text-start">
            <h5>About Spice Planet</h5>
            <p className="footer-description">
              Spice Planet brings you the finest spices and flavors from around the world. 
              Join our community for cooking inspiration, exclusive recipes, and special offers.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="col-md-6 text-end">
            <h5>Sign up for our newsletter</h5>
            <p className="footer-subtext">
              Get exclusive recipes, spice tips, and member-only discounts straight to your inbox.
            </p>
            <form className="newsletter-form d-flex justify-content-end" onSubmit={(e) => e.preventDefault()}>
              <input type="email" className="form-control me-2" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="small mb-0">&copy; 2025 Spice Planet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
