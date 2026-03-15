import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [step, setStep] = useState(1);
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = 50; // Flat rate for example
    const total = subtotal + shipping;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handlePlaceOrder = () => {
        // Simulate order placement
        alert(`Order Placed Successfully!\nTotal: ₹${total}\nSending confirmation to ${formData.email}`);
        clearCart();
        navigate('/');
    };

    if (cartItems.length === 0) {
        return <div className="p-12 text-center">Your cart is empty</div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-12 px-6 max-w-4xl mx-auto">
            {/* Steps Indicator */}
            <div className="flex justify-center mb-12 text-sm uppercase tracking-widest text-gray-400">
                <span className={step === 1 ? 'text-black font-medium border-b border-black pb-1' : ''}>1. Details</span>
                <span className="mx-4 text-gray-300">/</span>
                <span className={step === 2 ? 'text-black font-medium border-b border-black pb-1' : ''}>2. Summary</span>
                <span className="mx-4 text-gray-300">/</span>
                <span className={step === 3 ? 'text-black font-medium border-b border-black pb-1' : ''}>3. Payment</span>
            </div>

            {/* Step 1: Details */}
            {step === 1 && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-serif mb-8">Shipping Details</h2>
                    <form onSubmit={handleNext} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="border-b bg-transparent py-3 focus:outline-none focus:border-black transition-colors" />
                            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required className="border-b bg-transparent py-3 focus:outline-none focus:border-black transition-colors" />
                        </div>
                        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full border-b bg-transparent py-3 focus:outline-none focus:border-black transition-colors" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="border-b bg-transparent py-3 focus:outline-none focus:border-black transition-colors" />
                            <input name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP Code" required className="border-b bg-transparent py-3 focus:outline-none focus:border-black transition-colors" />
                            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="border-b bg-transparent py-3 focus:outline-none focus:border-black transition-colors" />
                        </div>
                        
                        <div className="flex justify-end pt-8">
                            <button type="submit" className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-gray-800">
                                Review Order
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Step 2: Order Summary */}
            {step === 2 && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-serif mb-8">Order Summary</h2>
                    
                    <div className="bg-gray-50 p-8 mb-8">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Shipping To</h3>
                        <p className="font-medium">{formData.name}</p>
                        <p className="text-gray-600">{formData.address}, {formData.city} {formData.zip}</p>
                        <p className="text-gray-600">{formData.phone}</p>
                        <button onClick={() => setStep(1)} className="text-xs text-blue-600 underline mt-2">Edit</button>
                    </div>

                    <div className="space-y-6 mb-8">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex justify-between items-center border-b border-gray-100 pb-4">
                                <span className="font-medium">{item.title} (x{item.qty})</span>
                                <span>₹{(item.price * item.qty).toLocaleString()}<sup>*</sup></span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-lg font-serif border-t border-black pt-6">
                        <span>Total (incl. shipping)</span>
                        <span>₹{total.toLocaleString()}<sup>*</sup></span>
                    </div>

                    <div className="flex justify-end pt-8 space-x-4">
                        <button onClick={() => setStep(1)} className="px-8 py-3 text-sm hover:text-gray-600">Back</button>
                        <button onClick={handleNext} className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-gray-800">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            )}

             {/* Step 3: Payment (Placeholder) */}
             {step === 3 && (
                <div className="animate-fade-in text-center py-12 bg-gray-50">
                    <h2 className="text-2xl font-serif mb-4">Payment</h2>
                    <p className="text-gray-600 mb-8">Payment gateway connection is excluded for this demo.</p>
                    
                    <button 
                        onClick={handlePlaceOrder}
                        className="bg-black text-white px-12 py-4 uppercase tracking-widest text-sm hover:bg-gray-800 shadow-lg"
                    >
                        Complete Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
