import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { stores } from '../../assets/stores';
import { assets } from '../../assets/assets';
import './CatererDashboard.css';
import '../Deals/Deals.css';

// All menu items from different stores
const allMenuItems = {
  'Pasta Palace': [
    { id: 'pp1', name: 'Spaghetti Carbonara', price: 12.99, img: assets.spaghetti_carbonara },
    { id: 'pp2', name: 'Fettuccine Alfredo', price: 11.99, img: assets.fettuccine_alfredo },
    { id: 'pp3', name: 'Lasagna', price: 13.99, img: assets.lasagna },
    { id: 'pp4', name: 'Penne Arrabbiata', price: 10.99, img: assets.penne_arrabbiata },
  ],
  'Burger Barn': [
    { id: 'bb1', name: 'Classic Cheeseburger', price: 9.99, img: assets.classic_cheeseburger },
    { id: 'bb2', name: 'Loaded Fries', price: 5.99, img: assets.loaded_fries },
    { id: 'bb3', name: 'Hand-Spun Shake', price: 4.49, img: assets.hand_spun_shake },
  ],
  'Sizzling Wok': [
    { id: 'sw1', name: 'Kung Pao Chicken', price: 10.99, img: assets.kung_pao_chicken },
    { id: 'sw2', name: 'Vegetable Lo Mein', price: 8.99, img: assets.vegetable_lo_mein },
    { id: 'sw3', name: 'Sweet & Sour Pork', price: 11.49, img: assets.sweet_sour_pork },
  ],
  'Curry Corner': [
    { id: 'cc1', name: 'Chicken Tikka Masala', price: 13.99, img: assets.chicken_tikka_masala },
    { id: 'cc2', name: 'Vegetable Biryani', price: 11.49, img: assets.vegetable_biryani },
    { id: 'cc3', name: 'Tandoori Roti', price: 2.99, img: assets.tandoori_roti },
  ],
};

