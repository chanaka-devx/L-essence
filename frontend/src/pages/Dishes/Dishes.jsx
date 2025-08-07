import React, { useEffect, useState } from "react";

const Dishes = () => {
  const [name, setName] = useState("Loading...");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    
    setTimeout(() => {
      setName("Starters");
      setDishes([
        {
          id: 1,
          name: "Truffle Arancini",
          price: "LKR 1800",
          image: "https://i.ibb.co/ZJvhs8b/arancini.jpg",
        },
        {
          id: 2,
          name: "Bruschetta",
          price: "LKR 900",
          image: "https://i.ibb.co/jVckcq1/bruschetta.jpg",
        },
        {
          id: 3,
          name: "Seared Scallops",
          price: "LKR 2000",
          image: "https://i.ibb.co/Khq2wZ9/scallops.jpg",
        },
        {
          id: 4,
          name: "Stuffed Mushrooms",
          price: "LKR 1200",
          image: "https://i.ibb.co/F6fn0S9/stuffedmushroom.jpg",
        },
        {
          id: 5,
          name: "Lobster Bisque",
          price: "LKR 2500",
          image: "https://i.ibb.co/B4MNxKY/lobsterbisque.jpg",
        },
        {
          id: 6,
          name: "Spring Rolls",
          price: "LKR 750",
          image: "https://i.ibb.co/v39dVmr/springroll.jpg",
        },
        {
          id: 6,
          name: "Spring Rolls",
          price: "LKR 750",
          image: "https://i.ibb.co/v39dVmr/springroll.jpg",
        },
      ]);
    }, 500);
  }, []);

  return (
    <div className="bg-[#FDF6E3] min-h-screen py-12 px-6 font-['Playfair_Display']">
      <h2 className="text-center text-3xl font-semibold text-[#333333] mb-10">
        {name}
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white border border-[#F4C430] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-[#333333] text-lg font-medium">
                {dish.name}
              </h3>
              <p className="text-[#333333] mt-1">{dish.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
