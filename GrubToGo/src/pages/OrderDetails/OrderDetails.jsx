import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { getAllOrders, getCatererOfferings } from '../../services/firestoreService';
import './OrderDetails.css';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('offerings'); // 'offerings', 'orders'
  const [orderFilter, setOrderFilter] = useState('all'); // 'all', 'active', 'completed'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const catererId = auth.currentUser.uid;
      
      // Load offerings created by this caterer
      const catererOfferings = await getCatererOfferings(catererId);
      setOfferings(catererOfferings);
      
      // Load all orders
      const allOrders = await getAllOrders();
      const sortedOrders = allOrders.sort((a, b) => 
        b.orderedAt?.toMillis() - a.orderedAt?.toMillis()
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredOrders = () => {
    if (orderFilter === 'active') {
      return orders.filter(order => !order.isPickedUp);
    } else if (orderFilter === 'completed') {
      return orders.filter(order => order.isPickedUp);
    }
    return orders;
  };

  const getActiveOfferings = () => {
    return offerings.filter(o => o.status === 'active' && o.expiresAt?.toMillis() > Date.now());
  };

  const getSoldOfferings = () => {
    return offerings.filter(o => o.status === 'sold');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'placed': return 'status-placed';
      case 'preparing': return 'status-preparing';
      case 'ready': return 'status-ready';
      case 'picked_up': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      case 'active': return 'status-preparing';
      case 'sold': return 'status-completed';
      default: return '';
    }
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

  const filteredOrders = getFilteredOrders();
  const activeCount = orders.filter(o => !o.isPickedUp).length;
  const completedCount = orders.filter(o => o.isPickedUp).length;
  const activeOfferings = getActiveOfferings();
  const soldOfferings = getSoldOfferings();

  if (loading) {
    return (
      <div className="order-details-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="order-details-header">
        <h1>Order Management</h1>
      </div>

      {/* Main Tabs */}
      <div className="order-filters">
        <button 
          className={`filter-btn ${activeTab === 'offerings' ? 'active' : ''}`}
          onClick={() => setActiveTab('offerings')}
        >
          My Offerings
        </button>
        <button 
          className={`filter-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {/* Sub-filters for Orders tab */}
      {activeTab === 'orders' && (
        <div className="order-filters" style={{ marginTop: '0.5rem', borderTop: 'none' }}>
          <button 
            className={`filter-btn ${orderFilter === 'all' ? 'active' : ''}`}
            onClick={() => setOrderFilter('all')}
            style={{ fontSize: '0.9rem' }}
          >
            All ({orders.length})
          </button>
          <button 
            className={`filter-btn ${orderFilter === 'active' ? 'active' : ''}`}
            onClick={() => setOrderFilter('active')}
            style={{ fontSize: '0.9rem' }}
          >
            Active ({activeCount})
          </button>
          <button 
            className={`filter-btn ${orderFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setOrderFilter('completed')}
            style={{ fontSize: '0.9rem' }}
          >
            Completed ({completedCount})
          </button>
        </div>
      )}

      {/* Content */}
      {activeTab === 'offerings' ? (
        // Offerings Tab
        offerings.length === 0 ? (
          <div className="no-orders">
            <p>No offerings created yet. Create offerings from the dashboard.</p>
          </div>
        ) : (
          <div className="orders-list">
            {offerings.filter(offering => {
              // Show if sold OR if active and not expired
              return offering.status === 'sold' || 
                     (offering.status === 'active' && offering.expiresAt?.toMillis() > Date.now());
            }).map((offering) => (
              <div key={offering.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-id">{offering.itemName}</div>
                  <span className={`status-badge ${getStatusBadgeClass(offering.status)}`}>
                    {offering.status.toUpperCase()}
                  </span>
                </div>

                <div className="order-card-body">
                  <div className="order-info-row">
                    <span className="info-label">Store ID:</span>
                    <span className="info-value">{offering.storeId}</span>
                  </div>

                  <div className="order-info-row">
                    <span className="info-label">Discount:</span>
                    <span className="info-value">{offering.discountPercent}% OFF</span>
                  </div>

                  <div className="order-info-row">
                    <span className="info-label">Created:</span>
                    <span className="info-value">{formatDate(offering.createdAt)}</span>
                  </div>

                  <div className="order-info-row">
                    <span className="info-label">Expires:</span>
                    <span className="info-value">{formatDate(offering.expiresAt)}</span>
                  </div>

                  {offering.status === 'sold' && (
                    <>
                      <div className="order-info-row">
                        <span className="info-label">Sold At:</span>
                        <span className="info-value">{formatDate(offering.purchasedAt)}</span>
                      </div>
                      <div className="order-info-row">
                        <span className="info-label">Order ID:</span>
                        <span className="info-value">{offering.orderId?.slice(-8)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        // Orders Tab
        filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No {orderFilter !== 'all' ? orderFilter : ''} orders found.</p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-card-header">
                <div className="order-id">Order #{order.orderId.slice(-8)}</div>
                <span className={`status-badge ${getStatusBadgeClass(order.orderStatus)}`}>
                  {order.orderStatus.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="order-card-body">
                <div className="order-info-row">
                  <span className="info-label">Student:</span>
                  <span className="info-value">{order.studentEmail}</span>
                </div>

                <div className="order-info-row">
                  <span className="info-label">Item:</span>
                  <span className="info-value">{order.itemName}</span>
                </div>

                <div className="order-info-row">
                  <span className="info-label">Store ID:</span>
                  <span className="info-value">{order.storeId}</span>
                </div>

                <div className="order-info-row">
                  <span className="info-label">Amount:</span>
                  <span className="info-value amount">${order.totalAmount.toFixed(2)}</span>
                </div>

                <div className="order-info-row">
                  <span className="info-label">Ordered:</span>
                  <span className="info-value">{formatDate(order.orderedAt)}</span>
                </div>

                {order.isPickedUp && (
                  <div className="order-info-row">
                    <span className="info-label">Picked Up:</span>
                    <span className="info-value">{formatDate(order.pickedUpAt)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        )
      )}
    </div>
  );
};

export default OrderDetails;
