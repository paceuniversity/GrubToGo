import React, { useEffect, useState } from 'react';
import './Deals.css';
import { enrichDeals } from '../../assets/deals';
import { useCart } from '../../context/CartContext';

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


const FILTERS = [
  { label: 'Time Remaining: Ending Soonest', value: 'soonest', fn: () => true },
];

const Deals = () => {
  const [dealItems] = useState(() => enrichDeals());
  const [sortOrder] = useState('soonest');
  const { addItem } = useCart();
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Add or remove filter
  const toggleFilter = (value) => {
    setAppliedFilters((prev) => prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]);
  };
  const removeFilter = (value) => setAppliedFilters((prev) => prev.filter(f => f !== value));

  const filteredDeals = appliedFilters.length
    ? dealItems.filter(d => appliedFilters.every(fv => FILTERS.find(f => f.value === fv).fn(d)))
    : dealItems;

  // Sort deals by time remaining
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    const aTime = new Date(a.expiry) - Date.now();
    const bTime = new Date(b.expiry) - Date.now();
    return aTime - bTime;
  });

  return (
    <div className="deals-page">
      <h1 className="deals-title">Limited-Time Deals</h1>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="filter-deals" style={{ fontWeight: 500, marginRight: 8 }}>Filters:</label>
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <button
            id="filter-deals"
            style={{ padding: '4px 14px', borderRadius: 6, border: '1px solid #ccc', background: '#f5f5f5', color: '#444', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => setDropdownOpen((o) => !o)}
          >
            {dropdownOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          {dropdownOpen && (
            <div style={{ position: 'absolute', left: 0, top: '110%', background: '#fff', border: '1px solid #eee', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 12, zIndex: 10, minWidth: 180 }}>
              {FILTERS.map(f => (
                <div
                  key={f.value}
                  style={{ marginBottom: 6, display: 'flex', alignItems: 'center', cursor: 'pointer', color: appliedFilters.includes(f.value) ? '#aaa' : '#333', fontWeight: appliedFilters.includes(f.value) ? 500 : 600 }}
                  onClick={() => !appliedFilters.includes(f.value) && toggleFilter(f.value)}
                  aria-disabled={appliedFilters.includes(f.value)}
                >
                  {f.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Applied filters section */}
      {appliedFilters.length > 0 && (
        <div style={{ marginBottom: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {appliedFilters.map(fv => {
            const label = FILTERS.find(f => f.value === fv)?.label;
            return (
              <span key={fv} style={{ background: '#eee', color: '#333', borderRadius: 16, padding: '4px 12px', display: 'inline-flex', alignItems: 'center', fontSize: 14 }}>
                {label}
                <span
                  style={{ marginLeft: 8, cursor: 'pointer', fontWeight: 700 }}
                  onClick={() => removeFilter(fv)}
                  aria-label={`Remove ${label}`}
                >
                  ×
                </span>
              </span>
            );
          })}
        </div>
      )}
      <div className="deals-grid">
        {sortedDeals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Active Deals</h2>
            <p>Check back later for limited-time offers!</p>
          </div>
        ) : (
          sortedDeals.map(d => {
            const { expired, text } = useCountdown(d.expiry);
            return (
              <div key={d.id} className={`deal-card ${expired ? 'deal-expired' : ''}`}>              
                <img src={d.storeImage} alt={d.storeName} className="deal-image" />
                <div className="deal-body">
                  <span className="deal-store">{d.storeName}</span>
                  <h2 className="deal-title">{d.title}</h2>
                  <div className="deal-pricing">
                    <span className="deal-original student-view">${d.originalPrice.toFixed(2)}</span>
                    <span className="deal-discounted">${d.discountedPrice.toFixed(2)}</span>
                    {d.discountPercent && (
                      <span className="deal-discount-percent">-{d.discountPercent}% OFF!</span>
                    )}
                  </div>
                  <div className="deal-countdown">{text}</div>
                  <button
                    className="deal-action-btn"
                    disabled={expired}
                    onClick={() =>
                      addItem({
                        id: d.id,
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
          })
        )}
      </div>
    </div>
  );
};

export default Deals;
