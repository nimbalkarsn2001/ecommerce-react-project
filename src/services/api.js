import axios from 'axios';

/**
 * API Service
 * Centralized API call management
 */

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:7299';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Auth API calls
 */
export const authAPI = {
  login: (credentials) => apiClient.post('/api/auth/login', credentials),
  register: (userData) => apiClient.post('/api/auth/register', userData),
  logout: () => apiClient.post('/api/auth/logout'),
  forgotPassword: (email) => apiClient.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, password) => 
    apiClient.post('/api/auth/reset-password', { token, password }),
};

/**
 * Products API calls
 */
export const productsAPI = {
  getAll: () => apiClient.get('/api/products'),
  getById: (id) => apiClient.get(`/api/products/${id}`),
  search: (query) => apiClient.get(`/api/products/search?q=${query}`),
  getByCategory: (category) => apiClient.get(`/api/products/category/${category}`),
};

/**
 * Cart API calls
 */
export const cartAPI = {
  getCart: () => apiClient.get('/api/cart'),
  addItem: (productId, quantity) => 
    apiClient.post('/api/cart/add', { productId, quantity }),
  removeItem: (productId) => 
    apiClient.delete(`/api/cart/remove/${productId}`),
  updateQuantity: (productId, quantity) => 
    apiClient.put(`/api/cart/update/${productId}`, { quantity }),
  clearCart: () => apiClient.delete('/api/cart/clear'),
};

/**
 * Orders API calls
 */
export const ordersAPI = {
  create: (orderData) => apiClient.post('/api/orders', orderData),
  getAll: () => apiClient.get('/api/orders'),
  getById: (id) => apiClient.get(`/api/orders/${id}`),
  updateStatus: (id, status) => 
    apiClient.put(`/api/orders/${id}/status`, { status }),
};

/**
 * Users API calls
 */
export const usersAPI = {
  getProfile: () => apiClient.get('/api/users/profile'),
  updateProfile: (userData) => 
    apiClient.put('/api/users/profile', userData),
  changePassword: (oldPassword, newPassword) => 
    apiClient.post('/api/users/change-password', { oldPassword, newPassword }),
};

export default apiClient;
