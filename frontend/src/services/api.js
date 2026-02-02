import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Recipes
export const getRecipes = () => api.get('/api/recipe/recipes/');
export const getRecipeById = (id) => api.get(`/api/recipe/recipes/${id}/`);
export const createRecipe = (data) => api.post('/api/recipe/recipes/', data);
export const updateRecipe = (id, data) => api.put(`/api/recipe/recipes/${id}/`, data);
export const deleteRecipe = (id) => api.delete(`/api/recipe/recipes/${id}/`);

// Ingredients
export const getIngredients = () => api.get('/api/recipe/ingredients/');
export const getIngredientById = (id) => api.get(`/api/recipe/ingredients/${id}/`);
export const updateIngredient = (id, data) => api.put(`/api/recipe/ingredients/${id}/`, data);
export const deleteIngredient = (id) => api.delete(`/api/recipe/ingredients/${id}/`);

// Tags
export const getTags = () => api.get('/api/recipe/tags/');
export const getTagById = (id) => api.get(`/api/recipe/tags/${id}/`);
export const updateTag = (id, data) => api.put(`/api/recipe/tags/${id}/`, data);
export const deleteTag = (id) => api.delete(`/api/recipe/tags/${id}/`);

// Users
export const createUser = (data) => api.post('/api/user/create/', data);
export const getCurrentUser = () => api.get('/api/user/me/');
export const updateCurrentUser = (data) => api.put('/api/user/me/', data);
export const getUserToken = (data) => api.post('/api/user/token/', data);

export default api;
