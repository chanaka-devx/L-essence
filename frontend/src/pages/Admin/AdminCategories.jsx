import React, { useEffect, useState } from "react";
import {
  FaUtensils,
  FaDrumstickBite,
  FaCheese,
  FaIceCream,
  FaGlassMartiniAlt,
  FaLeaf,
  FaArrowRight
} from "react-icons/fa";

const categoryIcons = {
  Starters: <FaUtensils className="text-[#F59E0B] text-lg" />,
  "Main Courses": <FaDrumstickBite className="text-[#F59E0B] text-lg" />,
  "Side Dishes": <FaCheese className="text-[#F59E0B] text-lg" />,
  Desserts: <FaIceCream className="text-[#F59E0B] text-lg" />,
  Beverages: <FaGlassMartiniAlt className="text-[#F59E0B] text-lg" />,
  Salads: <FaLeaf className="text-[#F59E0B] text-lg" />
};

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories([
        "Starters",
        "Main Courses",
        "Side Dishes",
        "Desserts",
        "Beverages",
        "Salads"
      ]);
    }, 500);
  }, []);

  return (
    <div className="bg-[#FDF6E3] min-h-screen mt-10 pt-10 px-6 font-['Playfair_Display']">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#333333]">Food Categories</h2>
        <button className="bg-[#F59E0B] text-white px-4 py-2 rounded hover:bg-[#e18f06] transition">
          Add Category
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-4 max-w-5xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-[#F4C430] bg-white rounded px-4 py-3 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {categoryIcons[cat]}
              <h3 className="text-[#333333] font-medium">{cat}</h3>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-[#333333]">12 Dishes</span>
              <button
                onClick={() => alert(`Navigate to ${cat}`)}
                className="text-[#333333] hover:text-[#F59E0B] transition"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
