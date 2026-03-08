export interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  subject: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  estimatedTime: number;
  actualTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}