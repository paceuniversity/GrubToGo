import React from 'react';
import { useLocation } from 'react-router-dom';
import { stores } from '../../assets/stores';
import './CatererDashboard.css'; 

const CatererDashboard = () => {
  const location = useLocation();


  const activeTab = location.pathname.includes('orders')
    ? 'orders'
    : 'home';

  if (activeTab === 'home') {
    return (
      <div className="caterer-dashboard">
        <div className="menu-page">
          <h1 className="menu-title">Browse Stores</h1>
          <div className="stores-grid">
            {stores.map((s) => (
              <div key={s.id} className="store-card">
                <img src={s.image} alt={s.name} className="store-image" />
                <div className="store-body">
                  <div className="store-header">
                    <h3 className="store-name">{s.name}</h3>
                  </div>
                  <p className="store-meta">
                    {s.cuisine} • {s.priceRange} • {s.etaMins} min
                  </p>
                  <p className="store-desc">{s.description}</p>
                  <a className="store-action" href="#">
                    View menu →
                  </a>
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












