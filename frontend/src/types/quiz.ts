export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  _id: string;
  userId: string;
  subject: string;
  title: string;
  questions: QuizQuestion[];
  userAnswers: string[];
  score: number;
  totalQuestions: number;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
}