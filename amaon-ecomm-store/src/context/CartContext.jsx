import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load initial cart state from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shoppingcart_items');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart state with localStorage
  useEffect(() => {
    localStorage.setItem('shoppingcart_items', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // If already exists, increment the quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + Number(quantity) }
            : item
        );
      }
      // If it is a new item, add to cart
      return [...prevCart, { ...product, quantity: Number(quantity) }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update item quantity in cart
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, Number(quantity)) } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total number of items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price of cart items
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
