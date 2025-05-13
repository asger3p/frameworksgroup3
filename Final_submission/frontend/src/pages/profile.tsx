import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/authContext';  // need the user data from Gabi's authContext


export default function Profile() {
    const navigate = useNavigate()
    // const { user, logout, deleteAccount } = useAuth();'  // need the user data and logout/delete methods from authContext
    
    //  WHEN CLICKING ON PROFILE IN MENU BAR:
    // If there’s no user (e.g. not logged in), send them to /login
    // if (!user) {
    //     navigate('/login')
    //     return null
    // }


    const handleDelete = async () => {
        if (!window.confirm('Really delete your account? This cannot be undone.')) {
        return
        }
        try {
        // await deleteAccount(user.customer_id)
        // deleteAccount in context should clear auth state & navigate
        } catch (err) {
        console.error(err)
        alert('Could not delete account, please try again later.')
        }
    }


    return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: '80vh' }}
    >
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">My Profile</h2>

        <div className="mb-3">
          <label className="form-label">First Name</label>
          {/* <input className="form-control" readOnly value={user.fname} /> */}
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          {/* <input className="form-control" readOnly value={user.lname} /> */}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          {/* <input className="form-control" readOnly value={user.email} /> */}
        </div>

        <div className="d-flex justify-content-between mt-4">
          {/* <button className="btn btn-secondary" onClick={() => logout()}> */}
            {/* Log out */}
          {/* </button> */}
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}