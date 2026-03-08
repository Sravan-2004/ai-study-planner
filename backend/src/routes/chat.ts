import express, { Router, Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import ChatMessage from '../models/ChatMessage';

const router: Router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Send message to AI buddy
router.post('/message', async (req: Request, res: Response) => {
  try {
    const { userId, message, subject } = req.body;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI study buddy helping students learn ${subject}. Provide clear, concise explanations and encourage learning.`,
        },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = response.data.choices[0].message?.content || 'No response';

    const chatMessage = new ChatMessage({
      userId,
      message,
      response: aiResponse,
      subject,
    });
    await chatMessage.save();

    res.json({ message: aiResponse, chatId: chatMessage._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get chat history
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const messages = await ChatMessage.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;