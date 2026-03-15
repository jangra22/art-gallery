import React from 'react';
import { Link } from 'react-router-dom';

const ArtworkCard = ({ artwork }) => {
    return (
        <Link to={`/artwork/${artwork._id}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4 transition-shadow hover:shadow-xl duration-500 ease-out">
                <img 
                    src={artwork.images[0]} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[0.1] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white text-black px-6 py-3 text-xs uppercase tracking-widest font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Artwork
                    </span>
                </div>
                {artwork.limitedEditionCount && (
                    <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 text-[10px] uppercase tracking-wider">
                        Limited Edition
                    </div>
                )}
            </div>

            <div className="text-center group-hover:text-gray-600 transition-colors duration-300">
                <h3 className="font-serif text-lg text-primary tracking-wide mb-1">{artwork.title}</h3>
                <p className="text-secondary text-xs uppercase tracking-widest mb-2">{artwork.medium}</p>
                {artwork.dimensions && <p className="text-gray-400 text-[10px] tracking-wider mb-2">{artwork.dimensions}</p>}
                <div className="w-8 h-[1px] bg-gray-300 mx-auto my-3 group-hover:w-12 transition-all duration-300"></div>
                <p className="text-primary font-medium text-sm">₹{artwork.price.toLocaleString()}<sup>*</sup></p>
            </div>
        </Link>
    );
};

export default ArtworkCard;
