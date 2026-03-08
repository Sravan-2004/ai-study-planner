import express, { Router, Request, Response } from 'express';
import Progress from '../models/Progress';

const router: Router = express.Router();

// Get progress
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update progress
router.post('/:userId', async (req: Request, res: Response) => {
  try {
    const { subject, totalStudyHours, tasksCompleted, quizzesAttempted, averageScore } = req.body;

    let progress = await Progress.findOne({ userId: req.params.userId, subject });
    if (!progress) {
      progress = new Progress({ userId: req.params.userId, subject });
    }

    progress.totalStudyHours = totalStudyHours;
    progress.tasksCompleted = tasksCompleted;
    progress.quizzesAttempted = quizzesAttempted;
    progress.averageScore = averageScore;
    progress.lastUpdated = new Date();

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;