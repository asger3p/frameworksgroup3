import React, { useState } from 'react';
import '../styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer: React.FC = () => {
  // State to store the email input
  const [email, setEmail] = useState('');

  // State to store the success message
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setMessage(`Thanks for subscribing!`); // Set a thank-you message
    setEmail(''); // Clear the input field
  };

  return (
    <footer className="footer mt-5 py-4">
      <div className="container">
        <div className="row">
          {/* About section */}
          <div className="col-md-6 text-start">
            <h5>About Spice Planet</h5>
            <p className="footer-description">
              Spice Planet brings you the finest spices and flavors from around the world. 
              Join our community for cooking inspiration, exclusive recipes, and special offers.
            </p>
          </div>

          {/* Newsletter signup section */}
          <div className="col-md-6 text-end">
            <h5>Sign up for our newsletter</h5>
            <p className="footer-subtext">
              Get exclusive recipes, spice tips, and member-only discounts straight to your inbox.
            </p>

            {/* Newsletter form */}
            <form className="newsletter-form d-flex justify-content-end" onSubmit={handleSubmit}>
              {/* Email input field */}
              <input
                type="email"
                className="form-control me-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
                required
              />
              {/* Submit button */}
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>

            {/* Success message */}
            {message && <p className="text-success mt-2">{message}</p>}
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
