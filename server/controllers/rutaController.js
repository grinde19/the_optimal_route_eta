import { procesarCreacionRuta, obtenerDetalleRuta, recalcularETAs, asignarRutaADelivery, obtenerRutasDisponibles } from '../services/rutaService.js';

export async function crearRutaConEntregas(req, res) {
  const { origen, entregas } = req.body;

  try {
    const resultado = await procesarCreacionRuta(origen, entregas);
    res.status(201).json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la ruta' });
  }
}

export async function verRutaPorId(req, res) {
  const { id } = req.params;

  try {
    const ruta = await obtenerDetalleRuta(id);
    res.json(ruta);
  } catch (err) {
    if (err.message === 'Ruta no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la ruta' });
  }
}

export async function actualizarETAsRuta(req, res) {
  const { id } = req.params;

  try {
    const entregasActualizadas = await recalcularETAs(id);
    res.json({ entregas_actualizadas: entregasActualizadas });
  } catch (err) {
    if (err.message === 'Ruta no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar ETA' });
  }
}

export async function listarRutasDisponibles(req, res) {
  try {
    const rutas = await obtenerRutasDisponibles();
    res.json(rutas);
  } catch (error) {
    console.error("Error listando rutas disponibles:", error);
    res.status(500).json({ error: "Error al obtener rutas" });
  }
}

export async function asignarRutaController(req, res) {
  const { id } = req.params;
  const { repartidor } = req.body;

  if (!repartidor) {
    return res.status(400).json({ error: 'Falta el id del repartidor' });
  }

  try {
    const resultado = await asignarRutaADelivery(id, repartidor);
    res.json(resultado);
  } catch (err) {
    if (err.message.includes('no disponible')) {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Error al tomar la ruta' });
  }
}