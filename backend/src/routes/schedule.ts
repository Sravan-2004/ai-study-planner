import express, { Router, Request, Response } from 'express';
import Schedule from '../models/Schedule';

const router: Router = express.Router();

// Get schedules
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const schedules = await Schedule.find({ userId: req.params.userId });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create schedule
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, title, description, schedule } = req.body;
    const newSchedule = new Schedule({ userId, title, description, schedule });
    await newSchedule.save();
    res.json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update schedule
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;