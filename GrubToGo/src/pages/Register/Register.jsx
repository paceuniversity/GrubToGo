
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({ setIsLoggedIn, setUserRole }) => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailLower = email.toLowerCase();

    // Must end with @pace.edu
    if (!emailLower.endsWith('@pace.edu')) {
      setError('Only Pace University email addresses are allowed.');
      return;
    }

    // Caterer must have .caterer@pace.edu
    if (role === 'caterer' && !emailLower.includes('.caterer@pace.edu')) {
      setError('Caterer email must end with ".caterer@pace.edu".');
      return;
    }

    // Student should not use caterer format
    if (role === 'student' && emailLower.includes('.caterer@pace.edu')) {
      setError('Students cannot use ".caterer@pace.edu" email format.');
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoggedIn(true);

        if (role === 'student') {
          if (setUserRole) setUserRole('student');
          navigate('/student');  
        } else {
          if (setUserRole) setUserRole('caterer');
          navigate('/staff');    //  caterer dashboard
        }
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          setError('An account with this email already exists.');
        } else if (err.code === 'auth/weak-password') {
          setError('Password should be at least 6 characters.');
        } else {
          setError('Registration failed. Please try again.');
        }
      });
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '22rem' }}>
        <h2 className="text-center mb-3">Create Account</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Role */}
          <div className="mb-3">
            <label className="form-label">Are you a:</label>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className={`btn btn-sm ${role === 'student' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setRole('student')}
              >
                Student
              </button>

              <button
                type="button"
                className={`btn btn-sm ${role === 'caterer' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setRole('caterer')}
              >
                Caterer
              </button>
            </div>
          </div>

          {/* Pace Email */}
          <div className="mb-3">
            <label className="form-label">Pace Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder={
                role === 'caterer'
                  ? 'username.caterer@pace.edu'
                  : 'username@pace.edu'
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;