const CatererDashboard = ({ queuedOfferings, setQueuedOfferings }) => {
  const location = useLocation();
  const [selectedStore, setSelectedStore] = useState(null);
  const [offeringData, setOfferingData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const activeTab = location.pathname.includes('orders') ? 'orders' : 'home';

  // Check if an item is already queued
  const isItemQueued = (itemId) => {
    return queuedOfferings.some(offering => offering.itemId === itemId);
  };

  const handleStoreClick = (storeName) => {
    setErrorMessage('');
    setSelectedStore(storeName);
  };

  const handleBack = () => {
    setSelectedStore(null);
  };

  const handleDiscountChange = (itemId, field, value) => {
    setOfferingData(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  const handleAddToQueue = (item, storeName) => {
    // Check if already in queue
    if (isItemQueued(item.id)) {
      setErrorMessage(`${item.name} is already in the queue.`);
      return;
    }

    const data = offeringData[item.id] || {};
    const discountPercent = parseFloat(data.discountPercent) || 0;
    const hours = parseInt(data.hours) || 0;
    const minutes = parseInt(data.minutes) || 0;

    if (discountPercent <= 0 || discountPercent > 100 || (hours === 0 && minutes === 0)) {
      setErrorMessage('Enter a valid discount (1-100%) and duration.');
      return;
    }

    // Calculate discounted price and expiration time
    const discountedPrice = item.price * (1 - discountPercent / 100);
    const expiresAt = new Date(Date.now() + (hours * 60 + minutes) * 60000);

    // Find the store ID
    const store = stores.find(s => s.name === storeName);
    const storeId = store ? store.id : 1;

    const offering = {
      itemId: item.id,
      storeId,
      storeName,
      itemName: item.name,
      originalPrice: item.price,
      discountPercent,
      discountedPrice: discountedPrice.toFixed(2),
      duration: `${hours}h ${minutes}m`,
      durationHours: hours,
      durationMinutes: minutes,
      expiresAt,
      image: item.img
    };

    // Add to queue
    setQueuedOfferings(prev => [...prev, offering]);
    
    setErrorMessage('');
    
    // Clear the form for this item
    setOfferingData(prev => ({
      ...prev,
      [item.id]: {}
    }));
  };

  if (activeTab === 'home') {
    // If a store is selected, show its menu items
    if (selectedStore) {
      const items = allMenuItems[selectedStore] || [];
      return (
        <div className="caterer-dashboard">
          <div className="deals-page">
                {errorMessage && (
                  <div className="alert-box" role="alert">
                    <strong>Error:</strong>
                    <span>{errorMessage}</span>
                  </div>
                )}
                <button onClick={handleBack} className="back-to-stores-btn">← Back to Stores</button>
                <h1 className="deals-title">{selectedStore} - Create Offerings</h1>
            <div className="deals-grid">
              {items.map(item => {
                const data = offeringData[item.id] || {};

                return (
                  <div key={item.id} className="deal-card">
                    <img src={item.img} alt={item.name} className="deal-image" />
                    <div className="deal-body">
                      <span className="deal-store">{selectedStore.toUpperCase()}</span>
                      <h2 className="deal-title">{item.name}</h2>
                      <div className="deal-pricing">
                        <span style={{ fontSize: '0.75rem', color: '#666', marginRight: '0.3rem' }}>Original Price:</span>
                        <span className="deal-original">${item.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Discount input */}
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="number"
                          placeholder="Discount %"
                          value={data.discountPercent || ''}
                          onChange={(e) => handleDiscountChange(item.id, 'discountPercent', e.target.value)}
                          style={{ padding: '0.25rem', fontSize: '0.8rem', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }}
                          min="1"
                          max="100"
                          step="1"
                        />
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>% OFF</span>
                      </div>

                      {/* Timer input */}
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem' }}>
                        <input
                          type="number"
                          placeholder="Hours"
                          value={data.hours || ''}
                          onChange={(e) => handleDiscountChange(item.id, 'hours', e.target.value)}
                          style={{ padding: '0.25rem', fontSize: '0.8rem', width: '60px', borderRadius: '4px', border: '1px solid #ccc' }}
                          min="0"
                        />
                        <span>h</span>
                        <input
                          type="number"
                          placeholder="Min"
                          value={data.minutes || ''}
                          onChange={(e) => handleDiscountChange(item.id, 'minutes', e.target.value)}
                          style={{ padding: '0.25rem', fontSize: '0.8rem', width: '60px', borderRadius: '4px', border: '1px solid #ccc' }}
                          min="0"
                          max="59"
                        />
                        <span>m</span>
                      </div>

                      <button
                        className="deal-action-btn"
                        style={{ 
                          marginTop: '0.5rem',
                          background: isItemQueued(item.id) ? '#cccccc' : '',
                          cursor: isItemQueued(item.id) ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => handleAddToQueue(item, selectedStore)}
                        disabled={isItemQueued(item.id)}
                      >
                        {isItemQueued(item.id) ? 'In Queue' : 'Add to Queue'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // Show stores grid
    return (
      <div className="caterer-dashboard">
        <div className="menu-page">
          <h1 className="menu-title">Select Store to Create Offerings</h1>
          <div className="stores-grid">
            {stores.map((s) => (
              <div key={s.id} className="store-card" onClick={() => handleStoreClick(s.name)} style={{ cursor: 'pointer' }}>
                <img src={s.image} alt={s.name} className="store-image" />
                <div className="store-body">
                  <div className="store-header">
                    <h3 className="store-name">{s.name}</h3>
                  </div>
                  <p className="store-meta">
                    {s.cuisine} • {s.etaMins} min
                  </p>
                  <p className="store-desc">{s.description}</p>
                  <div className="store-action">
                    Create Offerings →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="caterer-dashboard">
    </div>
  );
};

export default CatererDashboard;












