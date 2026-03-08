import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  studyGoals: string[];
  preferences: {
    studyDuration: number;
    breakTime: number;
    difficultyLevel: 'easy' | 'medium' | 'hard';
    subjects: string[];
  };
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studyGoals: [String],
    preferences: {
      studyDuration: { type: Number, default: 50 },
      breakTime: { type: Number, default: 10 },
      difficultyLevel: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
      subjects: [String],
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password: string) {
  return await bcryptjs.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);