import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BASE_URL } from "../../config/apiConfig";

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
          `${BASE_URL}/api/categories/${categoryId}/dishes`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        if (result.success) {
          setCategory(result.data.category);
          setDishes(result.data.dishes);
        } else {
          throw new Error(result.message || "Failed to fetch dishes");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchDishesByCategory();
  }, [categoryId]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#FFFFE0] p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B]"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#FFFFE0] p-8 text-center">
        <p className="text-red-600 text-lg mb-4">Error: {error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Back to Categories
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FFFFE0] font-['Playfair_Display'] mt-16 pt-2 pb-4 ">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 py-6 flex items-center justify-center">
        <button
          onClick={() => navigate("/", { state: { scrollTo: "categories" } })}
          className="absolute left-2 md:left-4 flex items-center text-[#F59E0B] hover:text-[#d97706] transition-colors"
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

      {/* Dishes Grid */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        {dishes.length === 0 ? (
          <div className="text-center py-8 text-[#333333] text-lg">
            No dishes found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                className="relative bg-white border border-[#F4C430] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src={dish.dish_image}
                  alt={dish.name || "Dish image"}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/images/placeholder.jpg";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-[#333333] text-xl font-semibold mb-1">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-[#F59E0B]">{dish.cuisine_type}</p>
                  <p className="text-[#333333] mt-1 font-semibold">LKR {dish.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dishes;
