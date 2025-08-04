import React from 'react';
import bannerImage from '../../assets/images/hero/banner1.jpg';

const HeroSection = () => {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-start px-20"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-xl text-white pt-10">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-playfair leading-tight">
          Fine Dining <br />
          <span className="text-gold">Excellence</span>
        </h1>
        <p className="mt-4 text-2xl font-playfair">Experience Culinary Artistry</p>

        <button 
          className="mt-8 px-6 py-3 bg-gold text-black rounded hover:opacity-90 font-playfair font-semibold transition"
          onClick={() => {
            const categoriesSection = document.getElementById('categories');
            if (categoriesSection) {
              categoriesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Explore Menu
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
