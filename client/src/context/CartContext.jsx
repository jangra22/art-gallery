import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load from local storage on init
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        // Check if item already exists
        const existItem = cartItems.find((x) => x._id === item._id);
        if (existItem) {
            // Optional: increase quantity or just do nothing if unique
            // For art, usually unique, but user might want to check quantity logic
            // Assuming unique for now based on context, but let's allow "quantity" property update if needed
             setCartItems(
                cartItems.map((x) =>
                    x._id === item._id ? { ...x, qty: x.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, qty: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x._id !== id));
    };
    
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
