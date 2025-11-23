import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { getUser } from '../../services/firestoreService';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ setIsLoggedIn, setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailLower = email.toLowerCase();

    if (!emailLower.endsWith('@pace.edu')) {
      setError('Only Pace University email addresses are allowed.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Fetch user data from Firestore
      const userData = await getUser(userCredential.user.uid);
      
      if (!userData) {
        setError('User profile not found. Please contact support.');
        return;
      }

      setIsLoggedIn(true);

      // Use role from Firestore
      const userRole = userData.role;

      if (userRole === 'caterer') {
        if (setUserRole) setUserRole('caterer');
        navigate('/staff');
      } else {
        if (setUserRole) setUserRole('student');
        navigate('/menu');
      }
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        default:
          setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '22rem' }}>
        <h2 className="text-center mb-3">Sign In</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Pace Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@pace.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don&apos;t have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
