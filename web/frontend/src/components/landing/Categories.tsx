// Categories.tsx
import React from "react";

const categories = [
  { name: "Electronics", icon: "📱" },
  { name: "Fashion", icon: "👗" },
  { name: "Home & Kitchen", icon: "🍽️" },
  { name: "Beauty", icon: "💄" },
  { name: "Sports", icon: "⚽" },
  { name: "Books", icon: "📚" },
  { name: "Jewellery", icon: "💍" },
  { name: "Fruits", icon: "🍉" },
];

const Categories: React.FC = () => {
  return (
    <section className="py-5 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-6">
        {categories.map((category, index) => (
          <div
            className="category-card flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            key={index}
          >
            <div className="text-6xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
