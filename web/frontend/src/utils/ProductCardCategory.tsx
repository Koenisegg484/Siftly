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

const ProductCardCategory: React.FC<ProductCardProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleComparePrice = (product: Product) => {
    navigate(`/products/${product._id}`, {
      state: { 
        product,
        apiUrl: "http://localhost:5000/api/products" // Pass the API URL here
      }
    });
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No products available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 dark:bg-gray-800 p-4">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div
          className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full"
          key={product._id}
        >
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-64">
            <img
              src={product.images || "/placeholder-image.jpg"}
              alt={product.name}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                {product.name}
              </p>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              ₹{product.price}
              </p>
            </div>
            <p className="block font-sans text-sm antialiased font-bold leading-normal text-gray-700 opacity-75 ">
              {product.category}
            </p>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              {product.description}
            </p>
          </div>
          <div className="p-6 pt-0 mt-auto">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              type="button"
              onClick={() => handleComparePrice(product)}
            >
              Compare Price
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

export default ProductCardCategory;