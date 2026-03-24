"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'holicven_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isHydrated]);

  function addToCart(product: Product) {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  }

  function removeFromCart(productId: number) {
    setCart(cart.filter(item => item.product.id !== productId));
  }

  function clearCart() {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
