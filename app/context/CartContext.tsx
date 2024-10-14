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

  // Function to check if all modules of a course are in the cart
  const areAllModulesSelected = (courseModules: any[]) => {
    return courseModules.every((module: any) =>
      cart.some((cartItem) => cartItem.id === module.id && cartItem.type === 'module')
    );
  };

  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

      // Handle adding a course
      if (item.type === 'course' && item.details?.modules?.length > 0) {
        removeModulesFromCourse(item.details.modules);
        // toast.success('Course has been added to the cart, removing individual modules.');
      }

      // Handle the case where all modules are selected for a course
      if (item.type === 'module' && item.details?.course) {
        const courseModules = item.details.course.modules;

        // If all modules are selected, remove the modules and add the course
        if (areAllModulesSelected(courseModules)) {
          removeModulesFromCourse(courseModules);
          setCart((prevCart) => [
            ...prevCart,
            { 
              id: item.details.course.course_id, 
              title: item.details.course.title, 
              type: 'course', 
              price: item.details.course.price, 
              quantity: 1, 
              details: item.details.course 
            }
          ]);
          toast.success('All modules selected. The course has been added to the cart.');
          return prevCart; // Stop further module addition
        }
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
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, cartQuantity, isInCart, }}>
      {children}
    </CartContext.Provider>
  );
};