import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import ArtworkCard from '../components/ArtworkCard';

// Dummy data for featured artworks
const FEATURED_ARTWORKS = [
    {
        _id: '1',
        title: 'Ethereal Whispers',
        medium: 'Oil on Canvas',
        price: 1200,
        images: ['https://images.unsplash.com/photo-1549813069-f95e44d7f498?q=80&w=2670&auto=format&fit=crop'],
        limitedEditionCount: 10
    },
    {
        _id: '2',
        title: 'Silent Reflection',
        medium: 'Charcoal',
        price: 850,
        images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2690&auto=format&fit=crop'],
        limitedEditionCount: 5
    },
    {
        _id: '3',
        title: 'Winter Solstice',
        medium: 'Acrylic',
        price: 1500,
        images: ['https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop'],
        limitedEditionCount: null
    }
];

const Home = () => {
    const [featuredArtworks, setFeaturedArtworks] = useState([]);

    // Scroll animation logic
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-up');
                    entry.target.classList.remove('opacity-0');
                }
            });
        }, { threshold: 0.1 });

        const initObserver = () => {
            const elements = document.querySelectorAll('.scroll-reveal');
            elements.forEach(el => observer.observe(el));
        };

        // Fetch data
        const fetchArtworks = async () => {
             try {
                 const response = await fetch('/api/artworks');
                 const data = await response.json();
                 // Just take first 3 for now, or filter by some criteria
                 setFeaturedArtworks(data.slice(0, 3));
                 
                 // Small delay to allow DOM to update before observing
                 setTimeout(initObserver, 100);
             } catch (error) {
                 console.error("Home fetch error:", error);
             }
        };

        fetchArtworks();

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <Carousel />

            {/* Featured Collection */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16 scroll-reveal opacity-0">
                    <h2 className="text-3xl font-serif text-primary mb-4">Featured Collection</h2>
                    <div className="w-16 h-[1px] bg-black mx-auto"></div>
                    <p className="mt-4 text-secondary text-sm tracking-wide">Curated selections for the discerning collector.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 scroll-reveal opacity-0 delay-200">
                    {featuredArtworks.length > 0 ? (
                        featuredArtworks.map(artwork => (
                            <ArtworkCard key={artwork._id} artwork={artwork} />
                        ))
                    ) : (
                        <p className="text-center col-span-3 text-gray-400">Loading collection...</p>
                    )}
                </div>
            </section>

            {/* Scroll Storytelling Section */}
            <section className="py-32 bg-paper relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal opacity-0">
                    <p className="text-lg md:text-2xl font-serif italic text-secondary leading-relaxed mb-8">
                        "Art is not just what you see, but what you make others feel. <br/>
                        Each stroke carries the weight of a moment, captured forever in silence."
                    </p>
                    <div className="w-24 h-[1px] bg-accent mx-auto"></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
