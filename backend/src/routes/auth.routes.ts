import express from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';

const router = express.Router();

router.post('/register', validate(RegisterDto), register);
router.post('/login', validate(LoginDto), login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;