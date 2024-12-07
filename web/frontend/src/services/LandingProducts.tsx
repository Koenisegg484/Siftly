import axios from "axios";

// Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all products
export const fetchLandProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/land-products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a product by ID
export const fetchLandProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/land-products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Add a new product
// export const addProduct = async (product: any) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/products`, product);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding product:", error);
//     throw error;
//   }
// };

// // Update a product
// export const updateProduct = async (id: string, updatedProduct: any) => {
//   try {
//     const response = await axios.put(
//       `${API_BASE_URL}/products/${id}`,
//       updatedProduct
//     );
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating product with ID ${id}:`, error);
//     throw error;
//   }
// };

// Delete a product
export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
