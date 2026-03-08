import { Response } from 'express';
import ChatMessage from '../models/ChatMessage';
import { AuthRequest } from '../middleware/auth';
import { getStudyBuddyResponse } from '../utils/aiHelper';

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { message, subject } = req.body;

    if (!message || !subject) {
      return res.status(400).json({ message: 'Message and subject required' });
    }

    const aiResponse = await getStudyBuddyResponse(message, subject);

    const chatMessage = new ChatMessage({
      userId: req.userId,
      message,
      response: aiResponse,
      subject,
    });
    await chatMessage.save();

    res.json({ message: aiResponse, chatId: chatMessage._id });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getChatHistory = async (req: AuthRequest, res: Response) => {
  try {
    const messages = await ChatMessage.find({ userId: req.userId }).sort({
      timestamp: -1,
    });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getChatBySubject = async (req: AuthRequest, res: Response) => {
  try {
    const { subject } = req.params;
    const messages = await ChatMessage.find({
      userId: req.userId,
      subject,
    }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};