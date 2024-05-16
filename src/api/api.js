import axios from 'axios';

const api = axios.create({
  baseURL: "https://backend.cappsule.co.in/api/v1/new_search", // Set the base URL for your backend API
});

export default api;