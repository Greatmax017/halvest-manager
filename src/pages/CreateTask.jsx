import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';

const CreateTask = () => {
  const navigate = useNavigate();
  const { createTask } = useTasks();

  const handleSubmit = async (values) => {
    try {
      await createTask.mutateAsync(values);
      navigate('/');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTask;