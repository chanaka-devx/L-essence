import React, { useEffect, useState } from "react";
import AddDishModal from "../../models/AddDishModel";
import UpdateDishModal from "../../models/UpdateDishModel";
import { FiEdit, FiTrash } from "react-icons/fi";

const AdminDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    const fetchAllDishes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5176/api/dishes");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setDishes(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch dishes");
        }
      } catch (err) {
        console.error("Error fetching dishes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDishes();
  }, []);

  // Handle delete dish
  const handleDeleteDish = async (dishId) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        const response = await fetch(
          `http://localhost:5176/api/dishes/${dishId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setDishes(dishes.filter((dish) => dish.id !== dishId));
        } else {
          throw new Error("Failed to delete dish");
        }
      } catch (err) {
        console.error("Error deleting dish:", err);
        alert("Failed to delete dish");
      }
    }
  };

  // Handle edit dish
  const handleEditDish = (dishId) => {
    console.log("Editing dish:", dishId);
    setSelectedDish(dishId);
    setIsUpdateModalOpen(true);
  };

  // Handle dish added
  const handleDishAdded = (newDish) => {
    setDishes((prev) => [...prev, newDish]);
  };

  // Handle dish updated
  const handleDishUpdated = (updatedDish) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.id === updatedDish.id ? updatedDish : dish
      )
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#FFFFE0] min-h-screen mt-10py-12 px-6 font-['Playfair_Display']">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B]"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#FFFFE0] min-h-screen mt-10 py-12 px-6 font-['Playfair_Display']">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading dishes: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFE0] min-h-screen mt-10 py-12 px-6 font-['Playfair_Display']">
      <div className="pr-4 flex justify-between items-center mb-6">
        <h2 className="pl-4 text-2xl font-semibold text-[#333333]">
          All Dishes ({dishes.length} dishes)
        </h2>
        <button
          className="bg-[#F59E0B] text-white px-4 py-2 rounded hover:bg-[#e18f06] transition"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add a Dish
        </button>
        {/* Add Dish Modal */}
        <AddDishModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onDishAdded={handleDishAdded}
        />
        {/* Update Dish Modal */}
        <UpdateDishModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedDish(null);
          }}
          dish={selectedDish}
          onDishUpdated={handleDishUpdated}
        />
      </div>

      {dishes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#333333] text-lg">No dishes found.</p>
          <p className="text-[#666666] text-sm">
            Start by adding your first dish.
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="relative bg-white border border-[#F4C430] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center space-x-1 absolute top-2 right-2">
                <button
                  onClick={() => handleEditDish(dish.id)}
                  className="p-1.5 bg-white rounded-full hover:bg-gray-100 transition-all"
                >
                  <FiEdit className="text-black" size={20} />
                </button>

                <button
                  onClick={() => handleDeleteDish(dish.id)}
                  className="p-1.5 bg-white rounded-full hover:bg-gray-100 transition-all"
                >
                  <FiTrash className="text-black" size={20} />
                </button>
              </div>
              <img
                src={dish.dish_image}
                alt={dish.name}
                className="w-full h-36 object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/placeholder.jpg"; // Fallback image
                }}
              />
              <div className="p-4">
                <h3 className="text-[#333333] text-lg font-medium">
                  {dish.name}
                </h3>
                <p className="text-[#333333] mt-1">LKR {dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDishes;
