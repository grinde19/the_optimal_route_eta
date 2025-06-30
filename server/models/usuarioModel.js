import pool from '../db/connection.js';

export async function crearUsuario({ nombre, email, password, rol_id }) {
  
  const res = await pool.query(
    `INSERT INTO usuarios (nombre, email, password, rol_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [nombre, email, password, rol_id]
  );
  return res.rows[0];
}
