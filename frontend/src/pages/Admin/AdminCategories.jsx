import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "../../models/AddCategoryModel";
import UpdateCategoryModal from "../../models/UpdateCategoryModel";
import {FaArrowRight} from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { BASE_URL } from "../../config/apiConfig";

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryDishCounts, setCategoryDishCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/categories`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setCategories(result.data);
        fetchCategoryDishCounts(result.data);
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

  useEffect(() => {
    fetchCategories();
  }, []); 
  
  // Fetch dish counts for each category
  const fetchCategoryDishCounts = async (categoryList) => {
    try {
      const countsData = {};
      
      for (const category of categoryList) {
        const response = await fetch(`${BASE_URL}/api/categories/${category.id}/dishes/count`);
        
        if (response.ok) {
          const result = await response.json();
          countsData[category.id] = result.count || 0;
        } else {
          countsData[category.id] = 0;
        }
      }
      
      setCategoryDishCounts(countsData);
    } catch (err) {
      console.error("Error fetching dish counts:", err);
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchCategories();
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
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      setSelectedCategory(category);
      setIsUpdateModalOpen(true);
    }
  };

  // Handle category addition
  const handleCategoryAdded = () => {
    fetchCategories();
  };

  // Handle category update
  const handleCategoryUpdated = () => {
    fetchCategories();
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#FFFFE0] min-h-screen mt-10 pt-10 px-6 font-['Playfair_Display']">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B]"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#FFFFE0] min-h-screen mt-10 pt-10 px-6 font-['Playfair_Display']">
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
    <div className="bg-[#FFFFE0] min-h-screen mt-10 pt-12 pb-10 px-6 font-['Playfair_Display']">
      {/* Header */}
      <div className="pr-4 flex justify-between items-center mb-6">
        <h2 className="pl-4 text-2xl font-semibold text-[#333333]">Food Categories</h2>
        <button 
          className="bg-[#F59E0B] text-white px-4 py-2 rounded hover:bg-[#e18f06] transition"
          onClick={() => setIsModalOpen(true)}
        >
          Add Category
        </button>
        <AddCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>

      {/* Category List */}
      <div className="space-y-4 max-w-6xl mx-auto">
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#333333] text-lg">No categories found.</p>
            <p className="text-[#666666] text-sm">Start by adding your first category.</p>
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between border border-[#F4C430] bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {/* Category Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F4C430] flex-shrink-0">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/placeholder.jpg'; // Fallback image
                    }}
                  />
                </div>
                
                {/* Category Info */}
                <div>
                  <h3 className="text-[#333333] font-medium text-lg">{cat.name}</h3>
                  <p className="text-[#666666] text-sm">{cat.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#666666] bg-[#F4C430] px-2 py-1 rounded">
                  {categoryDishCounts[cat.id] !== undefined ? categoryDishCounts[cat.id] : '...'} Dishes
                </span>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => handleEditCategory(cat.id, e)}
                    className="text-[#333333] hover:text-[#F59E0B] transition p-2 hover:bg-[#FDF6E3] rounded"
                    title="Edit Category"
                  >
                    <FiEdit />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-[#333333] hover:text-red-500 transition p-2 hover:bg-red-50 rounded"
                    title="Delete Category"
                  >
                    <FiTrash />
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
      {/* Modals */}
      <AddCategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onCategoryAdded={handleCategoryAdded}
      />
      
      <UpdateCategoryModal 
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
        onCategoryUpdated={handleCategoryUpdated}
      />
    </div>
  );
};

export default AdminCategories;
