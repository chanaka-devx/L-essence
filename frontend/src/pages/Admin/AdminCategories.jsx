import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5176/api/categories");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
    };

    fetchCategories();
  }, []);

  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`http://localhost:5176/api/categories/${categoryId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setCategories(categories.filter(cat => cat.id !== categoryId));
        } else {
          throw new Error('Failed to delete category');
        }
      } catch (err) {
        console.error('Error deleting category:', err);
        alert('Failed to delete category');
      }
    }
  };

  // Handle edit category
  const handleEditCategory = (categoryId, e) => {
    e.stopPropagation(); // Prevent tile click when editing
    alert(`Edit category ID: ${categoryId}`);
    // TODO: Navigate to edit page or open modal
  };

  // Handle navigate to category dishes
  const handleNavigateToCategory = (categoryId, categoryTitle) => {
    console.log(`Navigating to ${categoryTitle} dishes (ID: ${categoryId})`);
    navigate(`/admin/categories/${categoryId}/dishes`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#FDF6E3] min-h-screen mt-10 pt-10 px-6 font-['Playfair_Display']">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B]"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#FDF6E3] min-h-screen mt-10 pt-10 px-6 font-['Playfair_Display']">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading categories: {error}</p>
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
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#333333] text-lg">No categories found.</p>
            <p className="text-[#666666] text-sm">Start by adding your first category.</p>
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleNavigateToCategory(cat.id, cat.title)}
              className="flex items-center justify-between border border-[#F4C430] bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {/* Category Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F4C430] flex-shrink-0">
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/placeholder.jpg'; // Fallback image
                    }}
                  />
                </div>
                
                {/* Category Info */}
                <div>
                  <h3 className="text-[#333333] font-medium text-lg">{cat.title}</h3>
                  <p className="text-[#666666] text-sm">{cat.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#666666] bg-[#F4C430] px-2 py-1 rounded">
                  12 Dishes
                </span>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => handleEditCategory(cat.id, e)}
                    className="text-[#333333] hover:text-[#F59E0B] transition p-2 hover:bg-[#FDF6E3] rounded"
                    title="Edit Category"
                  >
                    <FaEdit />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-[#333333] hover:text-red-500 transition p-2 hover:bg-red-50 rounded"
                    title="Delete Category"
                  >
                    <FaTrash />
                  </button>
                  
                  <button
                    onClick={() => navigate(`/admin/categories/${cat.id}/dishes`)}
                    className="text-[#333333] hover:text-[#F59E0B] transition p-2 hover:bg-[#FDF6E3] rounded"
                    title="View Dishes"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
