import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaUtensils, FaTags, FaChair } from "react-icons/fa";
import Profile from "../../assets/images/profile.jpg";
import AdminDetailsModal from "./AdminDetailsModal";

const AdminDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [counts, setCounts] = useState({
    users: 0,
    categories: 0,
    dishes: 0,
    tables: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5176/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounts(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5176/api/admin/last-bookings",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecentBookings(res.data.bookings);
    } catch (err) {
      console.error("Error fetching recent bookings:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStats();
      fetchRecentBookings();
    }
  }, [token]);

  // Define stats array with dynamic values
  const stats = [
    {
      title: "Users",
      value: counts.users || 0,
      icon: <FaUsers className="text-xl" />,
      color: "bg-blue-500",
    },
    {
      title: "Categories",
      value: counts.categories || 0,
      icon: <FaTags className="text-xl" />,
      color: "bg-green-500",
    },
    {
      title: "Dishes",
      value: counts.dishes || 0,
      icon: <FaUtensils className="text-xl" />,
      color: "bg-yellow-500",
    },
    {
      title: "Tables",
      value: counts.tables || 0,
      icon: <FaChair className="text-xl" />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="bg-[#FDF6E3] min-h-screen px-6 py-10 font-['Playfair_Display']">
      <div className="max-w-7xl mx-auto pt-12">
        {/* Header with title + profile */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-[#333333]">
            Admin Dashboard
          </h1>

          {/* Profile picture (clickable) */}
          <button
            className="focus:outline-none"
            onClick={() => setModalOpen(true)}
          >
            <img
              src={Profile}
              alt="Admin Profile"
              className="w-12 h-12 rounded-full border-2 border-[#F59E0B] hover:scale-105 transition"
            />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex items-center"
            >
              <div className={`${stat.color} text-white p-4 rounded-full mr-4`}>
                {stat.icon}
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                <p className="text-2xl font-semibold text-[#333333]">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#333333] mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div
                  key={booking.booking_id}
                  className="border-b pb-3 last:border-0"
                >
                  <p className="text-gray-700">
                    New booking confirmed for {booking.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.booking_date).toLocaleDateString()}{" "}
                    {booking.start_time} - {booking.end_time}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent bookings found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AdminDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        admin={admin}
        setAdmin={setAdmin}
      />
    </div>
  );
};

export default AdminDashboard;
