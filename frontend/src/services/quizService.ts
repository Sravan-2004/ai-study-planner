import api from './api';

export const quizService = {
  getQuizzes: (userId: string) => api.get(`/quiz/${userId}`),

  createQuiz: (data: any) => api.post('/quiz', data),

  submitQuiz: (id: string, answers: any) =>
    api.post(`/quiz/${id}/submit`, answers),
};