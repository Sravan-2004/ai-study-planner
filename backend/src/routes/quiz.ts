import express, { Router, Request, Response } from 'express';
import Quiz from '../models/Quiz';

const router: Router = express.Router();

// Get quizzes
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find({ userId: req.params.userId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create quiz
router.post('/', async (req: Request, res: Response) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Submit quiz answers
router.post('/:id/submit', async (req: Request, res: Response) => {
  try {
    const { userAnswers } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) score++;
    });

    quiz.userAnswers = userAnswers;
    quiz.score = score;
    await quiz.save();

    res.json({ quiz, score, percentage: (score / quiz.totalQuestions) * 100 });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;