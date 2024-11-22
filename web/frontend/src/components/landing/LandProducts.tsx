// SubCard.tsx
import React from 'react';
import ProductCard from '../../utils/ProductCard';
import productsToDisplay from "../../constants/landing.json";

const LandProducts: React.FC = () => {
  return (
    <div className="py-16 dark:bg-gray-800 mt-4 pt-4">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white p-8">Featured Products</h2>
      <ProductCard products={productsToDisplay}/>
    </div>
  );
};

export default LandProducts;
