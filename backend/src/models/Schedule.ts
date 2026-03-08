import mongoose, { Schema, Document } from 'mongoose';

export interface ISchedule extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  generatedAt: Date;
  schedule: Array<{
    day: string;
    sessions: Array<{
      subject: string;
      startTime: string;
      endTime: string;
      duration: number;
      priority: 'high' | 'medium' | 'low';
    }>;
  }>;
  isActive: boolean;
}

const scheduleSchema = new Schema<ISchedule>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    generatedAt: { type: Date, default: Date.now },
    schedule: [
      {
        day: String,
        sessions: [
          {
            subject: String,
            startTime: String,
            endTime: String,
            duration: Number,
            priority: { type: String, enum: ['high', 'medium', 'low'] },
          },
        ],
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISchedule>('Schedule', scheduleSchema);