import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
        }, 2500); // 2.5 seconds cinematic intro

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-cream flex items-center justify-center animate-fade-out" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-serif tracking-[0.2em] font-light animate-slide-up text-primary">
                    INK & INDENTATIONS
                </h1>
                <div className="w-16 h-[1px] bg-black mx-auto mt-6 animate-scale-x" style={{ transformOrigin: 'left' }}></div>
            </div>
        </div>
    );
};

export default Loader;
