import { crearUsuario as crearUsuarioDB } from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

export async function crearUsuario(data) {
  if (!data.nombre || !data.email || !data.password || !data.rol_id) {
    throw new Error('Faltan campos obligatorios');
  }

  data.password = await bcrypt.hash(data.password, 10);

  const usuario = await crearUsuarioDB(data);
  return usuario;
}