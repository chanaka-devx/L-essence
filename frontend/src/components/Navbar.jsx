import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
    className={`fixed py-2 pl-10 pr-10 w-full z-50 transition-colors duration-300 ${
        scrolled
        ? 'bg-black/50 backdrop-blur-md shadow-md'
        : 'bg-transparent backdrop-blur-none'
    }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-gold text-2xl font-playfair font-bold tracking-wide">
          L'ESSENCE
        </Link>

        {/* Navigation */}
        <ul className="flex space-x-20 text-white text-lg font-bold-200">
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => 
                isActive ? "text-gold transition cursor-pointer" : "hover:text-gold transition cursor-pointer"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({isActive}) => 
                isActive ? "text-gold transition cursor-pointer" : "hover:text-gold transition cursor-pointer"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({isActive}) => 
                isActive ? "text-gold transition cursor-pointer" : "hover:text-gold transition cursor-pointer"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

        {/* Button */}
        <button className="ml-4 bg-gold text-white px-4 py-2 rounded hover:opacity-90 hover:text-black text-lg font-bold-200 transition">
          Book a Table
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
