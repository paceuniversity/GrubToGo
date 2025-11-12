import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { NavLink, Link } from 'react-router-dom'
const Navbar = ({setShowLogin}) => {

  const[menu,setMenu] = useState("home");
  return (
    <div className='navbar'>
      <Link to="/">
        <img src={assets.logo} alt="Grub To Go" className="logo" />
      </Link>

    

      <ul className="navbar-menu">
        <li>
          <NavLink to="/" onClick={()=>setMenu("home")} className={({isActive})=> (isActive||menu==="home")?"active":""}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/menu" onClick={()=>setMenu("menu")} className={({isActive})=> (isActive||menu==="menu")?"active":""}>Menu</NavLink>
        </li>
        <li>
          <a onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""} href="#contact">Contact Us</a>
        </li>
      </ul>

      <div className="navbar-right">
        {/* search icon not defined in assets yet; leaving out to avoid broken image */}
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </div>
  )
}

export default Navbar
