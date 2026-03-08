import api from './api';

export const taskService = {
  getTasks: (userId: string) => api.get(`/tasks/${userId}`),

  createTask: (data: any) => api.post('/tasks', data),

  updateTask: (id: string, data: any) => api.put(`/tasks/${id}`, data),

  deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};