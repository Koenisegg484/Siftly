import React from "react";
import { useLocation } from "react-router-dom";
import ProductDetail from "../components/product/ProductDetail";
import Graph from "../components/product/Graph";
import Lowhigh from "../components/product/LowHigh";
import Navbar from "../components/navbar/Navbar";

interface Product {
  _id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  stock: number;
  imageSrc?: string;
}

const Product = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen text-xl">
          No product selected
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ProductDetail product={product} />
      <div className="flex justify-between items-center">
        <div style={{ flex: "2", padding: "10px" }}>
          <Graph product={product} />
        </div>
        <div style={{ flex: "1", padding: "10px" }}>
          <Lowhigh product={product} />
        </div>
      </div>
    </>
  );
};

export default Product;