import { Request, Response, NextFunction } from 'express';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateTaskInput = (req: Request, res: Response, next: NextFunction) => {
  const { title, subject, dueDate } = req.body;

  if (!title || !subject || !dueDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  next();
};

export const validateScheduleInput = (req: Request, res: Response, next: NextFunction) => {
  const { title, schedule } = req.body;

  if (!title || !Array.isArray(schedule)) {
    return res.status(400).json({ message: 'Invalid schedule data' });
  }

  next();
};