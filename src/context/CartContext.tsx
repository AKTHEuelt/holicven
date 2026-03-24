"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

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
