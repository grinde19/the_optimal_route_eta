import pool from '../db/connection.js';

export async function completarEntrega(id) {
  const result = await pool.query(
    `UPDATE entregas
     SET estado = 'completada'
     WHERE id = $1
     RETURNING id`,
    [id]
  );

  return result.rowCount > 0;
}