import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

const Dishes = () => {
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
              onClick={() => navigate("/")}
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
    <div className="mt-20 pt-2 min-h-screen bg-[#FFFFE0] font-['Playfair_Display']">
      <div></div>
      <div className=" mx-auto">
        {/* Header with Category Info */}
        <div className="relative max-w-7xl mx-auto px-4 py-6 flex items-center justify-center">
          <button
            onClick={() => {
              navigate("/", { state: { scrollTo: "categories" } });
            }}
            className="absolute left-4 flex items-center text-[#F59E0B] hover:text-[#d97706] transition-colors"
          >
            <FaArrowLeft className="mr-1" />
            Back to Categories
          </button>

          {category && (
            <h1 className="text-3xl font-semibold text-[#333333] text-center">
              {category.name}
            </h1>
          )}
        </div>

        {/* Dishes List */}
        <div className="max-w-6xl pt-2 mx-auto">
          <div className="space-y-4">
            {dishes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#333333] text-lg">
                  No dishes found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="relative bg-white border border-[#F4C430] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    {/* Dish Image */}
                    <img
                      src={dish.dish_image}
                      alt={dish.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "/assets/images/placeholder.jpg";
                      }}
                    />

                    {/* Dish Info */}
                    <div className="p-4">
                      <h3 className="text-[#333333] text-xl font-medium font-semibold">
                        {dish.name}
                      </h3>
                      <p className="text-sm text-[#F59E0B] mt-1">
                        {dish.cuisine_type}
                      </p>
                      <p className="text-[#333333] mt-1">LKR {dish.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add Dish Modal */}
    </div>
  );
};

export default Dishes;
