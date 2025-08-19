import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const ChefSpecials = () => {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChefSpecials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      //Get all categories
      const categoriesRes = await axios.get("http://localhost:5176/api/categories");
      const categories = categoriesRes.data.data;

      const chefSpecialCategory = categories.find(
        (cat) => cat.name.toLowerCase() === "chef's specials"
      );

      if (!chefSpecialCategory) {
        setError("Chef's Specials category not found.");
        return;
      }

      //Fetch dishes for that category ID
      const dishesRes = await axios.get(
        `http://localhost:5176/api/categories/${chefSpecialCategory.id}/dishes`
      );
      const dishes = dishesRes.data.data.dishes || [];

      //Sort dishes last 3
      const sortedDishes = dishes.sort((a, b) => b.id - a.id);
      const latestThreeDishes = sortedDishes.slice(0, 3);

      setSpecials(latestThreeDishes);
    } catch (err) {
      console.error("Error fetching Chef Specials:", err);
      setError("Failed to load Chef's Specials. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChefSpecials();
  }, [fetchChefSpecials]);

  return (
    <section className="bg-[#2C3E50] py-16 px-4">
      <h2 className="text-white text-3xl font-semibold font-playfair text-center mb-10">
        Chef’s Specials
      </h2>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="animate-pulse bg-[#2C3E50] rounded-lg border border-[#F4C430] h-64"
            ></div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-400 font-semibold">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && specials.length === 0 && !error && (
        <p className="text-center text-gray-300">No Chef's Specials available at the moment.</p>
      )}

      {/* Specials Grid */}
      {!loading && specials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {specials.map((item) => (
            <div
              key={item.id}
              className="bg-[#2C3E50] rounded-lg overflow-hidden border border-[#F4C430] hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={item.dish_image}
                alt={item.name || "Special dish"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white text-xl font-semibold font-playfair mb-2">
                  {item.name}
                </h3>
                <p className="text-[#F4C430] font-semibold font-playfair">
                  LKR {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ChefSpecials;
