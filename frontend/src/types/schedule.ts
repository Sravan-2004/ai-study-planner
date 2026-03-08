export interface ScheduleSession {
  subject: string;
  startTime: string;
  endTime: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
}

export interface ScheduleDay {
  day: string;
  sessions: ScheduleSession[];
}

export interface Schedule {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  schedule: ScheduleDay[];
  isActive: boolean;
  generatedAt: string;
  createdAt: string;
  updatedAt: string;
}