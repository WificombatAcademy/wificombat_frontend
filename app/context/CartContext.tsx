"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = {
  id: string;
  name: string;
  type: 'course' | 'module';
  price: string;
  quantity: number;
  details: any; // additional details of the course/module
  level?: string;
};

type CartContextType = {
  cart: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
  cartQuantity: number;
  isInCart: (id: string) => boolean;
};

type CartProviderProps = {
  children: ReactNode; 
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  // Load cart from localStorage on initialization
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update cart quantity and persist cart to localStorage whenever it changes
  useEffect(() => {
    setCartQuantity(cart.reduce((acc, item) => acc + item.quantity, 0));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex === -1) {
        // Add new item to cart
        return [...prevCart, { ...item, quantity: 1 }];
      } else {
        // Increment quantity of existing item
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      }
    });
  };

  const removeItemFromCart = (id: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      return newCart;
    });
  };

  const isInCart = (id: string) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, cartQuantity, isInCart, }}>
      {children}
    </CartContext.Provider>
  );
};