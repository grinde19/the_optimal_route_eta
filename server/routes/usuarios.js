import express from 'express';
import { crearUsuarioController } from '../controllers/usuarioController.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/roles.js';

const router = express.Router();

router.post('/', requireAuth, requireAdmin, crearUsuarioController);

export default router;
