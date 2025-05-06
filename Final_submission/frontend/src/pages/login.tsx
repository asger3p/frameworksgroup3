import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // React state for email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Toggle to show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Store error messages for invalid login
  const [error, setError] = useState('');

  // React Router hook to navigate to other pages
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Get registered credentials from localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Compare user input to stored values
    if (email === storedEmail && password === storedPassword) {
      // Mark user as logged in
      localStorage.setItem('isLoggedIn', 'true');

      // Redirect to homepage
      navigate('/');
    } else {
      // Show error if login fails
      setError('Invalid email or password.');
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: '80vh' }}
    >
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Welcome Back!</h2>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password input with toggle */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Error message (if any) */}
          {error && <p className="text-danger">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>
        </form>

        {/* Link to register */}
        <p className="text-center mt-3">
          Don’t have an account? <a href="/register" className="text-primary">Create one here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
