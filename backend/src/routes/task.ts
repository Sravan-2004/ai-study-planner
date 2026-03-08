import express, { Router, Request, Response } from 'express';
import Task from '../models/Task';

const router: Router = express.Router();

// Get tasks
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create task
router.post('/', async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update task
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;