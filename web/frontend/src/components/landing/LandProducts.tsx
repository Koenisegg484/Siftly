import React, { useEffect, useState } from 'react';
import ProductCard from '../../utils/ProductCard';
import { fetchLandProducts } from '../../services/LandingProducts';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  priceHistory: {
    platform: string;
    prices: number[];
    dates: string[];
    url: string;
    _id: string;
  }[];
  photos: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}


const LandProducts: React.FC = () => {
  const [productsToDisplay, setProductsToDisplay] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLandProducts();
        setProductsToDisplay(data);
        setError(data.length === 0 ? "No products found" : null);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
        setProductsToDisplay([]);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-16 dark:bg-gray-800">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-16 dark:bg-gray-800">
        {error}
      </div>
    );
  }

  return (
    <div className="py-16 dark:bg-gray-800 mt-4 pt-4">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white p-8">
        Featured Products
      </h2>
      <ProductCard products={productsToDisplay} />
    </div>
  );
};

export default LandProducts;