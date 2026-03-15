import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-cream">
                <h2 className="text-3xl font-serif text-primary mb-4">Your collection is empty</h2>
                <Link to="/gallery" className="border-b border-black pb-1 hover:text-gray-600 transition-colors">
                    Browse the Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-serif mb-12">Shopping Cart</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex gap-6 border-b border-gray-100 pb-8 animate-fade-in">
                            <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow flex justify-between">
                                <div>
                                    <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm mb-1">{item.medium}</p>
                                    <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                                </div>
                                <div className="text-right flex flex-col justify-between">
                                    <p className="font-medium">₹{item.price.toLocaleString()}<sup>*</sup></p>
                                    <button 
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-8 h-fit">
                    <h3 className="text-lg font-medium mb-6 uppercase tracking-widest">Order Summary</h3>
                    
                    <div className="flex justify-between mb-4 text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}<sup>*</sup></span>
                    </div>
                    <div className="flex justify-between mb-8 text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 flex justify-between mb-8 font-medium text-lg">
                        <span>Total</span>
                        <span>₹{subtotal.toLocaleString()}<sup>*</sup></span>
                    </div>

                    <Link to="/checkout" className="block w-full bg-black text-white text-center py-4 uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
