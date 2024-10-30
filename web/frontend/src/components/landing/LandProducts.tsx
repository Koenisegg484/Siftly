// SubCard.tsx
import React from 'react';
import ProductCard from '../../utils/ProductCard';

const LandProducts: React.FC = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <ProductCard />
    </div>
  );
};

export default LandProducts;
