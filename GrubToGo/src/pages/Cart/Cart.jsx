import React from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { items, removeItem, increment, decrement, totals } = useCart();

  if (!items.length) {
    return (
      <div className="cart-page">
        <h1>My Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>My Cart</h1>
      <div className="cart-list">
        {items.map((it) => (
          <div key={it.id} className="cart-row">
            <img src={it.image} alt={it.title} className="cart-thumb" />
            <div className="cart-info">
              <div className="cart-title">{it.title}</div>
              <div className="cart-store">{it.storeName}</div>
            </div>

            <div className="cart-actions">
              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => decrement(it.id)}
                  aria-label={`Decrease quantity of ${it.title}`}>
                  -
                </button>
                <div className="qty-value">{it.qty ?? 1}</div>
                <button
                  className="qty-btn"
                  onClick={() => increment(it.id)}
                  aria-label={`Increase quantity of ${it.title}`}>
                  +
                </button>
              </div>

              <div className="cart-price">${(it.price * (it.qty ?? 1)).toFixed(2)}</div>

              <button className="remove-btn" onClick={() => removeItem(it.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="cart-summary">
          <div className="summary-left">Total ({totals.count} items):</div>
          <div className="summary-right">${totals.amount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
