import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white py-12 md:py-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-8 md:mb-0">
                    <h3 className="text-xl font-serif tracking-widest mb-2 font-normal">INK & INDENTATIONS</h3>
                    <p className="text-secondary text-sm tracking-wide">Original Artworks. Crafted with Intention.</p>
                </div>
                
                <div className="flex space-x-8 mb-8 md:mb-0">
                    <a href="https://www.instagram.com/himanshi_kalakar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-secondary hover:text-black text-sm uppercase tracking-widest transition-colors">Instagram</a>
                    <a href="https://www.youtube.com/@himanshisharma5084" className="text-secondary hover:text-black text-sm uppercase tracking-widest transition-colors">Youtube</a>
                    <a href="mailto:sharmahimani443@gmail.com" className="text-secondary hover:text-black text-sm uppercase tracking-widest transition-colors">Contact</a>
                </div>

                <div className="text-accent text-xs tracking-widest">
                    &copy; {new Date().getFullYear()} All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
