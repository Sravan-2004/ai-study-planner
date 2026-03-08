import api from './api';

export const scheduleService = {
  getSchedules: (userId: string) => api.get(`/schedule/${userId}`),

  createSchedule: (data: any) => api.post('/schedule', data),

  updateSchedule: (id: string, data: any) => api.put(`/schedule/${id}`, data),

  deleteSchedule: (id: string) => api.delete(`/schedule/${id}`),
};