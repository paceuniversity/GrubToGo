import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn, userRole }) => {
  const [menu, setMenu] = useState('home');
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
    navigate('/login');
  };

  const handleProfile = () => {
    setProfileOpen(false);
    // Navigate to profile page when implemented
    // navigate('/profile');
  };

  const isCaterer = userRole === 'caterer';

  return (
    <div className="navbar">
      {/* Logo */}
      <img src={assets.logo} alt="GrubToGo" className="logo" />

      {/* Center menu */}
      <ul className="navbar-menu">
        {isCaterer ? (
          <>
            {/* Caterer Home */}
            <li>
              <NavLink
                to="/staff"
                className={menu === 'home' ? 'active' : ''}
                onClick={() => setMenu('home')}
              >
                Home
              </NavLink>
            </li>

            {/* Caterer Order Details */}
            <li>
              <NavLink
                to="/staff/orders"
                className={menu === 'orders' ? 'active' : ''}
                onClick={() => setMenu('orders')}
              >
                Order Details
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/menu"
                className={menu === 'menu' ? 'active' : ''}
                onClick={() => setMenu('menu')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/deals"
                className={menu === 'deals' ? 'active' : ''}
                onClick={() => setMenu('deals')}
              >
                Deals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-orders"
                className={menu === 'my-orders' ? 'active' : ''}
                onClick={() => setMenu('my-orders')}
              >
                My Orders
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Right side button */}
      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="profile-container">
            <button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
              Profile
            </button>
            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-option" onClick={handleProfile}>Profile</div>
                <div className="profile-option signout-option" onClick={handleSignOut}>Sign Out</div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleSignIn}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
