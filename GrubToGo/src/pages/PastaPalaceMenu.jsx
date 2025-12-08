
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useCart } from '../context/CartContext';
import { getActiveOfferings } from '../services/firestoreService';
import '../pages/Deals/Deals.css';

// DealCard component to properly use useCountdown hook
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
        <span className="deal-store">PASTA PALACE</span>
        <h2 className="deal-title">{item.name}</h2>
        <div className="deal-pricing">
          {hasDeal ? (
            <>
              <span className="deal-original student-view">${item.price.toFixed(2)}</span>
              <span className="deal-discounted">{discountedPrice.toFixed(2)}</span>
              <span className="deal-discount-percent">{deal.discountPercent}% OFF</span>
            </>
          ) : (
            <span className="deal-original" style={{ fontWeight: 700, fontSize: '1rem' }}>{item.price.toFixed(2)}</span>
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

// Example items for Pasta Palace with their respective images
const pastaItems = [
  { id: 1, name: 'Spaghetti Carbonara', price: 12.99, desc: 'Classic creamy pasta with pancetta and parmesan.', img: assets.spaghetti_carbonara },
  { id: 2, name: 'Fettuccine Alfredo', price: 11.99, desc: 'Rich Alfredo sauce over fettuccine noodles.', img: assets.fettuccine_alfredo },
  { id: 3, name: 'Lasagna', price: 13.99, desc: 'Layered pasta with beef, ricotta, and mozzarella.', img: assets.lasagna },
  { id: 4, name: 'Penne Arrabbiata', price: 10.99, desc: 'Spicy tomato sauce with garlic and chili.', img: assets.penne_arrabbiata },
];

const STORE_ID = 1; // Pasta Palace

const PastaPalaceMenu = () => {
  const { addItem } = useCart();
  const [activeDeals, setActiveDeals] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    loadActiveDeals();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(loadActiveDeals, 10000);
    return () => clearInterval(interval);
  }, []);
  
  const loadActiveDeals = async () => {
    try {
      const offerings = await getActiveOfferings();
      
      // Filter offerings for this store only and not expired
      const storeOfferings = offerings.filter(o => 
        o.storeId === STORE_ID && o.expiresAt.toMillis() > Date.now()
      );
      
      // Create a map of item names to deals
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
      setErrorMessage('Failed to load Pasta Palace deals. Please retry.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="deals-page store-menu-page">
        {errorMessage && (
          <div className="alert-box" role="alert">
            <strong>Error:</strong>
            <span>{errorMessage}</span>
          </div>
        )}
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #ff6b35', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: '1rem', color: '#666' }}>Loading menu...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="deals-page store-menu-page">
      {successMessage && (
        <div className="alert-box alert-box--success" role="status">
          <strong>Success:</strong>
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="alert-box" role="alert">
          <strong>Error:</strong>
          <span>{errorMessage}</span>
        </div>
      )}
      <Link to="/menu" className="back-to-stores-btn">← Back to Stores</Link>
      <h1 className="deals-title">Pasta Palace Menu</h1>
      <div className="deals-grid">
        {pastaItems.map(item => (
          <MenuItemCard 
            key={item.id}
            item={item}
            deal={activeDeals[item.name] || null}
            onAddToCart={(item, price) => {
              const deal = activeDeals[item.name];
              if (!deal || !deal.offeringId) {
                setErrorMessage('This deal is no longer available');
                setSuccessMessage('');
                return;
              }
              addItem({ 
                id: deal.offeringId, // Use offering ID from Firestore, not menu item ID
                title: item.name, 
                price: price, 
                storeName: 'Pasta Palace', 
                image: item.img 
              });
              setErrorMessage('');
              setSuccessMessage(`Added to cart successfully: ${item.name}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PastaPalaceMenu;
