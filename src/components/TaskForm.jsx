import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .max(255, 'Title must be less than 255 characters'),
  description: Yup.string(),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Date must be in the future'),
  status: Yup.string()
    .oneOf(['pending', 'in_progress', 'completed'])
    .required('Status is required'),
});

const TaskForm = ({ initialValues, onSubmit, isEditing = false }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      title: '',
      description: '',
      date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      status: 'pending',
    },
    validationSchema: isEditing 
      ? validationSchema.shape({
          date: Yup.date().required('Date is required'),
        })
      : validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label 
          htmlFor="title" 
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          {...formik.getFieldProps('title')}
          className={`mt-1 block w-full rounded-md shadow-sm 
            ${formik.touched.title && formik.errors.title 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
        />
        {formik.touched.title && formik.errors.title && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label 
          htmlFor="description" 
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          rows="4"
          {...formik.getFieldProps('description')}
          className={`mt-1 block w-full rounded-md shadow-sm 
            ${formik.touched.description && formik.errors.description 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
        )}
      </div>

      {/* Date Field */}
      <div>
        <label 
          htmlFor="date" 
          className="block text-sm font-medium text-gray-700"
        >
          Due Date
        </label>
        <input
          id="date"
          type="date"
          {...formik.getFieldProps('date')}
          min={!isEditing ? dayjs().format('YYYY-MM-DD') : undefined}
          className={`mt-1 block w-full rounded-md shadow-sm 
            ${formik.touched.date && formik.errors.date 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
        />
        {formik.touched.date && formik.errors.date && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.date}</p>
        )}
      </div>

      {/* Status Field */}
      <div>
        <label 
          htmlFor="status" 
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          {...formik.getFieldProps('status')}
          className={`mt-1 block w-full rounded-md shadow-sm 
            ${formik.touched.status && formik.errors.status 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {formik.touched.status && formik.errors.status && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.status}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`px-4 py-2 rounded-md text-white 
            ${formik.isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {formik.isSubmitting 
            ? 'Saving...' 
            : isEditing 
              ? 'Update Task' 
              : 'Create Task'
          }
        </button>
      </div>
    </form>
  );
};

export default TaskForm;