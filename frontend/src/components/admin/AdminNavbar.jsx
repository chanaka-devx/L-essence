import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from '../../context/useAuth';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout(); // Clear auth state and remove token
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-2 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="text-[#F59E0B] font-bold text-lg tracking-wide">
          <Link to="/admin">
            L'ESSENCE <span className="text-gray-600 font-normal">- Admin</span>
          </Link>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-md text-gray-700">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "text-[#F59E0B] transition"
                : "hover:text-[#F59E0B] transition"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive
                ? "text-[#F59E0B] transition"
                : "hover:text-[#F59E0B] transition"
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/admin/dishes"
            className={({ isActive }) =>
              isActive
                ? "text-[#F59E0B] transition"
                : "hover:text-[#F59E0B] transition"
            }
          >
            Dishes
          </NavLink>
          <NavLink
            to="/admin/tables"
            className={({ isActive }) =>
              isActive
                ? "text-[#F59E0B] transition"
                : "hover:text-[#F59E0B] transition"
            }
          >
            Tables
          </NavLink>
          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              isActive
                ? "text-[#F59E0B] transition"
                : "hover:text-[#F59E0B] transition"
            }
          >
            Bookings
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-[#F59E0B] transition"
          >
            <FiLogOut />
            Logout
          </button>
          <Link
            to="/"
            className="hover:text-[#F59E0B] transition text-sm border border-[#F59E0B] rounded px-3 py-1"
          >
            View Site
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
