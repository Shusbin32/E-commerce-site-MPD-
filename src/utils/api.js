import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.NODE_ENV ==='production'? `https://e-commerce-site-backend-hx6v.onrender.com/api`:"http://localhost:10000/api", // your backend URL
});
console.log('API Base URL:', import.meta.env.VTIE_BACKEND_BASE_URL);

// Auto attach token to each request if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
