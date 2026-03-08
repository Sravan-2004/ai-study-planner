import { Response } from 'express';
import Schedule from '../models/Schedule';
import { AuthRequest } from '../middleware/auth';

export const getSchedules = async (req: AuthRequest, res: Response) => {
  try {
    const schedules = await Schedule.find({ userId: req.userId });
    res.json(schedules);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, schedule } = req.body;
    const newSchedule = new Schedule({
      userId: req.userId,
      title,
      description,
      schedule,
    });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });
    res.json(schedule);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Schedule.findByIdAndDelete(id);
    res.json({ message: 'Schedule deleted' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};