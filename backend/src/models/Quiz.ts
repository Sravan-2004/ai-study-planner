import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  userId: mongoose.Types.ObjectId;
  subject: string;
  title: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }>;
  userAnswers: string[];
  score: number;
  totalQuestions: number;
  completedAt: Date;
}

const quizSchema = new Schema<IQuiz>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    title: { type: String, required: true },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
        explanation: String,
      },
    ],
    userAnswers: [String],
    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IQuiz>('Quiz', quizSchema);