import React from 'react';
import { assets } from '../assets/assets';

const bowlItems = [
  { id: 1, name: 'Build-Your-Own Salad', price: 8.99, desc: 'Choose your greens, toppings, and dressing.', img: assets.react_icon },
  { id: 2, name: 'Grain Bowl', price: 9.49, desc: 'Brown rice, quinoa, veggies, and protein.', img: assets.react_icon },
  { id: 3, name: 'Smoothie', price: 5.99, desc: 'Fresh fruit blended with yogurt or juice.', img: assets.react_icon },
];

const GreenBowlMenu = () => (
  <div className="store-menu-page">
    <h1 className="store-menu-title" style={{ textAlign: 'center', marginTop: '2rem' }}>Green Bowl</h1>
    <div className="menu-items-list" style={{ maxWidth: 500, margin: '2rem auto' }}>
      {bowlItems.map(item => (
        <div key={item.id} className="menu-item-card" style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <img src={item.img} alt={item.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, marginRight: 16 }} />
          <div>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
            <p style={{ margin: '8px 0' }}>{item.desc}</p>
            <strong>${item.price.toFixed(2)}</strong>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GreenBowlMenu;
