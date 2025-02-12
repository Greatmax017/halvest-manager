import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/apiService';


export const useTasks = (status) => {
  const queryClient = useQueryClient();

  const tasks = useQuery({
    queryKey: ['tasks', status],
    queryFn: () => tasksApi.getTasks(status),
  });

  const createTask = useMutation({
    mutationFn: (newTask) => tasksApi.createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, task }) => tasksApi.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id) => tasksApi.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
  };
};