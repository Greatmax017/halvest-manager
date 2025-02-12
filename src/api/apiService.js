import axios from 'axios';
const API_URL = import.meta.env.VITE_BASE_URI;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const tasksApi = {
  getTasks: async (status) => {
    const { data } = await api.get('/tasks', { params: { status } });
    return data.data;
  },

  getTask: async (id) => {
    const { data } = await api.get(`/tasks/${id}`);
    return data.data;
  },

  createTask: async (task) => {
    const { data } = await api.post('/tasks', task);
    return data.data;
  },

  updateTask: async (id, task) => {
    const { data } = await api.put(`/tasks/${id}`, task);
    return data.data;
  },

  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
  },
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