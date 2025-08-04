import React, { useEffect, useState } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Simulated fetch from server
  useEffect(() => {
    const fetchCategories = async () => {
      const data = [
        {
          id: 1,
          title: 'Starters',
          description: 'Light and flavorful dishes to begin your dining experience.',
          image: '../assets/images/categories/starters.jpg',
        },
        {
          id: 2,
          title: 'Main Courses',
          description: 'Light hearty and satisfying signature dishes that form the core of your meal.',
          image: '/assets/images/categories/mains.jpg',
        },
        {
          id: 3,
          title: 'Side Dishes',
          description: 'Complementary items that pair perfectly with your main course.',
          image: '/assets/images/categories/sides.jpg',
        },
        {
          id: 4,
          title: 'Desserts',
          description: 'Indulgent sweet treats to end your meal on a high note.',
          image: '/assets/images/categories/desserts.jpg',
        },
        {
          id: 5,
          title: 'Beverages',
          description: 'A curated selection of wines, cocktails, soft drinks, and specialty beverages.',
          image: '/assets/images/categories/beverages.jpg',
        },
        {
          id: 6,
          title: 'Salads',
          description: 'Fresh and crisp combinations of greens, vegetables, and dressings.',
          image: '/assets/images/categories/salads.jpg',
        },
      ];
      setCategories(data);
    };

    fetchCategories();
  }, []);

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
