import React from 'react';
import { assets } from '../assets/assets';

// Example items for Pasta Palace, all using the react logo image
const pastaItems = [
  { id: 1, name: 'Spaghetti Carbonara', price: 12.99, desc: 'Classic creamy pasta with pancetta and parmesan.', img: assets.react_icon },
  { id: 2, name: 'Fettuccine Alfredo', price: 11.99, desc: 'Rich Alfredo sauce over fettuccine noodles.', img: assets.react_icon },
  { id: 3, name: 'Lasagna', price: 13.99, desc: 'Layered pasta with beef, ricotta, and mozzarella.', img: assets.react_icon },
  { id: 4, name: 'Penne Arrabbiata', price: 10.99, desc: 'Spicy tomato sauce with garlic and chili.', img: assets.react_icon },
];

const PastaPalaceMenu = () => (
  <div className="store-menu-page">
    <h1 className="store-menu-title" style={{ textAlign: 'center', marginTop: '2rem' }}>Pasta Palace</h1>
    <div className="menu-items-list" style={{ maxWidth: 500, margin: '2rem auto' }}>
      {pastaItems.map(item => (
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

export default PastaPalaceMenu;
