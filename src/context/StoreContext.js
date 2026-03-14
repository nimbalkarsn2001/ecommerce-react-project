import React, { createContext, useContext, useMemo, useState } from 'react';

const initialProducts = [
  { id: 1, name: 'Classic Sneakers', category: 'Footwear', price: 75, image: 'https://source.unsplash.com/random/400x400?shoes', stock: 10 },
  { id: 2, name: 'Retro Jacket', category: 'Apparel', price: 120, image: 'https://source.unsplash.com/random/400x400?jacket', stock: 5 },
  { id: 3, name: 'Smart Watch', category: 'Accessories', price: 160, image: 'https://source.unsplash.com/random/400x400?watch', stock: 8 },
  { id: 4, name: 'Denim Jeans', category: 'Apparel', price: 60, image: 'https://source.unsplash.com/random/400x400?jeans', stock: 12 },
  { id: 5, name: 'Running Shorts', category: 'Apparel', price: 35, image: 'https://source.unsplash.com/random/400x400?shorts', stock: 14 },
  { id: 6, name: 'Backpack', category: 'Accessories', price: 45, image: 'https://source.unsplash.com/random/400x400?backpack', stock: 20 },
];

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]); // { product, quantity }
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.min(quantity, item.product.stock) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInCart = (productId) => cart.some((item) => item.product.id === productId);
  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  const totalItems = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, i) => sum + i.quantity * i.product.price, 0), [cart]);

  const authLogin = ({ email, password }) => {
    if (!email || !password) return { status: false, message: 'Email and password are required.' };
    setUser({ email });
    return { status: true };
  };

  const authSignup = ({ name, email, password }) => {
    if (!name || !email || !password) return { status: false, message: 'All fields are required.' };
    setUser({ name, email });
    return { status: true };
  };

  const authLogout = () => setUser(null);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        user,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInCart,
        isInWishlist,
        authLogin,
        authSignup,
        authLogout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
