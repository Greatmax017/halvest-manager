import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';
import { tasksApi } from '../api/apiService';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTask } = useTasks();

  // Fetch task data
  const { data: task, isLoading, isError } = useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksApi.getTask(id),
  });

  const handleSubmit = async (values) => {
    try {
      await updateTask.mutateAsync({ id, task: values });
      navigate('/');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">Error loading task</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Task</h1>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <TaskForm 
            initialValues={{
              title: task.title,
              description: task.description || '',
              date: task.date,
              status: task.status,
            }} 
            onSubmit={handleSubmit}
            isEditing={true}
          />
        </div>

        <div className="mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;