import React, { useEffect, useState } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulated fetch from server
  useEffect(() => {
    const fetchCategories = async () => {
      try{
        setLoading(true);
        const response = await fetch('http://localhost:5176/api/categories');

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const result = await response.json();

        if (result.success){
          setCategories(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch categories');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section id="categories" className="bg-[#FDF6E3] py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-semibold text-[#333333] mb-10">Categories</h2>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4C430]"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="categories" className="bg-[#FDF6E3] py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-semibold text-[#333333] mb-10">Categories</h2>
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
      </section>
    );
  }

  return (
    <section id="categories" className="bg-[#FDF6E3] py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-playfair font-semibold text-[#333333] mb-10">Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-[#F4C430] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <img src={cat.image} alt={cat.title} className="w-full h-48 object-cover" />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold font-playfair text-[#333333] mb-2">{cat.title}</h3>
                <p className="text-[#333333] text-sm">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
