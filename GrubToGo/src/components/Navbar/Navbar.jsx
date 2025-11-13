import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState('home');
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Grub To Go" className="logo" />
      </Link>

      {/* Menu links */}
      <ul className="navbar-menu">
        <li>
          <NavLink
            to="/"
            className={menu === 'home' ? 'active' : ''}
            onClick={() => setMenu('home')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/menu"
            className={menu === 'menu' ? 'active' : ''}
            onClick={() => setMenu('menu')}
          >
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={menu === 'cart' ? 'active' : ''}
            onClick={() => setMenu('cart')}
          >
            Cart
          </NavLink>
        </li>
      </ul>

      <div className="navbar-right">
        {/* Cart icon and red dot removed */}

        {isLoggedIn ? (
          <button onClick={handleSignOut}>sign out</button>
        ) : (
          <button onClick={handleSignIn}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;



// import React, { useState } from 'react';
// import './Navbar.css';
// import { assets } from '../../assets/assets';
// import { NavLink, Link, useNavigate } from 'react-router-dom';

// const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
//   const [menu, setMenu] = useState('home');
//   const navigate = useNavigate();

//   const handleSignIn = () => {
//     navigate('/login');
//   };

//   const handleSignOut = () => {
//     setIsLoggedIn(false);
//     navigate('/login');
//   };

//   return (
//     <div className="navbar">
//       {/* Logo */}
//       <Link to="/">
//         <img src={assets.logo} alt="Grub To Go" className="logo" />
//       </Link>

//       {/* Menu links */}
//       <ul className="navbar-menu">
//         <li>
//           <NavLink
//             to="/"
//             className={menu === 'home' ? 'active' : ''}
//             onClick={() => setMenu('home')}
//           >
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/menu"
//             className={menu === 'menu' ? 'active' : ''}
//             onClick={() => setMenu('menu')}
//           >
//             Menu
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/cart"
//             className={menu === 'cart' ? 'active' : ''}
//             onClick={() => setMenu('cart')}
//           >
//             Cart
//           </NavLink>
//         </li>
//       </ul>

//       <div className="navbar-right">
//         <div className="navbar-search-icon">
//           <img src={assets.basket_icon} alt="" />
//           <div className="dot"></div>
//         </div>

//         {isLoggedIn ? (
//           <button onClick={handleSignOut}>sign out</button>
//         ) : (
//           <button onClick={handleSignIn}>sign in</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;






