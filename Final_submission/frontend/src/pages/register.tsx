import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/authContext'; // AuthContext to set user after signup
import { Customer } from '../types/customer';


export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // so we can make sure the customer is logged in automatically when creating account
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(''); // state to track email error
  const [password, setPassword] = useState('');
  
  // Email validation function
  const isEmailValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());


  // overall form validity checker (used to disable submit button)
   const isFormValid = () =>
    fname.trim().length > 0 &&
    lname.trim().length > 0 &&
    password.length > 0 &&
    isEmailValid(email);

  const handleSubmit = async (e: React.FormEvent) => { // async marks a function as “returns a promise”
    e.preventDefault();

    // prevent form submission if email is inval
    if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Build the payload (the JSON data object) you’ll send to the server: contains the new customer name, mail, and password
    const payload = {
      name:  `${fname} ${lname}`,
      mail:  email,
      password,
    }

    try{
      // send the POST request
      const resp = await fetch('http://localhost:3000/customers', { // await waits for the promise to resolve
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })

      const data = await resp.json();  // Parse the JSON - read back whatever JSON the server sent

      if (!resp.ok) {
        alert('Registration failed');   // if it was an error show a message
        return;
      }

      // AUTO LOGIN:
      // otherwise it succeeded — data.customer is the new user record (data.customer is what the backend sent back)
      const created = data.customer as Customer;
      const firstName = created.fname; // 

      
      await login(created); // Pass full Customer object (what your context expects)


    // navigate to “/” (home page) with a flash message
    navigate('/', { state: { flash: 'Welcome, ' + firstName + '!' } });
    }
    catch (err: any) {
      // if something unexpected happens show that error
    console.error(err);
    alert('Registration failed: ' + err.message);
  }
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
            {/* apply is-invalid class when email is wrong */}
            <input
              type="email"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              id="email"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);

                //live validation as customer types
                if (!isEmailValid(value)) {
                  setEmailError('Please enter a valid email address');
                } else {
                  setEmailError('');
                }
              }}
              required
            />

            {/* show error message */}
            {emailError && <div className="invalid-feedback">{emailError}</div>}
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
          <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid()}>
            Register
          </button>

        </form>
      </div>
    </div>
  );
}
