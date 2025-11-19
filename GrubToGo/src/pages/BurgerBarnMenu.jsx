import React from 'react';
import { assets } from '../assets/assets';

const burgerItems = [
  { id: 1, name: 'Classic Cheeseburger', price: 9.99, desc: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and onion.', img: assets.react_icon },
  { id: 2, name: 'Loaded Fries', price: 5.99, desc: 'Crispy fries topped with cheese, bacon, and scallions.', img: assets.react_icon },
  { id: 3, name: 'Hand-Spun Shake', price: 4.49, desc: 'Creamy vanilla, chocolate, or strawberry shake.', img: assets.react_icon },
];

const BurgerBarnMenu = () => (
  <div className="store-menu-page">
    <h1 className="store-menu-title" style={{ textAlign: 'center', marginTop: '2rem' }}>Burger Barn</h1>
    <div className="menu-items-list" style={{ maxWidth: 500, margin: '2rem auto' }}>
      {burgerItems.map(item => (
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

export default BurgerBarnMenu;
