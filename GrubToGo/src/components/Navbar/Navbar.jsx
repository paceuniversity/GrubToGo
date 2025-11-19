import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn, userRole }) => {
  const [menu, setMenu] = useState('home');
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate('/login');
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
          <button className="signout-btn" onClick={handleSignOut}>sign out</button>
        ) : (
          <button onClick={handleSignIn}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
