
import { getItemFromLocalStorage } from '../utils/helper';
const API_URL = import.meta.env.VITE_BASE_URI;
const token = getItemFromLocalStorage('token');

const createFetchOptions = (smethod, body = null) => {
  const token = getItemFromLocalStorage('token');
  const options = {
    method: smethod,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  return options;
};

// Tasks API
export const tasksApi = {
  getTasks: async (status) => {
    const queryParams = status ? `?status=${status}` : '';
    const response = await fetch(`${API_URL}tasks${queryParams}`,
      {
        method: `GET`,
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
      
        },
        withCredentials: true,
    
      } 
     
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch tasks');
    }
    
    const data = await response.json();
    return data.data;
  },

  getTask: async (id) => {
    const response = await fetch(`${API_URL}tasks/${id}`,
      createFetchOptions('GET')
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch task');
    }
    
    const data = await response.json();
    return data.data;
  },

  createTask: async (task) => {
    const response = await fetch(`${API_URL}tasks`,
      createFetchOptions('POST', task)
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create task');
    }
    
    const data = await response.json();
    return data.data;
  },

  updateTask: async (id, task) => {
    const response = await fetch(`${API_URL}tasks/${id}`,
      createFetchOptions('PUT', task)
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update task');
    }
    
    const data = await response.json();
    return data.data;
  },

  deleteTask: async (id) => {
    const response = await fetch(`${API_URL}tasks/${id}`,
      createFetchOptions('DELETE')
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete task');
    }
    
    return response.json();
  }
};

// Auth API
export const authApi = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}login`, 
      createFetchOptions('POST', credentials)
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}register`,
      createFetchOptions('POST', userData)
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: async () => {
    try {
      const response = await fetch(`${API_URL}logout`,
        createFetchOptions('POST')
      );
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Logout failed');
      }
    } finally {
   
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

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
    withCredentials: true,
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
    withCredentials: true,
    body: JSON.stringify(userData)
  });


  if (!response.ok) {

    

    throw new Error(response.message);
  }

  const data = await response.json();

  return data;
}

export async function getTaskApi() {
  const response = await fetch(`${API_URL}tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
  
    },
    withCredentials: true,

  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  const data = await response.json();

  return data.data;
}