import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/images/profile.jpg";

const AdminDetailsModal = ({ isOpen, onClose, admin, setAdmin }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch profile when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchUserProfile = async () => {
        try {
          const res = await axios.get("http://localhost:5176/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAdmin(res.data);
        } catch (err) {
          console.error("Error fetching user profile:", err);
          if (err.response && err.response.status === 401) {
            navigate("/login");
          }
        }
      };

      fetchUserProfile();
    }
  }, [isOpen, token, navigate, setAdmin]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="bg-white w-80 h-2/3 rounded-lg shadow-lg p-6 flex flex-col font-['Playfair_Display']">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-[#333333]">
            Admin Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={admin?.image || Profile}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover mb-4"
          />
          <h3 className="text-lg font-semibold text-[#333333]">
            {admin?.name}
          </h3>
          <p className="text-gray-600">{admin?.email}</p>
          <p className="text-gray-600">{admin?.phone}</p>
        </div>

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailsModal;
