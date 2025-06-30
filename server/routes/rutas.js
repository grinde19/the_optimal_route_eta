import express from 'express';
import {
  crearRutaConEntregas,
  verRutaPorId,
  actualizarETAsRuta,
  asignarRutaController,
  listarRutasDisponibles
} from '../controllers/rutaController.js';

const router = express.Router();

router.get('/disponibles', listarRutasDisponibles);

router.get('/:id', verRutaPorId);
router.post('/', crearRutaConEntregas);
router.post('/:id/actualizar', actualizarETAsRuta);
router.post('/:id/asignar', asignarRutaController);

export default router;
