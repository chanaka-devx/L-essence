import React from "react";
import { FaUsers, FaUtensils, FaCalendarAlt, FaComment } from "react-icons/fa";

const AdminDashboard = () => {
  // Sample statistics data
  const stats = [
    { title: "Total Dishes", value: "48", icon: <FaUtensils />, color: "bg-blue-500" },
    { title: "Bookings Today", value: "12", icon: <FaCalendarAlt />, color: "bg-green-500" },
    { title: "Users", value: "245", icon: <FaUsers />, color: "bg-purple-500" },
    { title: "Reviews", value: "56", icon: <FaComment />, color: "bg-yellow-500" }
  ];

  return (
    <div className="bg-[#FDF6E3] min-h-screen px-6 py-10 font-['Playfair_Display']">
        <div className="max-w-7xl mx-auto pt-12">
      <h1 className="text-3xl font-semibold text-[#333333] mb-8">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md p-6 flex items-center"
          >
            <div className={`${stat.color} text-white p-4 rounded-full mr-4`}>
              {stat.icon}
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="text-2xl font-semibold text-[#333333]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border-b pb-3 last:border-0">
              <p className="text-gray-700">New booking confirmed for Table 4</p>
              <p className="text-sm text-gray-500">Today, 10:30 AM</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
