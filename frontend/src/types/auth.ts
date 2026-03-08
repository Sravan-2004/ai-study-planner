export interface User {
  id: string;
  name: string;
  email: string;
  studyGoals?: string[];
  preferences?: {
    studyDuration: number;
    breakTime: number;
    difficultyLevel: 'easy' | 'medium' | 'hard';
    subjects: string[];
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}