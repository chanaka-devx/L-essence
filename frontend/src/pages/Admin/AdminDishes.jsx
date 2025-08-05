import React, { useEffect, useState } from "react";

const AdminDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllDishes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5176/api/dishes');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setDishes(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch dishes');
        }
      } catch (err) {
        console.error('Error fetching dishes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDishes();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#FDF6E3] min-h-screen py-12 px-6 font-['Playfair_Display']">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B]"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#FDF6E3] min-h-screen py-12 px-6 font-['Playfair_Display']">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error loading dishes: {error}</p>
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
    <div className="bg-[#FDF6E3] min-h-screen mt-10 py-12 px-6 font-['Playfair_Display']">
      <h2 className="text-center text-3xl font-semibold text-[#333333] mb-10">
        All Dishes ({dishes.length} dishes)
      </h2>

      {dishes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#333333] text-lg">No dishes found.</p>
          <p className="text-[#666666] text-sm">Start by adding your first dish.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white border border-[#F4C430] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={dish.dish_image}
                alt={dish.name}
                className="w-full h-36 object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/placeholder.jpg'; // Fallback image
                }}
              />
              <div className="p-4">
                <h3 className="text-[#333333] text-lg font-medium">
                  {dish.name}
                </h3>
                <p className="text-[#333333] mt-1">LKR {dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDishes;
