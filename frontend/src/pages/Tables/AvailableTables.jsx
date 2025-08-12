import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Search,
  MapPin,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Coffee,
  Utensils,
} from "lucide-react";

const AvailableTables = () => {
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Fetch time slots on component mount
  useEffect(() => {
    fetch("http://localhost:5176/api/timeslots")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTimeSlots(data.timeslots);
        } else {
          setError("Failed to load time slots");
        }
      })
      .catch(() => setError("Failed to load time slots"));
  }, []);

  const handleSearch = async () => {
    setError("");
    setAvailableTables([]);
    setSelectedTable(null);

    if (!date || !selectedTimeSlot) {
      setError("Please select date and time slot");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5176/api/tables/available?date=${date}&timeslot_id=${selectedTimeSlot}`
      );
      const data = await response.json();

      if (response.ok) {
        setAvailableTables(data.availableTables || []);
        if (!data.availableTables || data.availableTables.length === 0) {
          setError("No tables available for this date and time slot.");
        }
      } else {
        setError(data.error || "Failed to fetch available tables");
      }
    } catch {
      setError("Failed to fetch available tables");
    } finally {
      setLoading(false);
    }
  };

  const getTableIcon = (capacity) => {
    if (capacity <= 2) return <Coffee className="w-5 h-5" />;
    if (capacity <= 4) return <Users className="w-5 h-5" />;
    return <Utensils className="w-5 h-5" />;
  };

  const getTableTypeLabel = (capacity) => {
    if (capacity <= 2) return "Intimate";
    if (capacity <= 4) return "Standard";
    if (capacity <= 6) return "Family";
    return "Large Group";
  };

  const selectedTimeSlotData = timeSlots.find(
    (slot) => slot.timeslot_id.toString() === selectedTimeSlot
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 font-['Playfair_Display'] mb-2">
            Find Your Perfect Table
          </h1>
          <p className="text-gray-600 text-lg">
            Discover available tables for your dining experience
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Selection */}
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  className="w-full p-3 border border-[#F4C430] rounded focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2">
                <label
                  htmlFor="timeslot"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  Select Time Slot
                </label>
                <select
                  id="timeslot"
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full p-3 border border-[#F4C430] rounded focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Choose your preferred time...</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.timeslot_id} value={slot.timeslot_id}>
                      {slot.start_time} - {slot.end_time}
                    </option>
                  ))}
                </select>
              </div>
              
            </div>{/* Search Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleSearch}
                  className="bg-[#F59E0B] text-white py-4 px-5 rounded-md font-semibold text-lg hover:bg-[#e18f06] transition flex items-center space-x-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Find Available Tables</span>
                    </>
                  )}
                </button>
              </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 rounded-r-xl">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-400 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {availableTables.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Available Tables
                </h3>
                <p className="text-gray-600 mt-1">
                  {availableTables.length} table
                  {availableTables.length !== 1 ? "s" : ""} available
                  {selectedTimeSlotData &&
                    ` for ${selectedTimeSlotData.start_time} - ${selectedTimeSlotData.end_time}`}
                  {date &&
                    ` on ${new Date(date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}`}
                </p>
              </div>
              <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span className="font-medium">
                  {availableTables.length} Available
                </span>
              </div>
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTables.map((table) => (
                <div
                  key={table.table_id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 ${
                    selectedTable?.table_id === table.table_id
                      ? "border-orange-400 bg-orange-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-orange-300"
                  }`}
                  onClick={() =>
                    setSelectedTable(
                      selectedTable?.table_id === table.table_id ? null : table
                    )
                  }
                >
                  {/* Table Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedTable?.table_id === table.table_id
                            ? "bg-orange-200 text-orange-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {getTableIcon(table.seats)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">
                          Table {table.location}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {getTableTypeLabel(table.seats)}
                        </span>
                      </div>
                    </div>
                    {selectedTable?.table_id === table.table_id && (
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Table Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Capacity
                      </span>
                      <span className="font-semibold text-gray-800">
                        {table.seats} guests
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location
                      </span>
                      <span className="font-semibold text-gray-800">
                        Section {table.location}
                      </span>
                    </div>

                    {/* Availability Badge */}
                    <div className="pt-2">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Available Now
                      </div>
                    </div>
                  </div>

                  {/* Selection Hint */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      {selectedTable?.table_id === table.table_id
                        ? "Selected"
                        : "Click to select this table"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            {selectedTable && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Reserve Table {selectedTable.location}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* No Results State */}
        {!loading &&
          availableTables.length === 0 &&
          !error &&
          date &&
          selectedTimeSlot && (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Tables Available
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                Unfortunately, no tables are available for your selected date
                and time.
              </p>
              <p className="text-gray-500">
                Try selecting a different date or time slot, or contact us for
                assistance.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default AvailableTables;
