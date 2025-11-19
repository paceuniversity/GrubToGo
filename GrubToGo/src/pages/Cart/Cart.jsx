import React from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { items, totals, increment, decrement, removeItem, clear } = useCart();

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
              <div className="cart-price">${it.price.toFixed(2)}</div>
            </div>
            <div className="cart-qty">
              <button onClick={() => decrement(it.id)}>-</button>
              <span>{it.qty}</span>
              <button onClick={() => increment(it.id)}>+</button>
            </div>
            <div className="cart-subtotal">${(it.qty * it.price).toFixed(2)}</div>
            <button className="cart-remove" onClick={() => removeItem(it.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div>Items: {totals.count}</div>
        <div>Total: ${totals.amount.toFixed(2)}</div>
      </div>
      <div className="cart-actions">
        <button onClick={clear}>Clear Cart</button>
        {/* Placeholder for checkout flow */}
        <button className="cart-checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
