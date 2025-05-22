import {useEffect, useState } from 'react'  // React hooks for lifecycle & state
import { useNavigate } from 'react-router-dom' // navigation & redirect in React Router
import { useAuth } from '../context/authContext' // AuthContext for user session

export default function Profile() {
    const navigate = useNavigate()
    const { user, logout} = useAuth();  // get current user object & logout function
    
    // if user has logged out (or never logged in), send them to /login
    if (!user) {
      return <div className="text-center mt-5">Loading your profile...</div>;
    }    

      // Local component state to hold the profile fields fetched from the backend
    const [profile, setProfile] = useState({ name: '', mail: '' }) 
    
    useEffect(() => {   // On mount (or when user ID changes), fetch the full profile
      fetch(`http://localhost:3000/customers/${user.customer_id}`) // Fetch the full customer record by ID
        .then(r=> {
          if (!r.ok) throw new Error() // handle HTTP errors
            return r.json() // parse JSON
        })
        .then(data=> setProfile({ name: data.name, mail: data.mail})) // update form fields
        .catch(() =>alert('Could not load profile')) // show alert on any failure
    }, [user]) // re-run if the user ID ever changes
    
     // Log out: clear context, send user back home
    const doLogout = () => { 
      logout()
      navigate('/', { state: { flash: 'You are now logged out' }}) // logout and send a one‑time flash message to show success on HomePage
   }

    // Delete account: confirm, call DELETE, then clear context + redirect
    const doDelete = async () => {
      if (!confirm('Really delete your account? This cannot be undone.')) return 
      const r = await fetch(
        `http://localhost:3000/customers/${user.customer_id}`,   // call DELETE on the user’s endpoint to remove their record
        { method: 'DELETE' }
      )
      if(!r.ok) {
        alert('Could not delete account')// notify if deletion fails
        return
      }
      logout()
      navigate('/', { state: { flash: 'Your account is deleted' }})   // clear auth context and redirect home with a deletion confirmation flash

    }


    return (
    <div className="container mt-5" style={{ maxWidth: 400 }}> {/* container with max width for form */}
      <h2 className="mb-4 text-center">My Profile</h2>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input readOnly className="form-control" value={profile.name} /> {/* display fetched name */}
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input readOnly className="form-control" value={profile.mail} /> {/* display fetched email */}
      </div>
      <div className="d-flex justify-content-between"> {/* action buttons row */}
        <button className="btn btn-secondary" onClick={doLogout}>
          Log out
        </button>
        <button className="btn btn-danger" onClick={doDelete}>
          Delete account
        </button>
      </div>
    </div>
  )
}