import React, { useState } from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../../services/firestoreService';
import { auth } from '../../firebase';

const Cart = () => {
  const { items, removeItem, clear, totals } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleCheckout = async () => {
    if (!auth.currentUser) {
      alert('Please log in to place an order');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // For now, we only support one item at a time (offerings are individual deals)
    if (items.length > 1) {
      alert('Please checkout one item at a time');
      return;
    }

    const item = items[0];

    try {
      setLoading(true);

      // Validate offering ID
      if (!item.id || typeof item.id !== 'string') {
        throw new Error('Invalid offering ID. Please try adding the item to cart again.');
      }

      const orderData = {
        offeringId: item.id, // This is the offering ID from Firestore
        studentId: auth.currentUser.uid,
        studentEmail: auth.currentUser.email,
        totalAmount: item.price
      };

      console.log('Placing order with data:', orderData);
      const result = await placeOrder(orderData);
      
      alert(`Order placed successfully!\nOrder ID: ${result.orderId}\nNew Balance: $${result.newBalance.toFixed(2)}`);
      
      // Clear cart after successful order
      clear();
      
      // Navigate to a success page or orders page
      navigate('/student');
    } catch (error) {
      console.error('Order placement failed:', error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
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
            <button 
              className="cart-remove-btn"
              onClick={() => removeItem(it.id)}
              title="Remove from cart"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span className="cart-total-amount">${totals.amount.toFixed(2)}</span>
        </div>
        <button 
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};


export default Cart;
