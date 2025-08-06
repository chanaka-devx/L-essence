import React, { useState } from 'react';

const AddCategoryModal = ({ isOpen, onClose, onCategoryAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.name);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch('http://localhost:5176/api/categories', {
        method: 'POST',
        body: formDataToSend,
        headers: {}
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const newCategory = await response.json();
      
      setFormData({ name: '', description: '', image: null });
      
      // Call callback if provided
      if (onCategoryAdded) {
        onCategoryAdded(newCategory);
      }
      
      // Close modal
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-[#FFFFE0] border-2 border-[#F4C430] rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-center text-xl font-semibold mb-4">Add Category</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
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
              {isLoading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
