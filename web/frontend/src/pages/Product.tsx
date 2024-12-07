import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios"; // Make sure to install axios

import Navbar from "../components/navbar/Navbar";
import ProductDetail from "../components/product/ProductDetail";
import Graph from "../components/product/Graph";
import Lowhigh from "../components/product/LowHigh";

interface LandProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  priceHistory: {
    platform: string;
    prices: number[];
    dates: string[];
    url: string;
  }[];
}

interface Product {
  _id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  stock: number;
  imageSrc?: string;
}

const Product: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  
  // Get the apiUrl from the location state
  const { apiUrl } = location.state || { apiUrl: "http://localhost:5000/api/land-products" }; // Default value

  const [productData, setProductData] = useState<{ landProduct: LandProduct } | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch the product data using the API URL and productId
        const response = await axios.get(`${apiUrl}/${productId}`);
        
        setProductData({ landProduct: response.data });
      } catch (err) {
        setError("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProductData();
  }, [productId, apiUrl]); // Add apiUrl to the dependency array

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen text-xl">
          Loading...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen text-xl text-red-500">
          {error}
        </div>
      </>
    );
  }

  if (!productData) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen text-xl">
          No product selected
        </div>
      </>
    );
  }

  // console.log("pro",productData);
  return (
    <>
      <Navbar />
      <ProductDetail product={productData?.landProduct?.landProduct || productData.landProduct.product} />
      <div className="flex justify-between items-center">
        <div style={{ flex: "2" }}>
          <Graph product={productData?.landProduct} />
        </div>
        <div style={{ flex: "1" }}>
          <Lowhigh product={productData?.landProduct} />
        </div>
      </div>
    </>
  );
};

export default Product;
