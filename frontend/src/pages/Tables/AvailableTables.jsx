import React, { useEffect, useState } from "react";

const AvailableTables = () => {
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setAvailableTables([]);

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

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Find Available Tables</h2>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div>
          <label htmlFor="date" className="block mb-1 font-medium">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full"
            min={new Date().toISOString().split("T")[0]} // prevent past dates
          />
        </div>

        <div>
          <label htmlFor="timeslot" className="block mb-1 font-medium">
            Select Time Slot
          </label>
          <select
            id="timeslot"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select a time slot --</option>
            {timeSlots.map((slot) => (
              <option key={slot.timeslot_id} value={slot.timeslot_id}>
                {slot.start_time} - {slot.end_time}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {availableTables.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Available Tables:</h3>
          <ul className="list-disc pl-5">
            {availableTables.map((table) => (
              <li key={table.table_id}>
                Table {table.location} — Capacity: {table.seats}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvailableTables;
