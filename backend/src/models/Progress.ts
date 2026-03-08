import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  subject: string;
  totalStudyHours: number;
  tasksCompleted: number;
  quizzesAttempted: number;
  averageScore: number;
  weeklyStats: Array<{
    week: number;
    hoursStudied: number;
    tasksCompleted: number;
  }>;
  lastUpdated: Date;
}

const progressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    totalStudyHours: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },
    quizzesAttempted: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    weeklyStats: [
      {
        week: Number,
        hoursStudied: Number,
        tasksCompleted: Number,
      },
    ],
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IProgress>('Progress', progressSchema);