const BASE_URL = 'http://localhost:8080/api';

export const apiService = {
  // AUTH
  login: async (username, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  register: async (username, password, email) => {
    const response = await fetch(`${BASE_URL}/auth/register?email=${email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  // PRODUCTS FOR ALL
  getAllProducts: async () => {
    const response = await fetch(`${BASE_URL}/products/all`);
    if (!response.ok) throw new Error('Failed to load products');
    return response.json();
  },

  // GET CATEGORIES
  getAllCategories: async () => {
    const response = await fetch(`${BASE_URL}/categories/all`); 
    if (!response.ok) throw new Error('Failed to load categories');
    return response.json();
  },

  getProductById: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },

  getProductsByCategory: async (categoryId) => {
    const response = await fetch(`${BASE_URL}/products/category/${categoryId}`);
    if (!response.ok) throw new Error('Failed to load products');
    return response.json();
  },

  searchProducts: async (keyword) => {
    const response = await fetch(`${BASE_URL}/products/search?keyword=${keyword}`);
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },

  // PRODUCTS W USES USER TYPE
  createProduct: async (token, productData) => {
    const response = await fetch(`${BASE_URL}/products/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (token, id, productData) => {
    const response = await fetch(`${BASE_URL}/products/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (token, id) => {
    const response = await fetch(`${BASE_URL}/products/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to delete product');
  }
};