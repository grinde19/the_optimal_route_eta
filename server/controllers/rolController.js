import { listarRoles } from '../services/rolService.js';

export async function obtenerRolesController(req, res) {
  try {
    const roles = await listarRoles();
    res.json(roles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener roles' });
  }
}
