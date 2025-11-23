import React from 'react';
import './OrderQueue.css';

const OrderQueue = ({ queuedOfferings, setQueuedOfferings }) => {
  const handleRemoveFromQueue = (itemId) => {
    setQueuedOfferings(prev => prev.filter(item => item.itemId !== itemId));
  };

  const handleReleaseAll = () => {
    if (queuedOfferings.length === 0) return;
    
    if (window.confirm(`Release ${queuedOfferings.length} offering(s) to students?`)) {
      // TODO: Save all offerings to Firestore
      console.log('Releasing offerings:', queuedOfferings);
      alert(`${queuedOfferings.length} offering(s) released successfully!`);
      setQueuedOfferings([]);
    }
  };

  return (
    <div className="order-queue-page">
      <div className="order-queue-header">
        <h1>Order Queue ({queuedOfferings.length})</h1>
        <button 
          className="release-all-btn"
          onClick={handleReleaseAll}
          disabled={queuedOfferings.length === 0}
        >
          Release All Offerings
        </button>
      </div>

      {queuedOfferings.length === 0 ? (
        <div className="queue-empty">
          <p>No offerings in queue. Add items from the dashboard to queue them for release.</p>
        </div>
      ) : (
        <div className="queue-grid">
          {queuedOfferings.map((offering) => (
            <div key={offering.itemId} className="queue-item-card">
              <div className="queue-item-header">
                <div className="queue-item-info">
                  <h3>{offering.itemName}</h3>
                  <div className="queue-item-store">{offering.storeName}</div>
                </div>
                <button 
                  className="remove-queue-btn"
                  onClick={() => handleRemoveFromQueue(offering.itemId)}
                  title="Remove from queue"
                >
                  ✕
                </button>
              </div>

              <div className="queue-item-details">
                <div className="queue-detail-row">
                  <span className="queue-detail-label">Original Price:</span>
                  <span className="queue-detail-value original">${offering.originalPrice.toFixed(2)}</span>
                </div>
                
                <div className="queue-detail-row">
                  <span className="queue-detail-label">Discounted Price:</span>
                  <span className="queue-detail-value discounted">${offering.discountedPrice}</span>
                </div>

                <div className="queue-detail-row">
                  <span className="queue-detail-label">Discount:</span>
                  <span className="queue-discount-badge">
                    {offering.discountType === 'percentage' 
                      ? `${offering.discountValue}% OFF` 
                      : `$${offering.discountValue} OFF`}
                  </span>
                </div>

                <div className="queue-detail-row">
                  <span className="queue-detail-label">Duration:</span>
                  <span className="queue-timer-badge">{offering.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderQueue;
