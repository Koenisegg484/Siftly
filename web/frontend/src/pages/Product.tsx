import React from "react";
import ProductDetail from "../components/product/ProductDetail";
import Graph from "../components/product/Graph";
import Lowhigh from "../components/product/LowHigh";
import Navbar from "../components/navbar/Navbar";

const Product = () => {
  return (
    <>
      <Navbar />
      <ProductDetail />
      <div className="flex justify-between items-center">
        <div style={{ flex: "2", padding: "10px" }}>
          {" "}
          {/* 2/3 of the space */}
          <Graph />
        </div>
        <div style={{ flex: "1", padding: "10px" }}>
          {" "}
          {/* 1/3 of the space */}
          <Lowhigh />
        </div>
      </div>
    </>
  );
};

export default Product;
