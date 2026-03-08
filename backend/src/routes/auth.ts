import express, { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;