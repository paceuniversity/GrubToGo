import React from 'react'
import './Menu.css'
import { stores } from '../../assets/stores'

const Menu = () => {
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
                <span className="store-rating">★ {s.rating.toFixed(1)}</span>
              </div>
              <p className="store-meta">{s.cuisine} • {s.priceRange} • {s.etaMins} min</p>
              <p className="store-desc">{s.description}</p>
              <a className="store-action" href="#">View menu →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
