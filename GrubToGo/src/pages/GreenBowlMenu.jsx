
import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useCart } from '../context/CartContext';
import '../pages/Deals/Deals.css';

const bowlItems = [
  { id: 1, name: 'Build-Your-Own Salad', price: 8.99, desc: 'Choose your greens, toppings, and dressing.', img: assets.react_icon },
  { id: 2, name: 'Grain Bowl', price: 9.49, desc: 'Brown rice, quinoa, veggies, and protein.', img: assets.react_icon },
  { id: 3, name: 'Smoothie', price: 5.99, desc: 'Fresh fruit blended with yogurt or juice.', img: assets.react_icon },
];

const GreenBowlMenu = () => {
  const { addItem } = useCart();
  return (
    <div className="deals-page">
      <Link to="/menu" className="back-to-stores-btn">← Back to Stores</Link>
      <h1 className="deals-title">Green Bowl Menu</h1>
      <div className="deals-grid">
        {bowlItems.map(item => (
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
                onClick={() => addItem({ id: item.id, title: item.name, price: item.price, storeName: 'Green Bowl', image: item.img })}
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

export default GreenBowlMenu;
