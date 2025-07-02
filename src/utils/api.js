import axios from 'axios';

const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.NODE_ENV ==='production'? `https://e-commerce-site-backend-hx6v.onrender.com/api`:"http://localhost:10000/api", // your backend URL
});

// eslint-disable-next-line no-undef
console.log('API Base URL:', process.env.NODE_ENV);

// Auto attach token to each request if existsclear
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
