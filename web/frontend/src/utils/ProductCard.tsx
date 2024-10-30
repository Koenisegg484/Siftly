// Card.tsx
import React, { useEffect, useState } from "react";
import productsData from "../static/landing.json";

interface Product {
  imageSrc: string;
  title: string;
  price: string;
  description: string;
}

const ProductCard: React.FC = () => {
  // Directly use the imported products data
  const [products, setProducts] = useState<Product[]>(productsData);

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {products.map((product, index) => (
        <div
          className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
          key={index}
        >
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
            <img
              src={product.imageSrc}
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                {product.title}
              </p>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                {product.price}
              </p>
            </div>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              {product.description}
            </p>
          </div>
          <div className="p-6 pt-0">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              type="button"
            >
              Compare Price
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
