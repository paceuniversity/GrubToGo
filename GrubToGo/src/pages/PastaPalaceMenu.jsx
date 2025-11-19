
import React from 'react';
import { assets } from '../assets/assets';
import { useCart } from '../context/CartContext';
import '../pages/Deals/Deals.css';

// Example items for Pasta Palace, all using the react logo image
const pastaItems = [
  { id: 1, name: 'Spaghetti Carbonara', price: 12.99, desc: 'Classic creamy pasta with pancetta and parmesan.', img: assets.react_icon },
  { id: 2, name: 'Fettuccine Alfredo', price: 11.99, desc: 'Rich Alfredo sauce over fettuccine noodles.', img: assets.react_icon },
  { id: 3, name: 'Lasagna', price: 13.99, desc: 'Layered pasta with beef, ricotta, and mozzarella.', img: assets.react_icon },
  { id: 4, name: 'Penne Arrabbiata', price: 10.99, desc: 'Spicy tomato sauce with garlic and chili.', img: assets.react_icon },
];



const PastaPalaceMenu = () => {
  const { addItem } = useCart();
  return (
    <div className="deals-page">
      <h1 className="deals-title">Pasta Palace Menu</h1>
      <div className="deals-grid">
        {pastaItems.map(item => (
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
                onClick={() => addItem({ id: item.id, title: item.name, price: item.price, storeName: 'Pasta Palace', image: item.img })}
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

export default PastaPalaceMenu;
