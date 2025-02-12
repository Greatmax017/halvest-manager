import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (credentials) => {
    const { data } = await api.post('/login', credentials);
    return data;
  },

  register: async (userData) => {
    const { data } = await api.post('/register', userData);
    return data;
  },

  logout: async () => {
    const { data } = await api.post('/logout');
    return data;
  }
};