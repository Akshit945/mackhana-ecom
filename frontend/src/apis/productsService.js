import axios from "axios";

export const fetchProducts = async () => {
    const ApiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await axios.get(`${ApiUrl}/products`);
  return response.data;
};

export const fetchProductById = async (productId) => {
    const ApiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await axios.get(`${ApiUrl}/products/${productId}`);
  return response.data;
};
