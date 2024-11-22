import React from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  // Add other properties as needed
}

interface ProductCardProps {
  products: Product[];
}

const ProductCard2: React.FC<ProductCardProps> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 dark:bg-gray-800 p-4">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full transform transition-transform hover:scale-105"
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-64 bg-gray-200 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-1/2 h-1/2 text-gray-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="block font-sans text-xl font-semibold leading-snug text-blue-gray-900 antialiased">
                  {product.name}
                </h3>
                <p className="block font-sans text-lg font-bold leading-relaxed text-blue-gray-900 antialiased">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 opacity-75 mb-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                type="button"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-xl text-gray-500">
          No products found
        </div>
      )}
    </div>
  );
};

export default ProductCard2;