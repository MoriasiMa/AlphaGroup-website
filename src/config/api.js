// src/config/api.js
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://alphagroup-website.onrender.com'  // Replace with your actual Render URL
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;