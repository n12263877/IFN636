import axios from "../axiosConfig";

// GET ALL PRODUCTS
export const getProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};

// GET SINGLE PRODUCT
export const getProductById = async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};
