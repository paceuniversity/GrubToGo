import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = ({ isLoggedIn, setIsLoggedIn, userRole }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { clear } = useCart();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
    clear(); // Clear the cart
    sessionStorage.removeItem('grubtogo_cart'); // Clear cart from sessionStorage
    navigate('/login');
  };

  const handleProfile = () => {
    setProfileOpen(false);
    navigate('/profile');
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
                end
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Home
              </NavLink>
            </li>

            {/* Caterer Order Queue */}
            <li>
              <NavLink
                to="/staff/queue"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Order Queue
              </NavLink>
            </li>

            {/* Caterer Order Details */}
            <li>
              <NavLink
                to="/staff/orders"
                className={({ isActive }) => isActive ? 'active' : ''}
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
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/deals"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Deals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-orders"
                className={({ isActive }) => isActive ? 'active' : ''}
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
