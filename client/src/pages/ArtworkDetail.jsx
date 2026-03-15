import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ArtworkDetail = () => {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);

    // Fetch from backend
    useEffect(() => {
        const fetchArtwork = async () => {
             try {
                 const res = await fetch(`/api/artworks/${id}`);
                 const data = await res.json();
                 setArtwork(data);
             } catch (error) {
                 console.error(error);
             }
        };
        fetchArtwork();
    }, [id]);

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(artwork);
        alert('Added to cart!');
    };

    if (!artwork) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="bg-gray-50 aspect-[4/5] overflow-hidden">
                    <img 
                        src={artwork.images[0]} 
                        alt={artwork.title} 
                        className="w-full h-full object-cover animate-fade-in"
                    />
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-center animate-slide-up">
                    <h1 className="text-4xl font-serif mb-2">{artwork.title}</h1>
                    <p className="text-xl text-gray-500 mb-6">{artwork.medium}, {artwork.year}</p>
                    
                    <div className="mb-8">
                        <p className="text-2xl font-medium mb-4">₹{artwork.price.toLocaleString()}<sup>*</sup></p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {artwork.description || "No description available."}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-8 border-t border-b border-gray-100 py-6">
                            <div>
                                <span className="block uppercase tracking-wider text-xs mb-1">Dimensions</span>
                                {artwork.dimensions || "N/A"}
                            </div>
                            <div>
                                <span className="block uppercase tracking-wider text-xs mb-1">Edition</span>
                                {artwork.limitedEditionCount ? `Limited Edition of ${artwork.limitedEditionCount}` : "Original"}
                            </div>
                        </div>

                        <button 
                            onClick={handleAddToCart}
                            className="w-full bg-black text-white py-4 active:scale-95 transition-transform uppercase tracking-widest text-sm hover:bg-gray-800"
                        >
                            Add to Collection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetail;
