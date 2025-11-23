
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

const wokItems = [
  { id: 1, name: 'Kung Pao Chicken', price: 10.99, desc: 'Spicy stir-fried chicken with peanuts and vegetables.', img: assets.kung_pao_chicken },
  { id: 2, name: 'Vegetable Lo Mein', price: 8.99, desc: 'Soft noodles tossed with fresh vegetables.', img: assets.vegetable_lo_mein },
  { id: 3, name: 'Sweet & Sour Pork', price: 11.49, desc: 'Crispy pork in a tangy sweet and sour sauce.', img: assets.sweet_sour_pork },
];

const SizzlingWokMenu = () => {
  const { addItem } = useCart();
  
  // Active deals for specific items (Kung Pao Chicken has a deal)
  const activeDeals = {
    'Kung Pao Chicken': {
      hasDiscount: true,
      discountPercent: 30,
      expiry: new Date(Date.now() + 90 * 60 * 1000).toISOString()
    }
  };
  
  return (
    <div className="deals-page">
      <h1 className="deals-title">Sizzling Wok Menu</h1>
      <div className="deals-grid">
        {wokItems.map(item => {
          const deal = activeDeals[item.name];
          const hasDeal = deal?.hasDiscount;
          const discountedPrice = hasDeal ? item.price * (1 - deal.discountPercent / 100) : item.price;
          const { expired, text } = hasDeal ? useCountdown(deal.expiry) : { expired: false, text: '' };
          
          return (
            <div key={item.id} className={`deal-card ${hasDeal && expired ? 'deal-expired' : ''}`}>
              <img src={item.img} alt={item.name} className="deal-image" />
              <div className="deal-body">
                <span className="deal-store">SIZZLING WOK</span>
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
                  onClick={() => hasDeal && !expired && addItem({ id: item.id, title: item.name, price: discountedPrice, storeName: 'Sizzling Wok', image: item.img })}
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

export default SizzlingWokMenu;
