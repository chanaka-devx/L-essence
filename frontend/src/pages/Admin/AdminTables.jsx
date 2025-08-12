import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import AddTableModal from "../../models/AddTableModel";
import UpdateTableModal from "../../models/UpdateTableModel";

const AdminTables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  // Fetch all tables
  const fetchTables = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5176/api/tables");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch tables");
      setTables(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this table?")) return;

    try {
      const res = await fetch(`http://localhost:5176/api/tables/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete table");

      // Refresh list
      fetchTables();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (table) => {
    setSelectedTable(table);
    setIsUpdateModalOpen(true);
  };

  // Callbacks from modals after add or update
  const handleTableAdded = () => {
    setIsAddModalOpen(false);
    fetchTables();
  };

  const handleTableUpdated = () => {
    setIsUpdateModalOpen(false);
    setSelectedTable(null);
    fetchTables();
  };

  return (
    <div className="bg-[#FFFFE0] min-h-screen mt-10 pt-12 px-6 font-['Playfair_Display']">
      <div className="pr-4 flex justify-between items-center mb-6">
        <h2 className="pl-4 text-2xl font-semibold text-[#333333]">
          All Tables ({tables.length} tables)
        </h2>
        <button
          className="bg-[#F59E0B] text-white px-4 py-2 rounded hover:bg-[#e18f06] transition flex items-center gap-1"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FiPlus />
          Add a Table
        </button>
      </div>

      {loading ? (
        <p className="text-center text-[#333333]">Loading tables...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : tables.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#333333] text-lg">No tables found.</p>
          <p className="text-[#666666] text-sm">Start by adding your first table.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {tables.map((table) => (
            <div
              key={table.table_id}
              className="relative bg-white border border-[#F4C430] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center space-x-1 absolute top-2 right-2 z-10">
                <button
                  onClick={() => handleEdit(table)}
                  className="p-1.5 bg-white rounded-full hover:bg-gray-100 transition-all"
                  title="Edit Table"
                >
                  <FiEdit className="text-black" size={20} />
                </button>

                <button
                  onClick={() => handleDelete(table.table_id)}
                  className="p-1.5 bg-white rounded-full hover:bg-gray-100 transition-all"
                  title="Delete Table"
                >
                  <FiTrash className="text-black" size={20} />
                </button>
              </div>

              <img
                src={table.table_image }
                alt={`Table at ${table.location}`}
                className="w-full h-36 object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/placeholder.jpg";
                }}
              />

              <div className="p-4">
                <h3 className="text-[#333333] text-lg font-medium">
                  Location: {table.location}
                </h3>
                <p className="text-[#333333] mt-1">Seats: {table.seats}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Table Modal */}
      <AddTableModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onTableAdded={handleTableAdded}
      />

      {/* Update Table Modal */}
      <UpdateTableModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedTable(null);
        }}
        table={selectedTable}
        onTableUpdated={handleTableUpdated}
      />
    </div>
  );
};

export default AdminTables;
