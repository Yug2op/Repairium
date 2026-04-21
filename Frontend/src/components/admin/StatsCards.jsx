import React from "react";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats.users.total,
    },
    {
      title: "Total Technicians",
      value: stats.technicians.total,
    },
    {
      title: "Total Bookings",
      value: stats.bookings.total,
    },
    {
      title: "Revenue",
      value: `₹ ${stats.revenue.total}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-md p-6 border">
          <h3 className="text-gray-500 text-sm">{card.title}</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;