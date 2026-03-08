import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  subject: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  estimatedTime: number;
  actualTime: number;
  reminders: Date[];
}

const taskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    subject: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
    estimatedTime: { type: Number, default: 30 },
    actualTime: { type: Number, default: 0 },
    reminders: [Date],
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', taskSchema);