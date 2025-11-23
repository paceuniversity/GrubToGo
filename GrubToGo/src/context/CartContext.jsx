import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = sessionStorage.getItem('grubtogo_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('grubtogo_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      // Check if item already exists - if so, don't add it again
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx !== -1) {
        // Item already in cart, return unchanged
        return prev;
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const increment = (id) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const decrement = (id) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p)));
  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0);
    const amount = items.reduce((acc, i) => acc + i.price * i.qty, 0);
    return { count, amount: +amount.toFixed(2) };
  }, [items]);

  const value = { items, addItem, removeItem, increment, decrement, clear, totals };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
