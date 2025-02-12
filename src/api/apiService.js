import axios from 'axios';
import { getItemFromLocalStorage } from '../utils/helper';
const API_URL = import.meta.env.VITE_BASE_URI;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getItemFromLocalStorage('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const tasksApi = {
  getTasks: async (status) => {
    try {
      const { data } = await api.get('/tasks', { params: { status } });
      return data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  getTask: async (id) => {
    try {
      const { data } = await api.get(`/tasks/${id}`);
      return data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch task');
    }
  },

  createTask: async (task) => {
    try {
      const { data } = await api.post('/tasks', task);
      return data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  },

  updateTask: async (id, task) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, task);
      return data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },

  deleteTask: async (id) => {
    try {
      const { data } = await api.delete(`/tasks/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  },
};

// Auth API
export const authApi = {
  login: async (credentials) => {
    try {
      const { data } = await api.post('/login', credentials);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      const { data } = await api.post('/register', userData);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout: async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      // Still remove token and user even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  // Helper function to check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Helper function to get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

//login
export async function loginApi(payload) {
  const response = await fetch(`${API_URL}login`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    
});
if (!response.ok) {
   
    throw new Error(response.message);
  }

  const data = await response.json();

  return data;

}


export async function signupapi(userData) {
  const response = await fetch(`${API_URL}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {

    

    throw new Error(response.message);
  }

  const data = await response.json();

  return data;
}