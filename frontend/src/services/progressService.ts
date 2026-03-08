import api from './api';

export const progressService = {
  getProgress: (userId: string) => api.get(`/progress/${userId}`),

  updateProgress: (userId: string, data: any) =>
    api.post(`/progress/${userId}`, data),

  getProgressBySubject: (userId: string, subject: string) =>
    api.get(`/progress/${userId}/${subject}`),
};