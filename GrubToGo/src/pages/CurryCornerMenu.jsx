import React from 'react';
import { assets } from '../assets/assets';

const curryItems = [
  { id: 1, name: 'Chicken Tikka Masala', price: 13.99, desc: 'Tender chicken in creamy tomato sauce.', img: assets.react_icon },
  { id: 2, name: 'Vegetable Biryani', price: 11.49, desc: 'Aromatic rice with mixed vegetables and spices.', img: assets.react_icon },
  { id: 3, name: 'Tandoori Roti', price: 2.99, desc: 'Freshly baked whole wheat bread.', img: assets.react_icon },
];

const CurryCornerMenu = () => (
  <div className="store-menu-page">
    <h1 className="store-menu-title" style={{ textAlign: 'center', marginTop: '2rem' }}>Curry Corner</h1>
    <div className="menu-items-list" style={{ maxWidth: 500, margin: '2rem auto' }}>
      {curryItems.map(item => (
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

export default CurryCornerMenu;
