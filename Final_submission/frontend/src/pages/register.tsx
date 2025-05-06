import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem('fname', fname);
    localStorage.setItem('lname', lname);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fname" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
