
import React, { useEffect, useState, useMemo } from 'react';
import { assets } from '../assets/assets';
import { useCart } from '../context/CartContext';
import '../pages/Deals/Deals.css';

function useCountdown(expiryIso) {
  const [remaining, setRemaining] = useState(() => new Date(expiryIso) - Date.now());
  useEffect(() => {
    const id = setInterval(() => setRemaining(new Date(expiryIso) - Date.now()), 1000);
    return () => clearInterval(id);
  }, [expiryIso]);
  if (remaining <= 0) return { expired: true, text: 'Expired' };
  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const text = hours > 0
    ? `${hours}h ${minutes}m ${seconds}s left`
    : `${minutes}m ${seconds}s left`;
  return { expired: false, text };
}

const burgerItems = [
  { id: 1, name: 'Classic Cheeseburger', price: 9.99, desc: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and onion.', img: assets.classic_cheeseburger },
  { id: 2, name: 'Loaded Fries', price: 5.99, desc: 'Crispy fries topped with cheese, bacon, and scallions.', img: assets.loaded_fries },
  { id: 3, name: 'Hand-Spun Shake', price: 4.49, desc: 'Creamy vanilla, chocolate, or strawberry shake.', img: assets.hand_spun_shake },
];

const BurgerBarnMenu = () => {
  const { addItem } = useCart();
  
  // Active deals for specific items (Classic Cheeseburger has a deal)
  const activeDeals = {
    'Classic Cheeseburger': {
      hasDiscount: true,
      discountPercent: 20,
      expiry: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()
    }
  };
  
  return (
    <div className="deals-page">
      <h1 className="deals-title">Burger Barn Menu</h1>
      <div className="deals-grid">
        {burgerItems.map(item => {
          const deal = activeDeals[item.name];
          const hasDeal = deal?.hasDiscount;
          const discountedPrice = hasDeal ? item.price * (1 - deal.discountPercent / 100) : item.price;
          const { expired, text } = hasDeal ? useCountdown(deal.expiry) : { expired: false, text: '' };
          
          return (
            <div key={item.id} className={`deal-card ${hasDeal && expired ? 'deal-expired' : ''}`}>
              <img src={item.img} alt={item.name} className="deal-image" />
              <div className="deal-body">
                <span className="deal-store">BURGER BARN</span>
                <h2 className="deal-title">{item.name}</h2>
                <div className="deal-pricing">
                  {hasDeal ? (
                    <>
                      <span className="deal-original student-view">${item.price.toFixed(2)}</span>
                      <span className="deal-discounted">${discountedPrice.toFixed(2)}</span>
                      <span className="deal-discount-percent">-{deal.discountPercent}% OFF!</span>
                    </>
                  ) : (
                    <span className="deal-original" style={{ fontWeight: 700, fontSize: '1rem' }}>${item.price.toFixed(2)}</span>
                  )}
                </div>
                {hasDeal && <div className="deal-countdown">{text}</div>}
                <button
                  className="deal-action-btn"
                  disabled={!hasDeal || expired}
                  style={!hasDeal || expired ? { background: '#adb5bd', cursor: 'not-allowed' } : {}}
                  onClick={() => hasDeal && !expired && addItem({ id: item.id, title: item.name, price: discountedPrice, storeName: 'Burger Barn', image: item.img })}
                >
                  {!hasDeal ? 'Not Available' : expired ? 'Expired' : 'Add to Cart'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BurgerBarnMenu;
