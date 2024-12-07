import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import Product from "./Product";
import ProductCardCategory from "../utils/ProductCardCategory";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

const Categories: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Updated to match the format of the provided data
        const response = await axios.get(
          "http://localhost:5000/api/products"
        );

      
        // Ensure that the response contains the expected structure
        if (response.data && Array.isArray(response.data.products)) {
          setAllProducts(response.data.products);
        } else {
          console.error("Unexpected data structure:", response.data);
          setAllProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryName) {
      const filtered = allProducts.filter(
        (product) =>
          product.category.toLowerCase() === categoryName.toLowerCase()
      );
      setFilteredProducts(filtered.sort((a, b) => a.price - b.price));
    } else {
      // If no category is specified, show all products
      setFilteredProducts(allProducts);
    }
  }, [categoryName, allProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Determine which products to display
  const productsToDisplay =
    filteredProducts.length > 0 ? filteredProducts : allProducts;

    console.log(productsToDisplay);
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold my-8 flex justify-center">
        {categoryName ? `${categoryName} Products` : "All Products"}
      </h1>
      <div className="">
        {productsToDisplay.length > 0 ? (
          <ProductCardCategory products={productsToDisplay} />
        ) : (
          <p className="col-span-full text-center text-lg">
            No products found{" "}
            {categoryName ? `in ${categoryName} category` : ""}.
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
