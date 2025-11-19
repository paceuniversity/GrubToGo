
import React from 'react';
import { assets } from '../assets/assets';
import { useCart } from '../context/CartContext';
import '../pages/Deals/Deals.css';

const curryItems = [
  { id: 1, name: 'Chicken Tikka Masala', price: 13.99, desc: 'Tender chicken in creamy tomato sauce.', img: assets.react_icon },
  { id: 2, name: 'Vegetable Biryani', price: 11.49, desc: 'Aromatic rice with mixed vegetables and spices.', img: assets.react_icon },
  { id: 3, name: 'Tandoori Roti', price: 2.99, desc: 'Freshly baked whole wheat bread.', img: assets.react_icon },
];

const CurryCornerMenu = () => {
  const { addItem } = useCart();
  return (
    <div className="deals-page">
      <h1 className="deals-title">Curry Corner Menu</h1>
      <div className="deals-grid">
        {curryItems.map(item => (
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
                onClick={() => addItem({ id: item.id, title: item.name, price: item.price, storeName: 'Curry Corner', image: item.img })}
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

export default CurryCornerMenu;
