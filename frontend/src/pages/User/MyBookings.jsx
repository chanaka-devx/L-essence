import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateUserModal from "../../models/UpdateUserModal";

const MyBookings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5176/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      if (err.response && err.response.status === 401) {
        navigate("/userlogin");
      }
    }
  };

  // Fetch user bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        "http://localhost:5176/api/users/me/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.bookings) {
        setBookings(res.data.bookings);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      if (err.response && err.response.status === 401) {
        navigate("/userlogin");
      } else {
        setError("Failed to load bookings. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
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

  // Update user profile
  const handleUpdateUser = async (updatedData) => {
    try {
      const res = await axios.put(
        "http://localhost:5176/api/users/me",
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
    localStorage.removeItem("user");
    navigate("/userlogin");
  };

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axios.put(
        `http://localhost:5176/api/bookings/${bookingId}/status`,
        { status: "Cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the local state
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_id === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );

      alert("Booking cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time helper function
  const formatTime = (timeString) => {
    if (!timeString) return "";
    // Handle different time formats
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex h-screen bg-[#FFFFE0] mt-20">
      {/* Left: User Details */}
      <div className="w-1/5 h-3/5 bg-white shadow-md mt-8 ml-6 rounded-lg flex flex-col items-center justify-center font-['Playfair_Display']">
        <div className="w-24 h-24 bg-gold text-white rounded-full flex items-center justify-center text-2xl font-bold">
          {user ? user.name[0].toUpperCase() : "A"}
        </div>
        <h2 className="mt-4 text-xl font-bold">{user?.name }</h2>
        <p className="text-gray-600">{user?.email }</p>
        <p className="text-gray-600 mt-1">{user?.phone }</p>

        <button
          className="mt-6 px-4 py-2 bg-gold text-white rounded hover:bg-yellow-500 transition"
          onClick={() => setModalOpen(true)}
        >
          Edit Profile
        </button>

        <button
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Right: Booking Details */}
      <div className="w-4/5 h-4/5 bg-white shadow-md m-8 rounded-lg flex flex-col">
        <div className="w-full p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 font-['Playfair_Display']">My Bookings</h2>
            <button
              onClick={fetchBookings}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-lg text-gray-600">Loading bookings...</div>
            </div>
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
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.booking_id}
                  className="bg-gray-50 p-4 rounded-lg shadow border"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {booking.location} Table
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {formatDate(booking.booking_date)} at{" "}
                        {formatTime(booking.start_time)} -{" "}
                        {formatTime(booking.end_time)}
                      </p>
                      <p
                        className={`mt-2 font-semibold ${
                          booking.status === "Confirmed"
                            ? "text-green-600"
                            : booking.status === "Cancelled"
                            ? "text-red-600"
                            : booking.status === "Completed"
                            ? "text-blue-600"
                            : "text-yellow-600"
                        }`}
                      >
                        Status: {booking.status}
                      </p>
                    </div>

                    {/* Right side - Cancel button or status indicator */}
                    <div className="flex items-center ml-4">
                      {booking.status == "Confirmed" ||
                      booking.status == "Pending" ? (
                        <button
                          onClick={cancelBooking}
                          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium shadow-sm"
                        >
                          Cancel Booking
                        </button>
                      ) : booking.status == "Completed" ? (
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
                          ✓ Completed
                        </div>
                      ) : booking.status == "Cancelled" ? (
                        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-medium">
                          ✗ Cancelled
                        </div>
                      ) : (
                        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium">
                          {booking.status}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bookings found.</p>
              <p className="text-gray-400 mt-2">
                Your future reservations will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {user && (
        <UpdateUserModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          user={user}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default MyBookings;
