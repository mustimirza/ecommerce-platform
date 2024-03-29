import axios from "axios";

const BASE_URL = "https://dummyjson.com";

// Fetch Products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
  }
};
// Search products with query
export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/search?q=${query}`);
    return response.data.products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
// Fetch all product categories
export const fetchProductCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product categories:", error);
  }
};
// Fetch products of a specific category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/category/${category}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products of category ${category}:`, error);
  }
};
