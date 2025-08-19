import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config/apiConfig";

const UpdateCategoryModal = ({
  isOpen,
  onClose,
  category,
  onCategoryUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Populate form when category changes
  useEffect(() => {
    if (isOpen && category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image: null,
      });
      setPreviewImage(category.image || "");
    }
  }, [category, isOpen]);

 
  if (!isOpen || !category) return null;

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
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch(
        `${BASE_URL}/api/categories/${category.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const result = await response.json();
      console.log("API Response:", result);

      // Call callback if provided
      if (onCategoryUpdated) {
        const updatedCategory = result.data || result;
        onCategoryUpdated(updatedCategory);
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
    setFormData({ name: "", description: "", image: null });
    setPreviewImage("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-[#FFFFE0] border-2 border-[#F4C430] rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-center text-xl font-semibold mb-4">
          {category ? `Update ${category.name}` : 'Update Category'}
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
                alt="Category preview"
                className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-[#F4C430]"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            />
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
              onClick={handleSubmit}
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

export default UpdateCategoryModal;
