import React, { useState, useEffect } from 'react';
import ArtworkCard from '../components/ArtworkCard';

// Ideally, we fetch this from backend
const Gallery = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await fetch('/api/artworks');
                const data = await response.json();
                setArtworks(data);
            } catch (error) {
                console.error('Error fetching artworks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-serif text-primary mb-4 animate-fade-in">The Collection</h1>
                <p className="text-secondary tracking-wide animate-slide-up delay-100">Explore our curated selection of fine art.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {artworks.map((artwork, index) => (
                    <div key={artwork._id} className={`animate-slide-up`} style={{ animationDelay: `${index * 100}ms` }}>
                        <ArtworkCard artwork={artwork} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
