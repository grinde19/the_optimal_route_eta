import pool from '../db/connection.js';

export async function insertarRol(nombre) {
  const res = await pool.query(
    `INSERT INTO roles (nombre)
     VALUES ($1)
     ON CONFLICT (nombre) DO NOTHING
     RETURNING id`,
    [nombre]
  );
  return res.rows[0];
}

export async function obtenerRoles() {
  const res = await pool.query(
    `SELECT id, nombre FROM roles ORDER BY nombre`
  );
  return res.rows;
}
