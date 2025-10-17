import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inventory API calls
export const getInventory = async () => {
  const response = await api.get('/inventory');
  return response.data;
};

export const getInventoryItem = async (id) => {
  const response = await api.get(`/inventory/${id}`);
  return response.data;
};

export const createItem = async (item) => {
  const response = await api.post('/inventory', item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await api.put(`/inventory/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await api.delete(`/inventory/${id}`);
  return response.data;
};

export default api;