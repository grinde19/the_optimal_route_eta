import { loginUsuario } from '../services/authService.js';

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const resultado = await loginUsuario({ email, password });
    res.json(resultado);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function meController(req, res) {
  res.json({ usuario: req.user });
}
