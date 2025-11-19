import React from 'react';
import { assets } from '../assets/assets';

const wokItems = [
  { id: 1, name: 'Kung Pao Chicken', price: 10.99, desc: 'Spicy stir-fried chicken with peanuts and vegetables.', img: assets.react_icon },
  { id: 2, name: 'Vegetable Lo Mein', price: 8.99, desc: 'Soft noodles tossed with fresh vegetables.', img: assets.react_icon },
  { id: 3, name: 'Sweet & Sour Pork', price: 11.49, desc: 'Crispy pork in a tangy sweet and sour sauce.', img: assets.react_icon },
];

const SizzlingWokMenu = () => (
  <div className="store-menu-page">
    <h1 className="store-menu-title" style={{ textAlign: 'center', marginTop: '2rem' }}>Sizzling Wok</h1>
    <div className="menu-items-list" style={{ maxWidth: 500, margin: '2rem auto' }}>
      {wokItems.map(item => (
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

export default SizzlingWokMenu;
