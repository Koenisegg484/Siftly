import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for redirection

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

const CategorySection: React.FC = () => {
  const navigate = useNavigate(); // Hook to handle redirection

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`); // Navigate to category page with the selected category name
  };

  return (
    <section className="py-5 bg-gray-100 text-center dark:bg-gray-800 transition-colors">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">Browse Categories</h2>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-6"
      >
        {categories.map((category) => (
          <div
            className="category-card flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            // Store the category name in a data attribute
          >
            <div className="text-6xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
