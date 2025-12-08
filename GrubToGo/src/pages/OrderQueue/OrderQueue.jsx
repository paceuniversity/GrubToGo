import React, { useState } from 'react';
import './OrderQueue.css';
import '../Deals/Deals.css';

const OrderQueue = ({ queuedOfferings, setQueuedOfferings }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleRemoveFromQueue = (itemId) => {
    setErrorMessage('');
    setSuccessMessage('');
    setQueuedOfferings(prev => prev.filter(item => item.itemId !== itemId));
  };

  const handleReleaseAll = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (queuedOfferings.length === 0) return;

    try {
      const { createOffering, getActiveOfferings } = await import('../../services/firestoreService');
      const { auth } = await import('../../firebase');
      
      // Get all currently active offerings
      const activeOfferings = await getActiveOfferings();
      
      // Check for duplicates and filter
      const itemsToRelease = [];
      const duplicates = [];
      
      for (const offering of queuedOfferings) {
        const isDuplicate = activeOfferings.some(
          active => active.itemName === offering.itemName && active.storeId === offering.storeId
        );
        
        if (isDuplicate) {
          duplicates.push(offering.itemName);
        } else {
          itemsToRelease.push(offering);
        }
      }

      if (itemsToRelease.length === 0) {
        setErrorMessage('All items in queue are already active. Nothing to release.');
        return;
      }

      // Create offerings for non-duplicate items
      const promises = itemsToRelease.map(offering => 
        createOffering({
          catererId: auth.currentUser.uid,
          storeId: offering.storeId,
          itemName: offering.itemName,
          discountPercent: offering.discountPercent,
          durationHours: offering.durationHours,
          durationMinutes: offering.durationMinutes,
          expiresAt: offering.expiresAt
        })
      );

      await Promise.all(promises);
      
      const message = duplicates.length > 0
        ? `${itemsToRelease.length} offering(s) released. ${duplicates.length} duplicate(s) skipped.`
        : `${itemsToRelease.length} offering(s) released successfully!`;
      
      setErrorMessage('');
      setSuccessMessage(message);
      setQueuedOfferings([]);
    } catch (error) {
      console.error('Error releasing offerings:', error);
      setErrorMessage('Failed to release offerings. Please try again.');
    }
  };

  return (
    <div className="order-queue-page">
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
                    {offering.discountPercent}% OFF
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
