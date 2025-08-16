import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateUserModal from "../../models/UpdateUserModal";

const MyBookings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([
    {
      id: 1,
      table: "Table 5",
      date: "2025-08-20",
      time: "7:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      table: "Table 3",
      date: "2025-08-22",
      time: "8:30 PM",
      status: "Confirmed",
    },
    {
      id: 1,
      table: "Table 5",
      date: "2025-08-20",
      time: "7:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      table: "Table 3",
      date: "2025-08-22",
      time: "8:30 PM",
      status: "Confirmed",
    },
    {
      id: 1,
      table: "Table 5",
      date: "2025-08-20",
      time: "7:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      table: "Table 3",
      date: "2025-08-22",
      time: "8:30 PM",
      status: "Confirmed",
    },
    {
      id: 1,
      table: "Table 5",
      date: "2025-08-20",
      time: "7:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      table: "Table 3",
      date: "2025-08-22",
      time: "8:30 PM",
      status: "Confirmed",
    },
  ]);

  // Example user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+94 77 123 4567",
  });

  const handleUpdateUser = (updatedData) => {
    setUser(updatedData);
    // TODO: Call backend API to update user in DB
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    localStorage.removeItem("user"); // remove stored user info
    navigate("/userlogin"); // redirect to login page
  };

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
    );
  };

  const addBooking = () => {
    const newBooking = {
      id: Date.now(),
      table: "Table 7",
      date: "2025-08-25",
      time: "6:00 PM",
      status: "Confirmed",
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  return (
    <div className="flex h-screen bg-[#FFFFE0] mt-20">
      {/* Left: User Details */}
      <div className="w-1/5 h-3/5 bg-white shadow-md mt-8 ml-6 rounded-lg flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gold text-white rounded-full flex items-center justify-center text-2xl font-bold">
          JD
        </div>
        <h2 className="mt-4 text-xl font-bold">John Doe</h2>
        <p className="text-gray-600">john@example.com</p>
        <p className="text-gray-600 mt-1">+94 77 123 4567</p>

        {/* Edit Profile Button */}
        <button
          className="mt-6 px-4 py-2 bg-gold text-white rounded hover:bg-yellow-500 transition"
          onClick={() => setModalOpen(true)}
        >
          Edit Profile
        </button>

        {/* Logout Button */}
        <button className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Right: Booking Details */}
      <div className="w-4/5 h-4/5 bg-white shadow-md m-8 rounded-lg flex flex-col">
        <div className="w-full p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
            <button
              onClick={addBooking}
              className="bg-gold text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
            >
              Add New Booking
            </button>
          </div>

          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {booking.table}
                    </h3>
                    <p className="text-gray-600">
                      {booking.date} at {booking.time}
                    </p>
                    <p
                      className={`mt-1 font-semibold ${
                        booking.status === "Confirmed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                  {booking.status === "Confirmed" && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No bookings found.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default MyBookings;
