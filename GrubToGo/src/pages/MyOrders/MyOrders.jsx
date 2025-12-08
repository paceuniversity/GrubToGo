import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { getActiveOrders, getPastOrders } from '../../services/firestoreService';
import { stores } from '../../assets/stores';
import './MyOrders.css';


const MyOrders = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); 
  const [totalSaved, setTotalSaved] = useState(0);

  
  useEffect(() => {
    loadOrders();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      loadOrders();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    try {
      if (!auth.currentUser) return;
      
      const studentId = auth.currentUser.uid;
      const [active, past] = await Promise.all([
        getActiveOrders(studentId),
        getPastOrders(studentId)
      ]);
      
      console.log('Active orders:', active);
      console.log('Past orders:', past);
      
      setActiveOrders(active);
      setPastOrders(past);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStoreName = (storeId) => {
    const store = stores.find(s => s.id === storeId);
    return store ? store.name : `Store ${storeId}`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'placed': return 'status-placed';
      case 'preparing': return 'status-preparing';
      case 'ready': return 'status-ready';
      case 'picked_up': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="my-orders-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  const ordersToDisplay = activeTab === 'active' ? activeOrders : pastOrders;

  return (
    <div className="my-orders-page">
      <div className="my-orders-header">
        <h1>My Orders</h1>
      </div>

      {/* Tabs */}
      <div className="order-tabs">
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Orders ({activeOrders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Orders ({pastOrders.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="orders-container">
        {ordersToDisplay.length === 0 ? (
          <div className="no-orders">
            <p>No {activeTab} orders found.</p>
          </div>
        ) : (
          <div className="orders-list">
            {ordersToDisplay.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-id">Order #{order.id?.slice(-8) || 'N/A'}</div>
                  <span className={`status-badge ${getStatusBadgeClass(order.orderStatus)}`}>
                    {order.orderStatus?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                  </span>
                </div>

                <div className="order-card-body">
                  <div className="order-info-row">
                    <span className="info-label">Store:</span>
                    <span className="info-value">{getStoreName(order.storeId)}</span>
                  </div>

                  <div className="order-info-row">
                    <span className="info-label">Item:</span>
                    <span className="info-value">{order.itemName}</span>
                  </div>

                  <div className="order-info-row">
                    <span className="info-label">Amount:</span>
                    <span className="info-value amount">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                  </div>

                  <div className="order-info-row">
                    <span className="info-label">Ordered:</span>
                    <span className="info-value">{formatDate(order.orderedAt)}</span>
                  </div>

                  {order.isPickedUp && order.pickedUpAt && (
                    <div className="order-info-row">
                      <span className="info-label">Picked Up:</span>
                      <span className="info-value">{formatDate(order.pickedUpAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
