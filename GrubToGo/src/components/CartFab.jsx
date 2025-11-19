import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import './CartFab.css';

const CartFab = () => {
  const { totals } = useCart();
  const navigate = useNavigate();
  return (
    <button className="cart-fab" onClick={() => navigate('/cart')}>
      <img src={assets.cart_icon} alt="Cart" className="cart-fab-icon" />
      {totals.count > 0 && (
        <span className="cart-fab-badge">{totals.count}</span>
      )}
    </button>
  );
};

export default CartFab;
