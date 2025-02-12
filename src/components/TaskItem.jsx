import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import dayjs from 'dayjs';
import DeleteTaskModal from './DeleteTaskModal';
import {
  Calendar,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const TaskItem = ({ task }) => {
  const { deleteTask } = useTasks();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTask.mutateAsync(task.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const statusConfig = {
    pending: {
      icon: AlertCircle,
      colorClass: 'bg-yellow-100 text-yellow-800',
      iconClass: 'text-yellow-600',
    },
    in_progress: {
      icon: Clock,
      colorClass: 'bg-blue-100 text-blue-800',
      iconClass: 'text-blue-600',
    },
    completed: {
      icon: CheckCircle2,
      colorClass: 'bg-green-100 text-green-800',
      iconClass: 'text-green-600',
    },
  };

  const StatusIcon = statusConfig[task.status].icon;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{task.title}</h3>
              {task.description && (
                <p className="mt-1 text-gray-600">{task.description}</p>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {dayjs(task.date).format('MMM D, YYYY')}
              </div>

              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig[task.status].colorClass}`}>
                <StatusIcon className={`w-4 h-4 ${statusConfig[task.status].iconClass}`} />
                <span className="text-sm font-medium">
                  {task.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/tasks/${task.id}/edit`}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <DeleteTaskModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isDeleting={deleteTask.isPending}
      />
    </>
  );
};

export default TaskItem;