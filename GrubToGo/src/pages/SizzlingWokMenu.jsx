
import React from 'react';
import { assets } from '../assets/assets';
import { useCart } from '../context/CartContext';
import '../pages/Deals/Deals.css';

const wokItems = [
  { id: 1, name: 'Kung Pao Chicken', price: 10.99, desc: 'Spicy stir-fried chicken with peanuts and vegetables.', img: assets.react_icon },
  { id: 2, name: 'Vegetable Lo Mein', price: 8.99, desc: 'Soft noodles tossed with fresh vegetables.', img: assets.react_icon },
  { id: 3, name: 'Sweet & Sour Pork', price: 11.49, desc: 'Crispy pork in a tangy sweet and sour sauce.', img: assets.react_icon },
];

const SizzlingWokMenu = () => {
  const { addItem } = useCart();
  return (
    <div className="deals-page">
      <h1 className="deals-title">Sizzling Wok Menu</h1>
      <div className="deals-grid">
        {wokItems.map(item => (
          <div key={item.id} className="deal-card">
            <img src={item.img} alt={item.name} className="deal-image" />
            <div className="deal-body">
              <h2 className="deal-title">{item.name}</h2>
              <div className="deal-pricing">
                <span className="deal-discounted" style={{color:'#222',fontWeight:600}}>${item.price.toFixed(2)}</span>
              </div>
              <span className="deal-desc" style={{ color: '#555', fontSize: '0.95rem' }}>{item.desc}</span>
              <button
                className="deal-action-btn"
                onClick={() => addItem({ id: item.id, title: item.name, price: item.price, storeName: 'Sizzling Wok', image: item.img })}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizzlingWokMenu;
