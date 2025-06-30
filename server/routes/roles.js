import express from 'express';
import { obtenerRolesController } from '../controllers/rolController.js';

const router = express.Router();

router.get('/', obtenerRolesController);

export default router;
