import { crearUsuario } from '../services/usuarioService.js';

export async function crearUsuarioController(req, res) {
  try {
    const usuario = await crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}
