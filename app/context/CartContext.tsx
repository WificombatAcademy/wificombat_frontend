"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

type CartItem = {
  id: string;
  subject?: string;
  title?: string;
  name?: string;
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
  isNotificationDisplayed: boolean;
  removedCourseSubject: string;
  removedModuleName: string;
  setIsNotificationDisplayed: React.Dispatch<React.SetStateAction<boolean>>
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
  const [isNotificationDisplayed, setIsNotificationDisplayed] = useState(false);
  const [removedCourseSubject, setRemovedCourseSubject] = useState('');
  const [removedModuleName, setRemovedModuleName] = useState('');

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

    const removeModulesFromCourse = (courseModules: any[]) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        // Keep only items that are not in the list of course modules
        return !(
          item.type === 'module' &&
          courseModules.some((module) => module.id === item.id)
        );
      })
    );
  };

  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

      // If the item is a module, remove its associated course if it exists
      if (item.type === 'module') {
        const associatedCourse = prevCart.find((cartItem) => 
          cartItem.type === 'course' && 
          cartItem.details?.modules?.some((module: any) => module.id === item.id)
        );

        // Remove the associated course if found
        if (associatedCourse) {
          setRemovedCourseSubject(associatedCourse.subject ?? '');
          setRemovedModuleName(item.name ?? '');
          setIsNotificationDisplayed(true);
          return prevCart.filter(cartItem => cartItem.id !== associatedCourse.id);
        }
      }

      // If the item is a course, remove its modules from the cart
      if (item.type === 'course' && item.details?.modules?.length > 0) {
        removeModulesFromCourse(item.details.modules);
      }

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
    <CartContext.Provider value={{ 
    cart, 
    addItemToCart, 
    removeItemFromCart, 
    cartQuantity, 
    isInCart, 
    isNotificationDisplayed,
    removedCourseSubject, 
    removedModuleName,  
    setIsNotificationDisplayed}}>
      {children}
    </CartContext.Provider>
  );
};