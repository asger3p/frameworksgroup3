import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Profile() {
  const navigate = useNavigate();
  const { customer, logout } = useAuth();
  const [profile, setProfile] = useState({ name: '', mail: '' });

  // Redirect to login if not logged in
  useEffect(() => {
    if (!customer) {
      navigate('/login');
    }
  }, [customer, navigate]);

  // Fetch customer profile
  useEffect(() => {
    if (!customer) return;

    fetch(`http://localhost:3000/customers/${customer.customer_id}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setProfile({ name: data.name, mail: data.mail }))
      .catch(() => alert('Could not load profile'));
  }, [customer]);

  const doLogout = () => {
    logout();
    navigate('/', { state: { flash: 'You are now logged out' } });
  };

  const doDelete = async () => {
    if (!confirm('Really delete your account? This cannot be undone.')) return;

    if (!customer) {
      alert('No customer found.');
      return;
    }

    const r = await fetch(
      `http://localhost:3000/customers/${customer.customer_id}`,
      { method: 'DELETE' }
    );

    if (!r.ok) {
      alert('Could not delete account');
      return;
    }

    logout();
    navigate('/', { state: { flash: 'Your account is deleted' } });
  };

  if (!customer) {
    return <div className="text-center mt-5">Loading your profile...</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">My Profile</h2>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input readOnly className="form-control" value={profile.name} />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input readOnly className="form-control" value={profile.mail} />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={doLogout}>
          Log out
        </button>
        <button className="btn btn-danger" onClick={doDelete}>
          Delete account
        </button>
      </div>
    </div>
  );
}
