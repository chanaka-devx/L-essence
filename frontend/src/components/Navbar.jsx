import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', onScroll);
    } else {
      setScrolled(false); // Reset scroll state when not on home page
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const navbarClasses = location.pathname === '/'
    ? `fixed py-2 pl-10 pr-10 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-black/50 backdrop-blur-md shadow-md'
          : 'bg-transparent backdrop-blur-none'
      }`
    : 'fixed py-2 pl-10 pr-10 w-full z-50 bg-black/50 backdrop-blur-md shadow-md';

  return (
    <nav className={navbarClasses}>
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
              to="/tables/my" 
              className={({isActive}) => 
                isActive ? "text-gold transition cursor-pointer" : "hover:text-gold transition cursor-pointer"
              }
            >
              My Bookings
            </NavLink>
          </li>
        </ul>

        {/* Button */}
        <button className="ml-4 bg-gold text-white px-4 py-2 rounded hover:opacity-90 hover:text-black text-lg font-bold-200 transition">
          <NavLink 
              to="/tables" 
            >
              Book a Table
            </NavLink>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
