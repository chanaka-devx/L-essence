import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/apiConfig';

const UpdateTableModal = ({ isOpen, onClose, table, onTableUpdated }) => {
  const [formData, setFormData] = useState({
    location: '',
    seats: '',
    table_image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && table) {
      setFormData({
        location: table.location || '',
        seats: table.seats || '',
        table_image: null, // reset image on open
      });
      setError('');
    }
  }, [isOpen, table]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('location', formData.location);
      formDataToSend.append('seats', formData.seats);
      if (formData.image) {
        formDataToSend.append('table_image', formData.image);
      }

      const response = await fetch(`${BASE_URL}/api/tables/${table.table_id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update table');
      }

      const updatedTable = await response.json();

      if (onTableUpdated) onTableUpdated(updatedTable);
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
        <h2 className="text-center text-xl font-semibold mb-4">Update Table</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Seats</label>
            <input
              type="number"
              name="seats"
              min="1"
              value={formData.seats}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-[#F4C430] bg-white focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Table Image (optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
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
              className="px-4 py-2 bg-[#F59E0B] text-white font-semibold rounded hover:opacity-90 transition"
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTableModal;
