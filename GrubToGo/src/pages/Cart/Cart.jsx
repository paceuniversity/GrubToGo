import React from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { items } = useCart();

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
            <div className="cart-price">${it.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
