import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateUserModal from "../../models/UpdateUserModal";
import { BASE_URL } from "../../config/apiConfig";

const MyBookings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      if (err.response?.status === 401) navigate("/userlogin");
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}/api/users/me/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      if (err.response?.status === 401) navigate("/userlogin");
      else setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/userlogin");
      return;
    }

    const loadData = async () => {
      await Promise.all([fetchUserProfile(), fetchBookings()]);
    };

    loadData();
  }, [token, navigate]);

  const handleUpdateUser = async (updatedData) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/users/me`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.message);
      setUser(updatedData);
      setModalOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    navigate("/userlogin");
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.put(
        `${BASE_URL}/api/bookings/${bookingId}/status`,
        { status: "Cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings((prev) =>
        prev.map((b) => (b.booking_id === bookingId ? { ...b, status: "Cancelled" } : b))
      );

      alert("Booking cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  const renderStatusBadge = (status) => {
    const statusStyles = {
      Confirmed: "text-green-600 bg-green-100",
      Pending: "text-yellow-800 bg-yellow-100",
      Cancelled: "text-red-800 bg-red-100",
      Completed: "text-blue-800 bg-blue-100",
    };
    return (
      <div className={`px-4 py-2 rounded-lg font-medium ${statusStyles[status] || "text-gray-800 bg-gray-100"}`}>
        {status === "Completed" ? "✓ Completed" : status === "Cancelled" ? "✗ Cancelled" : status}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FFFFE0] mt-16 p-4">
      {/* Left: User Details */}
      <div className="md:w-1/4 h-96 bg-white shadow-md rounded-lg p-6 flex flex-col items-center mb-6 md:mb-0 m-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h1>
        <div className="w-16 h-16 bg-gold text-white rounded-full flex items-center justify-center text-2xl font-bold">
          {user ? user.name[0].toUpperCase() : "A"}
        </div>
        <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-gray-600 mt-1">{user?.phone}</p>

        <button
          className="mt-6 px-4 py-2 bg-gold text-white rounded hover:bg-yellow-500 transition w-full"
          onClick={() => setModalOpen(true)}
        >
          Edit Profile
        </button>
        <button
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Right: Bookings */}
      <div className="md:w-3/4 bg-white shadow-md rounded-lg p-6 flex flex-col m-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
          <button
            onClick={fetchBookings}
            className="px-4 py-2 bg-gold text-white rounded hover:bg-yellow-500 transition"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32 text-gray-600">Loading bookings...</div>
        ) : error ? (
          <div className="text-red-600 text-center py-8">
            <p>{error}</p>
            <button
              onClick={fetchBookings}
              className="mt-2 px-4 py-2 bg-gold text-white rounded hover:bg-yellow-500 transition"
            >
              Retry
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No bookings found.</p>
            <p className="mt-2 text-gray-400">Your future reservations will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[70vh]">
            {bookings.map((booking) => (
              <div key={booking.booking_id} className="bg-gray-50 p-4 rounded-lg shadow border flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{booking.location} Table</h3>
                  <p className="text-gray-600 mt-1">
                    {formatDate(booking.booking_date)} at {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                  </p>
                  <p className={`mt-2 font-semibold ${booking.status === "Confirmed" ? "text-green-600" : ""}`}>
                    Status: {booking.status}
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  {booking.status === "Confirmed" || booking.status === "Pending" ? (
                    <button
                      onClick={() => cancelBooking(booking.booking_id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-medium shadow-sm"
                    >
                      Cancel Booking
                    </button>
                  ) : (
                    renderStatusBadge(booking.status)
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {user && (
        <UpdateUserModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} user={user} onUpdate={handleUpdateUser} />
      )}
    </div>
  );
};

export default MyBookings;
