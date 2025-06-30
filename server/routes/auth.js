import express from 'express';
import { loginController, meController } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', loginController);
router.get('/me', requireAuth, meController);

export default router;
