import { completarEntrega } from '../models/entregaModel.js';

export async function marcarEntregaComoCompletada(id) {
  const ok = await completarEntrega(id);
  if (!ok) throw new Error('Entrega no encontrada o ya completada');
  return { success: true };
}
