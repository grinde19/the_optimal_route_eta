import { insertarRol, obtenerRoles } from '../models/rolModel.js';

export async function listarRoles() {
  return await obtenerRoles();
}
