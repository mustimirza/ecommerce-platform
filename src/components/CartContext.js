import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (productId, productTitle) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId]) {
        newCart[productId] = {
          ...newCart[productId],
          quantity: newCart[productId].quantity + 1,
        };
      } else {
        newCart[productId] = { title: productTitle, quantity: 1 };
      }
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId]?.quantity > 1) {
        newCart[productId].quantity -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
