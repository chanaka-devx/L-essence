import React, { useEffect, useState } from "react";

const ChefSpecials = () => {
  const [specials, setSpecials] = useState([]);

  // Simulate fetching data from server
  useEffect(() => {
    // Sample data (normally fetched from a server)
    const fetchedData = [
      {
        id: 1,
        title: "Lobster Thermidor",
        price: "LKR 6500",
         // replace with your own image
      },
      {
        id: 2,
        title: "Porcini Risotto",
        price: "LKR 3200",
        // replace with your own image
      },
      {
        id: 3,
        title: "Korean BBQ Short Ribs",
        price: "LKR 4800",
         // replace with your own image
      },
    ];

    // Mimic API delay
    setTimeout(() => {
      setSpecials(fetchedData);
    }, 500);
  }, []);

  return (
    <div className="bg-[#2C3E50] py-16 px-4">
      <h2 className="text-white text-3xl font-semibold font-playfair text-center mb-10">
        Chef’s Specials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {specials.map((item) => (
          <div
            key={item.id}
            className="bg-[#2C3E50] rounded-lg overflow-hidden border border-[#F4C430] hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-white text-xl font-semibold font-playfair mb-2">
                {item.title}
              </h3>
              <p className="text-[#F4C430] font-semibold font-playfair">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefSpecials;
