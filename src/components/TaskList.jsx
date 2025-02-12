import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import TaskItem from './TaskItem';
import {
  ListTodo,
  Clock,
  CheckCircle2,
  Plus,
  Search,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useGetTasks } from '../hooks/useGetTask';

const TaskList = () => {
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const { tasks } = useTasks(status);

  // const { tasks, isLoading } = useGetTasks();

  // if (isLoading) return <div>Loading...</div>;


  const filteredTasks = tasks.data?.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description?.toLowerCase().includes(search.toLowerCase())
  );

  
  const statusCounts = tasks.data?.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <ListTodo className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-semibold">{statusCounts?.pending || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-semibold">{statusCounts?.in_progress || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-semibold">{statusCounts?.completed || 0}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <Link
            to="/tasks/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Task
          </Link>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : tasks.isError ? (
          <div className="flex justify-center items-center py-8 text-red-600">
            <AlertCircle className="w-6 h-6 mr-2" />
            Error loading tasks
          </div>
        ) : filteredTasks?.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex justify-center">
              <ListTodo className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
            <p className="mt-2 text-gray-500">
              {search
                ? "No tasks match your search criteria"
                : "Get started by creating a new task"}
            </p>
          </div>
        ) : (
          filteredTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;