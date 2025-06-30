import api from './api';

export async function crearRutaService(data: {
  origen: string;
  entregas: { direccion: string }[];
}) {
  const res = await api.post('/rutas', data);
  return res.data;
}

export async function obtenerRutasDisponibles() {
  const res = await api.get('/rutas/disponibles');
  return res.data;
}

export async function asignarRutaService(rutaId: number, userId: number) {
  console.log('Calling api')
  const res = await api.post(`/rutas/${rutaId}/asignar`, { repartidor: userId });
  return res.data;
}
