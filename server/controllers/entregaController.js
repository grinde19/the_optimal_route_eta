import { marcarEntregaComoCompletada } from '../services/entregaService.js';

export async function completarEntregaController(req, res) {
  const { id } = req.params;

  try {
    const resultado = await marcarEntregaComoCompletada(id);
    res.json(resultado);
  } catch (err) {
    if (err.message.includes('no encontrada')) {
      return res.status(404).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Error al completar entrega' });
  }
}
