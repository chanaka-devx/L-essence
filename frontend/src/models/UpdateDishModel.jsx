import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config/apiConfig";

const UpdateDishModal = ({
  isOpen,
  onClose,
  dish,
  onDishUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    cuisine_type: '',
    categoryId: '',
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/categories`);
        if (response.ok) {
          const result = await response.json();
          setCategories(result.data || result);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Populate form when dish changes
  useEffect(() => {
    if (isOpen && dish?.id && dish?.name) {

      setFormData({
        name: dish.name || "",
        price: dish.price || "",
        cuisine_type: dish.cuisine_type || "",
        categoryId: dish.category_id || "",
        image: null,
      });
      setPreviewImage(dish.dish_image || "");
    }
  }, [dish, isOpen]);

if (!isOpen || !dish || typeof dish !== 'object') return null;


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      // Create preview URL for new image
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("cuisine_type", formData.cuisine_type);
      formDataToSend.append("category_id", formData.categoryId);
      if (formData.image) {
        formDataToSend.append("dish_image", formData.image);
      }

      const response = await fetch(
        `${BASE_URL}/api/dishes/${dish.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update dish");
      }

      const result = await response.json();
      console.log("API Response:", result);

      // Call callback if provided
      if (onDishUpdated) {
        const updatedDish = result.data || result;
        onDishUpdated(updatedDish);
      }

      // Close modal
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ 
      name: "", 
      price: "", 
      cuisine_type: "",
      categoryId: "", 
      image: null 
    });
    setPreviewImage("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-[#FFFFE0] border-2 border-[#F4C430] rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-center text-xl font-semibold mb-4">
          {dish && dish.name ? `Update ${dish.name}` : 'Update Dish'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Image Preview */}
          {previewImage && (
            <div className="text-center mb-4">
              <img
                src={previewImage}
                alt="Dish preview"
                className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-[#F4C430]"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dish Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cuisine Type
            </label>
            <input
              type="text"
              name="cuisine_type"
              value={formData.cuisine_type}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Image (optional)
            </label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to keep current image
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#F59E0B] text-white font-semibold rounded hover:opacity-90 transition"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDishModal;