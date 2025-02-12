// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          Task Manager
        </Link>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-500">Welcome,</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;