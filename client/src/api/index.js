import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const insertFood = (data) => API.post('/food', data);
export const getAllFoods = () => API.get('/food');
export const deleteFoodById = (id) => API.delete(`/food/${id}`);
