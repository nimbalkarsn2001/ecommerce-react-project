import { useStore } from '../context/StoreContext';

/**
 * useCart Hook
 * Custom hook to manage shopping cart operations
 */
export const useCart = () => {
  const { cart, addToCart, removeFromCart, updateCartQuantity, clearCart, totalItems, totalPrice } = useStore();

  return {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  };
};

export default useCart;
