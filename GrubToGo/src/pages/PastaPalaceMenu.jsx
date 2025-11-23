
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

// Example items for Pasta Palace with their respective images
const pastaItems = [
  { id: 1, name: 'Spaghetti Carbonara', price: 12.99, desc: 'Classic creamy pasta with pancetta and parmesan.', img: assets.spaghetti_carbonara },
  { id: 2, name: 'Fettuccine Alfredo', price: 11.99, desc: 'Rich Alfredo sauce over fettuccine noodles.', img: assets.fettuccine_alfredo },
  { id: 3, name: 'Lasagna', price: 13.99, desc: 'Layered pasta with beef, ricotta, and mozzarella.', img: assets.lasagna },
  { id: 4, name: 'Penne Arrabbiata', price: 10.99, desc: 'Spicy tomato sauce with garlic and chili.', img: assets.penne_arrabbiata },
];



const PastaPalaceMenu = () => {
  const { addItem } = useCart();
  
  // Active deals for specific items (Lasagna has a deal)
  const activeDeals = {
    'Lasagna': {
      hasDiscount: true,
      discountPercent: 25,
      expiry: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    }
  };
  
  return (
    <div className="deals-page">
      <h1 className="deals-title">Pasta Palace Menu</h1>
      <div className="deals-grid">
        {pastaItems.map(item => {
          const deal = activeDeals[item.name];
          const hasDeal = deal?.hasDiscount;
          const discountedPrice = hasDeal ? item.price * (1 - deal.discountPercent / 100) : item.price;
          const { expired, text } = hasDeal ? useCountdown(deal.expiry) : { expired: false, text: '' };
          
          return (
            <div key={item.id} className={`deal-card ${hasDeal && expired ? 'deal-expired' : ''}`}>
              <img src={item.img} alt={item.name} className="deal-image" />
              <div className="deal-body">
                <span className="deal-store">PASTA PALACE</span>
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
                  onClick={() => hasDeal && !expired && addItem({ id: item.id, title: item.name, price: discountedPrice, storeName: 'Pasta Palace', image: item.img })}
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

export default PastaPalaceMenu;
