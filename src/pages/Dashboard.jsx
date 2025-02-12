import React from 'react';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar';
import { Plus } from 'lucide-react'; // Import Plus icon for better mobile appearance
import Layout from '../components/Layout/Layout';

const Dashboard = () => {
  return (
    
    <Layout>
    
      
      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-6 md:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Tasks
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and track your tasks
              </p>
            </div>
            
            {/* New Task Button */}
            <Link
              to="/tasks/create"
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>New Task</span>
            </Link>
          </div>
        </div>

        {/* Task List */}
        <div className="pb-12">
          <TaskList />
        </div>
      </div>
    
    </Layout>
  );
};

export default Dashboard;