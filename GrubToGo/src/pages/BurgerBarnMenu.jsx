
import React from 'react';
import { assets } from '../assets/assets';
import { useCart } from '../context/CartContext';
import '../pages/Deals/Deals.css';

const burgerItems = [
  { id: 1, name: 'Classic Cheeseburger', price: 9.99, desc: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and onion.', img: assets.react_icon },
  { id: 2, name: 'Loaded Fries', price: 5.99, desc: 'Crispy fries topped with cheese, bacon, and scallions.', img: assets.react_icon },
  { id: 3, name: 'Hand-Spun Shake', price: 4.49, desc: 'Creamy vanilla, chocolate, or strawberry shake.', img: assets.react_icon },
];

const BurgerBarnMenu = () => {
  const { addItem } = useCart();
  return (
    <div className="deals-page">
      <h1 className="deals-title">Burger Barn Menu</h1>
      <div className="deals-grid">
        {burgerItems.map(item => (
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
                onClick={() => addItem({ id: item.id, title: item.name, price: item.price, storeName: 'Burger Barn', image: item.img })}
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

export default BurgerBarnMenu;
