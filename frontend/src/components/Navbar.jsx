import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", onScroll);
    } else {
      setScrolled(false); // Reset scroll state when not on home page
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const navbarClasses =
    location.pathname === "/"
      ? `fixed w-full z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-black/50 backdrop-blur-md shadow-md"
            : "bg-transparent backdrop-blur-none"
        }`
      : "fixed w-full z-50 bg-black/50 backdrop-blur-md shadow-md";

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-gold text-2xl font-playfair font-bold tracking-wide"
        >
          L'ESSENCE
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-12 text-white text-lg font-semibold ">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-gold transition cursor-pointer"
                  : "hover:text-gold transition cursor-pointer"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-gold transition cursor-pointer"
                  : "hover:text-gold transition cursor-pointer"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tables/my"
              className={({ isActive }) =>
                isActive
                  ? "text-gold transition cursor-pointer"
                  : "hover:text-gold transition cursor-pointer"
              }
            >
              My Bookings
            </NavLink>
          </li>
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <NavLink to="/tables">
            <button className="ml-4 bg-gold text-white px-4 py-2 rounded hover:bg-[#e18f06] text-lg font-semibold transition">
              Book a Table
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gold text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md shadow-md px-6 py-4">
          <ul className="flex flex-col space-y-4 text-white text-lg font-light">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-gold transition cursor-pointer"
                    : "hover:text-gold transition cursor-pointer"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-gold transition cursor-pointer"
                    : "hover:text-gold transition cursor-pointer"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tables/my"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-gold transition cursor-pointer"
                    : "hover:text-gold transition cursor-pointer"
                }
              >
                My Bookings
              </NavLink>
            </li>
          </ul>

          {/* Mobile Button */}
          <div className="mt-4">
            <NavLink to="/tables" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-gold text-white px-4 py-2 rounded hover:bg-[#e18f06] text-lg font-semibold transition">
                Book a Table
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
