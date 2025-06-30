import express from 'express';
import { completarEntregaController } from '../controllers/entregaController.js';

const router = express.Router();

router.post('/:id/completar', completarEntregaController);

export default router;
