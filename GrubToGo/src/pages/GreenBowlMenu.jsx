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
        <div key={item.id} className="menu-item-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: '1px solid #e2e2e2', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.06)', padding: 0, marginBottom: 16, maxWidth: 540, minHeight: 120, overflow: 'hidden', background: '#fff' }}>
          <img src={item.img} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, margin: '0 20px 0 0', background: '#fafafa' }} />
          <div className="menu-item-body" style={{ padding: '0.75rem 0.9rem 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
            <span className="menu-item-title" style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.2 }}>{item.name}</span>
            <span className="menu-item-desc" style={{ color: '#555', fontSize: '0.95rem' }}>{item.desc}</span>
            <span className="menu-item-price" style={{ color: '#222', fontWeight: 600, fontSize: '1rem' }}>${item.price.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GreenBowlMenu;
