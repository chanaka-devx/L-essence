import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [dateFilter, setDateFilter] = useState("upcoming");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [updatingBooking, setUpdatingBooking] = useState(null);

  // Fetch bookings from API
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5176/api/bookings/all");
      let data = res.data.bookings || [];

      // Apply filters client-side
      data = data.filter((booking) => {
        const bookingDate = dayjs(booking.booking_date).startOf("day");
        const today = dayjs().startOf("day");

        // Date filtering
        switch (dateFilter) {
          case "today":
            if (!bookingDate.isSame(today, "day")) return false;
            break;
          case "yesterday":
            if (!bookingDate.isSame(today.subtract(1, "day"), "day")) return false;
            break;
          case "tomorrow":
            if (!bookingDate.isSame(today.add(1, "day"), "day")) return false;
            break;
          case "upcoming":
            if (!bookingDate.isAfter(today, "day")) return false;
            break;
          default:
            break;
        }

        // Status filtering
        if (statusFilter !== "all") {
          return booking.status?.toLowerCase() === statusFilter.toLowerCase();
        } else {
          // Default: pending & confirmed only
          return ["pending", "confirmed"].includes(booking.status?.toLowerCase());
        }
      });

      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
    setLoading(false);
  };

  //====================================================================================
  // Update booking status
  const updateBookingStatus = async (bookingId, newStatus) => {
    setUpdatingBooking(bookingId);
    try {
      const response = await axios.put(
        `http://localhost:5176/api/bookings/${bookingId}/status`,
        { status: newStatus }
      );

      if (response.data.success) {
        // Update the booking in the local state
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.booking_id === bookingId 
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        console.log("Booking status updated successfully");
      }
    } catch (err) {
      console.error("Error updating booking status:", err);
      alert("Failed to update booking status. Please try again.");
    } finally {
      setUpdatingBooking(null);
      alert("Booking status updated successfully");
    }
  };

  // Handle confirm booking
  const handleConfirm = (bookingId) => {
    if (window.confirm("Are you sure you want to confirm this booking?")) {
      updateBookingStatus(bookingId, "confirmed");
    }
  };

  // Handle cancel booking
  const handleCancel = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      updateBookingStatus(bookingId, "cancelled");
    }
  };

  // Handle complete booking
  const handleComplete = (bookingId) => {
    if (window.confirm("Mark this booking as completed?")) {
      updateBookingStatus(bookingId, "completed");
    }
  };

  // Render action buttons based on booking status
  const renderActionButtons = (booking) => {
    const isUpdating = updatingBooking === booking.booking_id;

    if (booking.status?.toLowerCase() === "pending") {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleConfirm(booking.booking_id)}
            disabled={isUpdating}
            className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "..." : "Confirm"}
          </button>
          <button
            onClick={() => handleCancel(booking.booking_id)}
            disabled={isUpdating}
            className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "..." : "Cancel"}
          </button>
        </div>
      );
    } else if (booking.status?.toLowerCase() === "confirmed") {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleComplete(booking.booking_id)}
            disabled={isUpdating}
            className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "..." : "Complete"}
          </button>
        </div>
      );
    } else {
      // For completed, cancelled, or other statuses, show no buttons
      return (
        <div className="text-gray-400 text-xs">
          No actions
        </div>
      );
    }
  };
//==============================================================================================

  // Refetch when filters change
  useEffect(() => {
    fetchBookings();
  }, [dateFilter, statusFilter]);

  return (
  <div className="bg-[#FFFFE0] min-h-screen mt-10 pt-12 pb-10 px-6 font-['Playfair_Display']">
    {/* Header */}
    <div className="pr-4 flex justify-between items-center mb-6">
      <h2 className="pl-4 text-2xl font-semibold text-[#333333]">All Bookings</h2>
    </div>

    {/* Filters */}
    <div className="mb-6 flex flex-wrap gap-4 px-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-[#333333] mb-2">Filter by Date</label>
        <select 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-[#F4C430] rounded-md bg-white text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
        >
          <option value="yesterday">Yesterday</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="upcoming">Upcoming</option>
          <option value="all">All Dates</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-[#333333] mb-2">Filter by Status</label>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-[#F4C430] rounded-md bg-white text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
        >
          <option value="all">Pending & Confirmed (default)</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    {/* Bookings Table */}
    <div className="max-w-7xl mx-auto">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="bg-white border border-[#F4C430] rounded-lg px-6 py-4">
            <p className="text-[#333333] text-lg">Loading bookings...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-[#F4C430] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#F4C430]">
              <thead className="bg-[#F4C430]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">
                    Time Slot
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">
                    Table Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">
                    Seats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#333333] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <tr key={b.booking_id} className="hover:bg-[#FDF6E3] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#333333]">
                        #{b.booking_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">
                        {dayjs(b.booking_date).format("YYYY-MM-DD")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">
                        {b.start_time} - {b.end_time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">
                        {b.customer_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#666666]">
                        {b.customer_phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">
                        {b.table_location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">
                        {b.table_seats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          b.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          b.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          b.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {renderActionButtons(b)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center">
                      <div className="text-[#666666]">
                        <p className="text-lg mb-2">No bookings found</p>
                        <p className="text-sm">Try adjusting your filters to see more results.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default AdminBookings;
