import React, { useEffect, useState } from "react";
import axios from "axios";

const ChefSpecials = () => {
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    const fetchChefSpecials = async () => {
      try {
        // Step 1: Get all categories
        const categoriesRes = await axios.get("http://localhost:5176/api/categories");
        const categories = categoriesRes.data.data;

        // Step 2: Find the category named "Chef Special"
        const chefSpecialCategory = categories.find(cat =>
          cat.name.toLowerCase() === "chef special"
        );

        if (!chefSpecialCategory) {
          console.warn("Chef Special category not found.");
          return;
        }

        // Step 3: Fetch dishes for that category ID
        const dishesRes = await axios.get(`http://localhost:5176/api/categories/${chefSpecialCategory.id}/dishes`);
        const dishes = dishesRes.data.data.dishes;

        // Step 4: Sort dishes by ID or any other logic if required
        const sortedDishes = dishes.sort((a, b) => a.id - b.id);

        // Step 5: Set to state
        setSpecials(sortedDishes);
      } catch (error) {
        console.error("Error fetching Chef Specials:", error);
      }
    };

    fetchChefSpecials();
  }, []);

  return (
    <div className="bg-[#2C3E50] py-16 px-4">
      <h2 className="text-white text-3xl font-semibold font-playfair text-center mb-10">
        Chef’s Specials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {specials.map((item) => (
          <div
            key={item.id}
            className="bg-[#2C3E50] rounded-lg overflow-hidden border border-[#F4C430] hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={item.dish_image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-white text-xl font-semibold font-playfair mb-2">
                {item.name}
              </h3>
              <p className="text-[#F4C430] font-semibold font-playfair">LKR {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefSpecials;
