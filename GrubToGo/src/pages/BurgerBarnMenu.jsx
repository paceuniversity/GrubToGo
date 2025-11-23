
import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useCart } from '../context/CartContext';
import { getActiveOfferings } from '../services/firestoreService';
import '../pages/Deals/Deals.css';

const MenuItemCard = ({ item, deal, onAddToCart }) => {
  const useCountdown = (expiryTimestamp) => {
    const [remaining, setRemaining] = useState(() => expiryTimestamp.toMillis() - Date.now());
    useEffect(() => {
      const id = setInterval(() => setRemaining(expiryTimestamp.toMillis() - Date.now()), 1000);
      return () => clearInterval(id);
    }, [expiryTimestamp]);
    if (remaining <= 0) return { expired: true, text: 'Expired' };
    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const text = hours > 0
      ? `${hours}h ${minutes}m ${seconds}s left`
      : `${minutes}m ${seconds}s left`;
    return { expired: false, text };
  };

  const hasDeal = deal !== null;
  const discountedPrice = hasDeal ? item.price * (1 - deal.discountPercent / 100) : item.price;
  const { expired, text } = hasDeal ? useCountdown(deal.expiresAt) : { expired: false, text: '' };
  
  return (
    <div className={`deal-card ${hasDeal && expired ? 'deal-expired' : ''}`}>
      <img src={item.img} alt={item.name} className="deal-image" />
      <div className="deal-body">
        <span className="deal-store">BURGER BARN</span>
        <h2 className="deal-title">{item.name}</h2>
        <div className="deal-pricing">
          {hasDeal ? (
            <>
              <span className="deal-original student-view">${item.price.toFixed(2)}</span>
              <span className="deal-discounted">${discountedPrice.toFixed(2)}</span>
              <span className="deal-discount-percent">{deal.discountPercent}% OFF</span>
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
          onClick={() => hasDeal && !expired && onAddToCart(item, discountedPrice)}
        >
          {!hasDeal ? 'Not Available' : expired ? 'Expired' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

const burgerItems = [
  { id: 1, name: 'Classic Cheeseburger', price: 9.99, desc: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and onion.', img: assets.classic_cheeseburger },
  { id: 2, name: 'Loaded Fries', price: 5.99, desc: 'Crispy fries topped with cheese, bacon, and scallions.', img: assets.loaded_fries },
  { id: 3, name: 'Hand-Spun Shake', price: 4.49, desc: 'Creamy vanilla, chocolate, or strawberry shake.', img: assets.hand_spun_shake },
];

const STORE_ID = 3;

const BurgerBarnMenu = () => {
  const { addItem } = useCart();
  const [activeDeals, setActiveDeals] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadActiveDeals();
    const interval = setInterval(loadActiveDeals, 10000);
    return () => clearInterval(interval);
  }, []);
  
  const loadActiveDeals = async () => {
    try {
      const offerings = await getActiveOfferings();
      const storeOfferings = offerings.filter(o => 
        o.storeId === STORE_ID && o.expiresAt.toMillis() > Date.now()
      );
      const dealsMap = {};
      storeOfferings.forEach(offering => {
        dealsMap[offering.itemName] = {
          discountPercent: offering.discountPercent,
          expiresAt: offering.expiresAt,
          offeringId: offering.id
        };
      });
      setActiveDeals(dealsMap);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="deals-page">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #ff6b35', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: '1rem', color: '#666' }}>Loading menu...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="deals-page">
      <h1 className="deals-title">Burger Barn Menu</h1>
      <div className="deals-grid">
        {burgerItems.map(item => (
          <MenuItemCard 
            key={item.id}
            item={item}
            deal={activeDeals[item.name] || null}
            onAddToCart={(item, price) => addItem({ 
              id: item.id, 
              title: item.name, 
              price: price, 
              storeName: 'Burger Barn', 
              image: item.img 
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default BurgerBarnMenu;
