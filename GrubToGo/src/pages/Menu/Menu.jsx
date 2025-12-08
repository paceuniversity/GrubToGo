import React from 'react'
import './Menu.css'
import { stores } from '../../assets/stores'
import { Link } from 'react-router-dom';

const Menu = () => {
  // Map store names to their menu page routes
  const menuRoutes = {
    'Pasta Palace': '/menu/pasta-palace',
    'Sizzling Wok': '/menu/sizzling-wok',
    'Burger Barn': '/menu/burger-barn',
    'Curry Corner': '/menu/curry-corner',
  };

  return (
    <div className="menu-page">
      <h1 className="menu-title">Browse Stores</h1>
      <div className="stores-grid">
        {stores.map((s) => (
          <div key={s.id} className="store-card">
            <img src={s.image} alt={s.name} className="store-image" />
            <div className="store-body">
              <div className="store-header">
                <h3 className="store-name">{s.name}</h3>
              </div>
              <p className="store-meta">{s.cuisine} • {s.etaMins} min</p>
              <p className="store-desc">{s.description}</p>
              <Link className="store-action" to={menuRoutes[s.name] || '#'}>View menu →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
