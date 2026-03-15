import React, { useState, useEffect } from 'react';
import image1 from '../assets/artworks/WhatsApp Image 2025-12-15 at 23.09.49.jpeg';
import image2 from '../assets/artworks/WhatsApp Image 2025-12-15 at 23.10.52.jpeg';
const slides = [
    {
        id: 1,
        image: image1, // Abstract oil
        title: 'Whispers of Spring',
        subtitle: 'Acrylic on Paper, 2024'
    },
    {
        id: 2,
        image: image2, // Moody portrait
        title: 'Between Hues',
        subtitle: 'Acrylic on Paper, 2024'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', // Landscape
        title: 'Morning Haze',
        subtitle: 'Watercolor, 2024'
    }
];

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000); // 6 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-cream">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                        index === current ? 'opacity-100' : 'opacity-0 z-0'
                    } ${index === current ? 'z-10' : ''}`}
                >
                    <div className="absolute inset-0 bg-black/10 z-10" /> {/* Slight overlay */}
                    <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${index === current ? 'scale-110' : 'scale-100'}`} // Slow zoom
                    />
                    
                    <div className="absolute bottom-20 left-6 md:left-20 z-20 text-white drop-shadow-lg">
                        <p className="text-sm md:text-base uppercase tracking-[0.3em] font-light mb-2 animate-slide-up delay-300">Featured Collection</p>
                        <h2 className="text-4xl md:text-7xl font-serif tracking-in-expand animate-slide-up delay-500">
                            {slide.title}
                        </h2>
                        <p className="mt-4 text-sm font-sans tracking-wider opacity-90 animate-slide-up delay-700">{slide.subtitle}</p>
                    </div>
                </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-10 left-0 w-full z-30 flex justify-center space-x-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                            index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
