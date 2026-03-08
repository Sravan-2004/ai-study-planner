import { Response } from 'express';
import Progress from '../models/Progress';
import { AuthRequest } from '../middleware/auth';

export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    const progress = await Progress.find({ userId: req.userId });
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { subject, totalStudyHours, tasksCompleted, quizzesAttempted, averageScore } =
      req.body;

    let progress = await Progress.findOne({ userId: req.userId, subject });
    if (!progress) {
      progress = new Progress({ userId: req.userId, subject });
    }

    progress.totalStudyHours = totalStudyHours;
    progress.tasksCompleted = tasksCompleted;
    progress.quizzesAttempted = quizzesAttempted;
    progress.averageScore = averageScore;
    progress.lastUpdated = new Date();

    await progress.save();
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProgressBySubject = async (req: AuthRequest, res: Response) => {
  try {
    const { subject } = req.params;
    const progress = await Progress.findOne({ userId: req.userId, subject });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};