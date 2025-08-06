import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AdminDishesById = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishesByCategory = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5176/api/categories/${categoryId}/dishes`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setCategory(result.data.category);
          setDishes(result.data.dishes);
        } else {
          throw new Error(result.message || "Failed to fetch dishes");
        }
      } catch (err) {
        console.error("Error fetching dishes by category:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (categoryId) {
      fetchDishesByCategory();
    }
  }, [categoryId]);

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
    alert(`Edit dish ID: ${dishId}`);
    // TODO: Navigate to edit dish page or open modal
    // navigate(`/admin/dishes/${dishId}/edit`);
  };

  // Handle add new dish
  const handleAddDish = () => {
    alert(`Add new dish to category: ${category?.title}`);
    // TODO: Navigate to add dish page or open modal
    // navigate(`/admin/categories/${categoryId}/dishes/new`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF6E3] p-8 font-['Playfair_Display']">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B]"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#FDF6E3] p-8 font-['Playfair_Display']">
        <div className="mt-20 max-w-5xl mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading dishes: {error}</p>
            <button
              onClick={() => navigate("/admin/categories")}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Back to Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6E3] mt-10 pt-10 p-8 font-['Playfair_Display']">
      <div className=" mx-auto">
        {/* Header with Category Info */}
        <div className="max-w-7xl pt-2 mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/admin/categories")}
              className="text-[#333333] hover:text-[#F59E0B] transition p-2 hover:bg-[#FDF6E3] rounded"
              title="Back to Categories"
            >
              <FaArrowLeft size={20} />
            </button>

            {category && (
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#F4C430]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/assets/images/placeholder.jpg";
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-[#333333]">
                    {category.title}
                  </h1>
                  <span className="text-sm text-[#666666] bg-[#F4C430] px-2 py-1 rounded">
                    {dishes.length} Dishes
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleAddDish}
              className="bg-[#F59E0B] text-white px-4 py-2 rounded hover:bg-[#e18f06] transition flex items-center gap-2"
            >
              <FaPlus />
              Add Dish
            </button>
          </div>
        </div>

        {/* Dishes List */}
        <div className="max-w-6xl pt-2 mx-auto">
          <div className="space-y-4">
            {dishes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#333333] text-lg">
                  No dishes found in this category.
                </p>
                <p className="text-[#666666] text-sm">
                  Start by adding your first dish.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-white border border-[#F4C430] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    {/* Dish Image */}
                    <img
                      src={dish.dish_image}
                      alt={dish.name}
                      className="w-full h-36 object-cover"
                      onError={(e) => {
                        e.target.src = "/assets/images/placeholder.jpg";
                      }}
                    />

                    {/* Dish Info */}
                    <div className="p-4">
                      <h3 className="text-[#333333] text-lg font-medium">
                        {dish.name}
                      </h3>
                      <p className="text-[#333333] mt-1">LKR {dish.price}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2 p-4">
                      <button
                        onClick={() => handleEditDish(dish.id)}
                        className="w-16 text-[#333333] bg-[#F4C430] transition p-2 hover:bg-[#F59E0B] rounded font-medium"
                        title="Edit Dish"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteDish(dish.id)}
                        className="w-16 text-[#333333] bg-red-500 hover:bg-red-600 transition p-2 rounded font-medium"
                        title="Delete Dish"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDishesById;
