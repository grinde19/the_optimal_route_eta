import pool from '../db/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function loginUsuario({ email, password }) {
  const res = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
  const usuario = res.rows[0];
  if (!usuario) throw new Error('Usuario no encontrado');

  const coincide = await bcrypt.compare(password, usuario.password);
  if (!coincide) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    { id: usuario.id, rol_id: usuario.rol_id },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol_id: usuario.rol_id
    }
  };
}
