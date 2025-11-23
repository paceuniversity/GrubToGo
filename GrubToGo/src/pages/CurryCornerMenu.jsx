
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

const curryItems = [
  { id: 1, name: 'Chicken Tikka Masala', price: 13.99, desc: 'Tender chicken in creamy tomato sauce.', img: assets.chicken_tikka_masala },
  { id: 2, name: 'Vegetable Biryani', price: 11.49, desc: 'Aromatic rice with mixed vegetables and spices.', img: assets.vegetable_biryani },
  { id: 3, name: 'Tandoori Roti', price: 2.99, desc: 'Freshly baked whole wheat bread.', img: assets.tandoori_roti },
];

const CurryCornerMenu = () => {
  const { addItem } = useCart();
  
  // Active deals for specific items (Chicken Tikka Masala has a deal)
  const activeDeals = {
    'Chicken Tikka Masala': {
      hasDiscount: true,
      discountPercent: 35,
      expiry: new Date(Date.now() + 45 * 60 * 1000).toISOString()
    }
  };
  
  return (
    <div className="deals-page">
      <h1 className="deals-title">Curry Corner Menu</h1>
      <div className="deals-grid">
        {curryItems.map(item => {
          const deal = activeDeals[item.name];
          const hasDeal = deal?.hasDiscount;
          const discountedPrice = hasDeal ? item.price * (1 - deal.discountPercent / 100) : item.price;
          const { expired, text } = hasDeal ? useCountdown(deal.expiry) : { expired: false, text: '' };
          
          return (
            <div key={item.id} className={`deal-card ${hasDeal && expired ? 'deal-expired' : ''}`}>
              <img src={item.img} alt={item.name} className="deal-image" />
              <div className="deal-body">
                <span className="deal-store">CURRY CORNER</span>
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
                  onClick={() => hasDeal && !expired && addItem({ id: item.id, title: item.name, price: discountedPrice, storeName: 'Curry Corner', image: item.img })}
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

export default CurryCornerMenu;
