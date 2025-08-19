import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/apiConfig";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/api/categories`);

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const result = await response.json();

      if (result.success) {
        setCategories(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryClick = (categoryId) => {
    window.scrollTo(0, 0);
    navigate(`/categories/${categoryId}/dishes`);
  };

  // Skeleton Loader (instead of spinner)
  if (loading) {
    return (
      <section id="categories" className="bg-[#FFFFE0] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-semibold text-[#333333] mb-10">
            Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="animate-pulse bg-white border border-[#F4C430] rounded-lg h-64"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="categories" className="bg-[#FFFFE0] py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-semibold text-[#333333] mb-10">
            Categories
          </h2>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading categories: {error}</p>
            <button
              onClick={fetchCategories}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Success state
  return (
    <section id="categories" className="bg-[#FFFFE0] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-playfair font-semibold text-[#333333] mb-10">
          Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              role="button"
              tabIndex={0}
              onClick={() => handleCategoryClick(cat.id)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleCategoryClick(cat.id)
              }
              className="cursor-pointer bg-white border border-[#F4C430] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name || "Category image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold font-playfair text-[#333333] mb-2">
                  {cat.name}
                </h3>
                <p className="text-[#333333] text-sm line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
