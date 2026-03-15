import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, User, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { cartItems } = useCart();
    
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // const isHome = location.pathname === '/'; // location is not defined, removing if unused or fix import

    return (
        <nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
                isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-serif tracking-widest font-normal text-primary">
                    INK & INDENTATIONS
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-12">
                    <Link to="/gallery" className="text-sm uppercase tracking-widest text-secondary hover:text-black transition-colors">
                        Gallery
                    </Link>
                    <Link to="/about" className="text-sm uppercase tracking-widest text-secondary hover:text-black transition-colors">
                        About
                    </Link>
                    <Link to="/admin" className="text-sm uppercase tracking-widest text-secondary hover:text-black transition-colors">
                        Admin
                    </Link>
                    
                    <div className="flex items-center space-x-6 pl-4 border-l border-gray-200">
                        <Link to="/login" className="text-secondary hover:text-black transition-colors">
                            <User size={20} strokeWidth={1} />
                        </Link>
                        <Link to="/cart" className="relative hover:text-gray-600 transition-colors">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-primary" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-8 px-6 flex flex-col space-y-6">
                    <Link to="/gallery" className="text-lg uppercase tracking-widest text-primary" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
                    <Link to="/about" className="text-lg uppercase tracking-widest text-primary" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link to="/cart" className="text-lg uppercase tracking-widest text-primary" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
                    <Link to="/login" className="text-lg uppercase tracking-widest text-primary" onClick={() => setIsMobileMenuOpen(false)}>Account</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
