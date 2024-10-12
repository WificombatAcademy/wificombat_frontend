// cart-context.tsx
"use client"
import React, { createContext, useContext, useState } from "react";

// Create Cart Context
const CartContext = createContext<any>(null);

// Cart Provider to wrap the application
export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Add item to cart
  const addItemToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // Remove item from cart
  const removeItemFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  // Check if item is already in cart
  const isInCart = (itemId: string) => {
    return cartItems.some(item => item.id === itemId);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use Cart context
export const useCart = () => useContext(CartContext);