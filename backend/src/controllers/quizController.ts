import { Response } from 'express';
import Quiz from '../models/Quiz';
import { AuthRequest } from '../middleware/auth';
import { generateQuizQuestions } from '../utils/aiHelper';

export const getQuizzes = async (req: AuthRequest, res: Response) => {
  try {
    const quizzes = await Quiz.find({ userId: req.userId });
    res.json(quizzes);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { subject, difficulty } = req.body;

    const questionsData = await generateQuizQuestions(subject, difficulty || 'medium', 10);
    const questions = JSON.parse(questionsData || '[]');

    const quiz = new Quiz({
      userId: req.userId,
      subject,
      title: `${subject} Quiz`,
      questions,
      totalQuestions: 10,
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { userAnswers } = req.body;

    const quiz = await Quiz.findById(id);
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

    const percentage = (score / quiz.totalQuestions) * 100;
    res.json({ quiz, score, percentage });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};