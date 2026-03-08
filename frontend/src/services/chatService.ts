import api from './api';

export const chatService = {
  sendMessage: (data: any) => api.post('/chat/message', data),

  getChatHistory: (userId: string) => api.get(`/chat/${userId}`),

  getChatBySubject: (userId: string, subject: string) =>
    api.get(`/chat/${userId}?subject=${subject}`),
};