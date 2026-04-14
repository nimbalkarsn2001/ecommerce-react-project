import React, { createContext, useContext, useMemo, useState } from 'react';
import axios from 'axios';


// .NET API URL  
const API_URL = 'https://localhost:7299';

const initialProducts = [
    { id: 1, name: 'Classic Sneakers', category: 'Footwear', price: 75, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', stock: 10 },
    { id: 2, name: 'Retro Jacket', category: 'Apparel', price: 120, image: 'https://images.unsplash.com/photo-1520975922284-6b5a9f6a0b52?w=400', stock: 5 },
    { id: 3, name: 'Smart Watch', category: 'Accessories', price: 160, image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400', stock: 8 },
    { id: 4, name: 'Denim Jeans', category: 'Apparel', price: 60, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400', stock: 12 },
    { id: 5, name: 'Running Shorts', category: 'Apparel', price: 35, image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400', stock: 14 },
    { id: 6, name: 'Backpack', category: 'Accessories', price: 45, image: 'https://images.unsplash.com/photo-1509762774605-f07235a08f1f?w=400', stock: 20 },
    { id: 7, name: 'Running Shoes', category: 'Footwear', price: 90, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400', stock: 7 },
    { id: 8, name: 'Casual T-Shirt', category: 'Apparel', price: 25, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', stock: 15 },
    { id: 9, name: 'Leather Wallet', category: 'Accessories', price: 40, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400', stock: 18 },
    { id: 10, name: 'Sports Cap', category: 'Accessories', price: 20, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400', stock: 25 },
    { id: 11, name: 'Hoodie', category: 'Apparel', price: 55, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', stock: 9 },
    { id: 12, name: 'Formal Shoes', category: 'Footwear', price: 110, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400', stock: 6 },
    { id: 13, name: 'Travel Bag', category: 'Accessories', price: 80, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', stock: 11 },
    { id: 14, name: 'Fitness Watch', category: 'Accessories', price: 150, image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=400', stock: 10 },
    { id: 15, name: 'Slim Fit Shirt', category: 'Apparel', price: 50, image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400', stock: 13 },
    { id: 16, name: 'Casual Sneakers', category: 'Footwear', price: 85, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', stock: 9 },
    { id: 17, name: 'Laptop Backpack', category: 'Accessories', price: 70, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', stock: 12 },
    { id: 18, name: 'Sports Shorts', category: 'Apparel', price: 30, image: 'https://images.unsplash.com/photo-1593032465171-8c2e5f9c9d77?w=400', stock: 16 },
    { id: 19, name: 'Leather Belt', category: 'Accessories', price: 28, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400', stock: 20 },
    { id: 20, name: 'Training Shoes', category: 'Footwear', price: 95, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400', stock: 8 },
    { id: 21, name: 'Bluetooth Headphones', category: 'Accessories', price: 120, image: 'https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9?w=400', stock: 10 },
    { id: 22, name: 'Wireless Earbuds', category: 'Accessories', price: 90, image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400', stock: 14 },
    { id: 23, name: 'Gaming Mouse', category: 'Accessories', price: 45, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400', stock: 20 },
    { id: 24, name: 'Mechanical Keyboard', category: 'Accessories', price: 130, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400', stock: 9 },
    { id: 25, name: 'Sports Jacket', category: 'Apparel', price: 95, image: 'https://images.unsplash.com/photo-1520974735194-0f0e2b7d7d3c?w=400', stock: 11 },
    { id: 26, name: 'Winter Hoodie', category: 'Apparel', price: 70, image: 'https://images.unsplash.com/photo-1556909212-d5b604d0e4e3?w=400', stock: 13 },
    { id: 27, name: 'Cotton Shirt', category: 'Apparel', price: 45, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400', stock: 17 },
    { id: 28, name: 'Denim Jacket', category: 'Apparel', price: 110, image: 'https://images.unsplash.com/photo-1593032465171-8c2e5f9c9d77?w=400', stock: 8 },
    { id: 29, name: 'Running Sneakers', category: 'Footwear', price: 88, image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400', stock: 12 },
    { id: 30, name: 'Basketball Shoes', category: 'Footwear', price: 140, image: 'https://images.unsplash.com/photo-1528701800489-20be3c1ea49c?w=400', stock: 6 },
    { id: 31, name: 'Canvas Shoes', category: 'Footwear', price: 60, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', stock: 15 },
    { id: 32, name: 'Hiking Boots', category: 'Footwear', price: 160, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', stock: 7 },
    { id: 33, name: 'Travel Backpack', category: 'Accessories', price: 85, image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400', stock: 10 },
    { id: 34, name: 'Gym Bag', category: 'Accessories', price: 55, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', stock: 16 },
    { id: 35, name: 'Smart Fitness Band', category: 'Accessories', price: 75, image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=400', stock: 14 },
    { id: 36, name: 'Digital Watch', category: 'Accessories', price: 65, image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400', stock: 12 },
    { id: 37, name: 'Summer T-Shirt', category: 'Apparel', price: 22, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', stock: 18 },
    { id: 38, name: 'Athletic Shorts', category: 'Apparel', price: 28, image: 'https://images.unsplash.com/photo-1593032465171-8c2e5f9c9d77?w=400', stock: 19 },
    { id: 39, name: 'Leather Handbag', category: 'Accessories', price: 120, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400', stock: 8 },
    { id: 40, name: 'Travel Suitcase', category: 'Accessories', price: 180, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', stock: 6 },
];

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
    const [products] = useState(initialProducts);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
                        : item
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
                item.product.id === productId
                    ? { ...item, quantity: Math.min(quantity, item.product.stock) }
                    : item
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

    // Restore user from localStorage on app load
    const restoreUserFromStorage = () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            localStorage.removeItem('user');
        }
    };

    // authLogin — .NET API connect 
    const authLogin = async ({ email, password }) => {
        if (!email || !password)
            return { status: false, message: 'Email and password are required.' };

        try {
            setLoading(true);
            await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            });

            const userData = { email };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { status: true };

        } catch (error) {
            if (error.response?.status === 401) {
                return { status: false, message: 'Invalid Email or Password.' };
            } else if (error.response?.status === 400) {
                return { status: false, message: 'Please enter valid details.' };
            } else {
                return { status: false, message: 'Server error. Please try again.' };
            }
        } finally {
            setLoading(false);
        }
    };

    //  authSignup — Updated with new API fields
    const authSignup = async ({ firstName, lastName, email, mobileNo, gender, password }) => {
        // Validation
        if (!firstName || !lastName || !email || !mobileNo || !gender || !password)
            return { status: false, message: 'All fields are required.' };

        try {
            setLoading(true);

            //  .NET API call — Uncommented & Updated
            await axios.post(`${API_URL}/api/auth/register`, {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                MobileNo: mobileNo,
                Gender: gender,
                Password: password,
            });

            //  Save user info after successful signup
            const userData = { firstName, lastName, email, mobileNo, gender };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));

            return { status: true, message: 'Account created successfully!' };

        } catch (error) {
            if (error.response?.status === 400) {
                return { status: false, message: error.response.data?.message || 'Invalid details. Please try again.' };
            } else if (error.response?.status === 409) {
                return { status: false, message: 'Email already exists. Please login.' };
            } else {
                return { status: false, message: 'Signup failed. Please try again.' };
            }
        } finally {
            setLoading(false);
        }
    };

    const authLogout = () => {
        setUser(null);
        setCart([]);
        setWishlist([]);
        localStorage.removeItem('user');
    };

    return (
        <StoreContext.Provider
            value={{
                products,
                cart,
                wishlist,
                user,
                loading,
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
                restoreUserFromStorage,
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
