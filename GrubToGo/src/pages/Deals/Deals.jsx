// Deals Page:
// Loads active offerings, enriches them with store info and item images,
// and allows students to browse deals by store category.
import React, { useEffect, useState } from 'react';
import './Deals.css';
import { getActiveOfferings } from '../../services/firestoreService';
import { stores } from '../../assets/stores';
import { assets } from '../../assets/assets';
import { useCart } from '../../context/CartContext';

// DealCard component:
// Renders a single deal with item name, store, prices, discount,
// and a live countdown timer for how much time is left.
const DealCard = ({ deal, onAddToCart }) => {
  // Use countdown to know if expired AND to show the remaining time text.
  const { expired, text } = useCountdown(deal.expiry);

  return (
    <div className={`deal-card ${expired ? 'deal-expired' : ''}`}>
      <img src={deal.img} alt={deal.name} className="deal-image" />
      <div className="deal-body">
        <span className="deal-store">{deal.store.toUpperCase()}</span>
        <h2 className="deal-title">{deal.name}</h2>

        <div className="deal-pricing">
          {/* Pricing display: shows original price, discounted price, and the discount percentage. */}
          <span className="deal-original student-view">
            ${deal.originalPrice.toFixed(2)}
          </span>
          <span className="deal-discounted">
            ${deal.price.toFixed(2)}
          </span>
          <span className="deal-discount-percent">
            {deal.discount}
          </span>
        </div>

        {/* Countdown label showing how much time is left until the deal expires. */}
        <div className="deal-countdown">
          {text}
        </div>

        <button
          className="deal-action-btn"
          disabled={expired}
          onClick={() => onAddToCart(deal)}
        >
          {expired ? 'Expired' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// Map of item names to images
const itemImages = {
  'Spaghetti Carbonara': assets.spaghetti_carbonara,
  'Fettuccine Alfredo': assets.fettuccine_alfredo,
  'Lasagna': assets.lasagna,
  'Penne Arrabbiata': assets.penne_arrabbiata,
  'Classic Cheeseburger': assets.classic_cheeseburger,
  'Loaded Fries': assets.loaded_fries,
  'Hand-Spun Shake': assets.hand_spun_shake,
  'Kung Pao Chicken': assets.kung_pao_chicken,
  'Vegetable Lo Mein': assets.vegetable_lo_mein,
  'Sweet & Sour Pork': assets.sweet_sour_pork,
  'Chicken Tikka Masala': assets.chicken_tikka_masala,
  'Vegetable Biryani': assets.vegetable_biryani,
  'Tandoori Roti': assets.tandoori_roti,
};

// Hardcoded menu prices
const menuPrices = {
  'Spaghetti Carbonara': 12.99,
  'Fettuccine Alfredo': 11.99,
  'Lasagna': 13.99,
  'Penne Arrabbiata': 10.99,
  'Classic Cheeseburger': 9.99,
  'Loaded Fries': 5.99,
  'Hand-Spun Shake': 4.49,
  'Kung Pao Chicken': 10.99,
  'Vegetable Lo Mein': 8.99,
  'Sweet & Sour Pork': 11.49,
  'Chicken Tikka Masala': 13.99,
  'Vegetable Biryani': 11.49,
  'Tandoori Roti': 2.99,
};

// useCountdown Hook:
// Calculates how much time is left before a deal expires.
// Updates every second and returns whether the deal is expired
// and a readable time label, e.g. "2h 3m 10s left" or "4m 20s left".
function useCountdown(expiryTimestamp) {
  const [remaining, setRemaining] = useState(
    () => expiryTimestamp.toMillis() - Date.now()
  );

  useEffect(() => {
    // Recalculate remaining time every second to keep the countdown updated
    const id = setInterval(
      () => setRemaining(expiryTimestamp.toMillis() - Date.now()),
      1000
    );
    return () => clearInterval(id);
  }, [expiryTimestamp]);

  if (remaining <= 0) return { expired: true, text: 'Expired' };

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const text =
    hours > 0
      ? `${hours}h ${minutes}m ${seconds}s left`
      : `${minutes}m ${seconds}s left`;

  return { expired: false, text };
}

// FILTERS config:
// Defines the available deal filters (e.g., ending soonest) and their matching logic.
const FILTERS = [
  { label: 'Time Remaining: Ending Soonest', value: 'soonest', fn: () => true },
];

const Deals = () => {
  const [dealItems, setDealItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder] = useState('soonest');
  const { addItem } = useCart();
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Initial fetch of active offerings and setup auto-refresh.
    loadOfferings();

    // Auto-refresh every 10 seconds to remove expired deals
    const interval = setInterval(() => {
      loadOfferings();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadOfferings = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      console.log('Fetching active offerings...');
      const offerings = await getActiveOfferings();
      console.log('Received offerings:', offerings);
      console.log(
        'Store IDs in offerings:',
        offerings.map(o => ({ itemName: o.itemName, storeId: o.storeId }))
      );

      if (!offerings || offerings.length === 0) {
        console.log('No offerings found');
        setDealItems([]);
        return;
      }

      // Group offerings by store
      const offeringsByStore = {};
      offerings.forEach(offering => {
        if (!offeringsByStore[offering.storeId]) {
          offeringsByStore[offering.storeId] = [];
        }
        offeringsByStore[offering.storeId].push(offering);
      });
      console.log(
        'Offerings grouped by store:',
        Object.keys(offeringsByStore).map(
          id => `Store ${id}: ${offeringsByStore[id].length} items`
        )
      );

      // Select one offering per store (the one expiring soonest)
      const selectedOfferings = [];
      Object.values(offeringsByStore).forEach(storeOfferings => {
        // Sort by expiry time (soonest first)
        storeOfferings.sort(
          (a, b) => a.expiresAt.toMillis() - b.expiresAt.toMillis()
        );
        // Take the first one (expiring soonest)
        selectedOfferings.push(storeOfferings[0]);
      });

      // Enrich offerings with store name, item image, formatted pricing, and discount label.
      const enriched = selectedOfferings.map(offering => {
        const store = stores.find(s => s.id === offering.storeId);
        const originalPrice = menuPrices[offering.itemName] || 0;
        const discountedPrice =
          originalPrice * (1 - offering.discountPercent / 100);

        console.log('Enriching offering:', offering.itemName, {
          storeId: offering.storeId,
          store: store?.name,
          originalPrice,
          discountedPrice,
          expiresAt: offering.expiresAt,
        });

        return {
          id: offering.id,
          name: offering.itemName,
          store: store?.name || `Store ${offering.storeId}`,
          storeId: offering.storeId,
          originalPrice,
          price: discountedPrice,
          discount: `${offering.discountPercent}% OFF`,
          expiry: offering.expiresAt,
          img: itemImages[offering.itemName] || assets.logo,
        };
      });

      console.log('Enriched deals (one per store):', enriched);
      setDealItems(enriched);
    } catch (error) {
      // Error handling: log the issue and notify the user if offerings fail to load.
      console.error('Error loading offerings:', error);
      setErrorMessage('Failed to load deals. Please retry in a moment.');
    } finally {
      setLoading(false);
    }
  };

  // Add or remove filter
  const toggleFilter = value => {
    setAppliedFilters(prev =>
      prev.includes(value)
        ? prev.filter(f => f !== value)
        : [...prev, value]
    );
  };
  const removeFilter = value =>
    setAppliedFilters(prev => prev.filter(f => f !== value));

  // Filter out expired deals
  const activeDeals = dealItems.filter(
    d => d.expiry.toMillis() > Date.now()
  );

  const filteredDeals = appliedFilters.length
    ? activeDeals.filter(d =>
        appliedFilters.every(
          fv => FILTERS.find(f => f.value === fv).fn(d)
        )
      )
    : activeDeals;

  // Sort deals by time remaining
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    const aTime = a.expiry.toMillis() - Date.now();
    const bTime = b.expiry.toMillis() - Date.now();
    return aTime - bTime;
  });

  if (loading) {
    return (
      <div className="deals-page deals-list-page">
        {errorMessage && (
          <div className="alert-box" role="alert">
            <strong>Error:</strong>
            <span>{errorMessage}</span>
          </div>
        )}
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div
            style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #ff6b35',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Loading deals...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="deals-page deals-list-page">
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
      <h1 className="deals-title">Limited-Time Deals</h1>

      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="filter-deals"
          style={{ fontWeight: 500, marginRight: 8 }}
        >
          Filters:
        </label>
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <button
            id="filter-deals"
            style={{
              padding: '4px 14px',
              borderRadius: 6,
              border: '1px solid #ccc',
              background: '#f5f5f5',
              color: '#444',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            onClick={() => setDropdownOpen(o => !o)}
          >
            {dropdownOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '110%',
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                padding: 12,
                zIndex: 10,
                minWidth: 180,
              }}
            >
              {FILTERS.map(f => (
                <div
                  key={f.value}
                  style={{
                    marginBottom: 6,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: appliedFilters.includes(f.value)
                      ? '#aaa'
                      : '#333',
                    fontWeight: appliedFilters.includes(f.value)
                      ? 500
                      : 600,
                  }}
                  onClick={() =>
                    !appliedFilters.includes(f.value) &&
                    toggleFilter(f.value)
                  }
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
        <div
          style={{
            marginBottom: 18,
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          {appliedFilters.map(fv => {
            const label = FILTERS.find(f => f.value === fv)?.label;
            return (
              <span
                key={fv}
                style={{
                  background: '#eee',
                  color: '#333',
                  borderRadius: 16,
                  padding: '4px 12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: 14,
                }}
              >
                {label}
                <span
                  style={{
                    marginLeft: 8,
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
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
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
              }}
            >
              No Active Deals
            </h2>
            <p>Check back later for limited-time offers!</p>
          </div>
        ) : (
          sortedDeals.map(d => (
            <DealCard
              key={d.id}
              deal={d}
              onAddToCart={deal =>
                addItem({
                  id: deal.id,
                  title: deal.name,
                  price: deal.price,
                  storeName: deal.store,
                  image: deal.img,
                })
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Deals;

