import { v4 as uuidv4 } from 'uuid';
import { crearRuta, 
         crearEntrega, 
         obtenerRutaPorId, 
         obtenerEntregasPorRuta, 
         obtenerEntregasPendientes, 
         actualizarETA,
         tomarRuta, obtenerRutasSinAsignar } from '../models/rutaModel.js';
import pool from '../db/connection.js';
import { getTravelTime } from './openRouteService.js';

export async function procesarCreacionRuta(origen, entregas) {
  const ruta_id = uuidv4();
  let currentTime = new Date();
  let lastDireccion = origen;
  const entregas_creadas = [];

  await pool.query('BEGIN');
  try {
    await crearRuta(ruta_id, origen);

    for (const entrega of entregas) {
      const entrega_id = uuidv4();
      const minutos = await getTravelTime(lastDireccion, entrega.direccion);

      currentTime.setMinutes(currentTime.getMinutes() + minutos);
      const eta = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;

      await crearEntrega({
        id: entrega_id,
        ruta_id,
        cliente: entrega.cliente,
        direccion: entrega.direccion,
        eta,
        estado: 'pendiente'
      });

      entregas_creadas.push({
        id: entrega_id,
        cliente: entrega.cliente,
        eta,
        estado: 'pendiente'
      });

      lastDireccion = entrega.direccion;
      //currentTime.setMinutes(currentTime.getMinutes() + 5); // se suman 5 minutos por parada
    } 

    await pool.query('COMMIT');
    return { ruta_id, entregas: entregas_creadas };
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
}

export async function obtenerDetalleRuta(id) {
  const ruta = await obtenerRutaPorId(id);
  if (!ruta) throw new Error('Ruta no encontrada');

  const entregas = await obtenerEntregasPorRuta(id);

  return {
    ruta_id: ruta.id,
    origen: ruta.origen,
    estado: ruta.estado,
    repartidor: ruta.repartidor,
    entregas
  };
}

export async function recalcularETAs(ruta_id) {
  const ruta = await obtenerRutaPorId(ruta_id);
  if (!ruta) throw new Error('Ruta no encontrada');

  const entregas = await obtenerEntregasPendientes(ruta_id);
  if (entregas.length === 0) return [];

  let currentTime = new Date(); // hora actual
  let lastDireccion = ruta.origen;
  const resultado = [];

  for (const entrega of entregas) {
    const minutos = await getTravelTime(lastDireccion, entrega.direccion);
    currentTime.setMinutes(currentTime.getMinutes() + minutos);

    const eta = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;

    await actualizarETA(entrega.id, eta);

    resultado.push({
      id: entrega.id,
      cliente: entrega.cliente,
      direccion: entrega.direccion,
      nueva_eta: eta
    });

    lastDireccion = entrega.direccion;
  }

  return resultado;
}

export async function obtenerRutasDisponibles() {
  const rutas = await obtenerRutasSinAsignar();
  if (!rutas) throw new Error('Rutas no disponibles');
  return { rutas };
}

export async function asignarRutaADelivery(id, repartidor) {
  const tomada = await tomarRuta(id, repartidor);
  if (!tomada) throw new Error('Ruta no disponible o ya tomada');
  return { success: true };
}
