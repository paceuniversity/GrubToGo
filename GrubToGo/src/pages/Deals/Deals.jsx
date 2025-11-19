import React, { useEffect, useState } from 'react';
import './Deals.css';
import { enrichDeals } from '../../assets/deals';
import { useCart } from '../../context/CartContext';

// Simple countdown hook
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

const Deals = () => {
  // In future this can come from Firestore or API
  const [dealItems, setDealItems] = useState(() => enrichDeals());
  const { addItem } = useCart();

  return (
    <div className="deals-page">
      <h1 className="deals-title">Limited-Time Deals</h1>
      <div className="deals-grid">
        {dealItems.map(d => {
          const { expired, text } = useCountdown(d.expiry);
          return (
            <div key={d.id} className={`deal-card ${expired ? 'deal-expired' : ''}`}>              
              {/* Discount percentage removed */}
              <img src={d.storeImage} alt={d.storeName} className="deal-image" />
              <div className="deal-body">
                <span className="deal-store">{d.storeName}</span>
                <h2 className="deal-title">{d.title}</h2>
                <div className="deal-pricing">
                  <span className="deal-original">${d.originalPrice.toFixed(2)}</span>
                  <span className="deal-discounted">${d.discountedPrice.toFixed(2)}</span>
                </div>
                <div className="deal-countdown">{text}</div>
                <button
                  className="deal-action-btn"
                  disabled={expired}
                  onClick={() =>
                    addItem({
                      id: d.id, // use deal id for cart uniqueness
                      title: d.title,
                      price: d.discountedPrice,
                      storeName: d.storeName,
                      image: d.storeImage,
                    })
                  }
                >
                  {expired ? 'Expired' : 'Add to Cart'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Deals;
