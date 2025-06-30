import pool from '../db/connection.js';

export async function crearRuta(id, origen) {
  await pool.query(
    'INSERT INTO rutas (id, origen) VALUES ($1, $2)',
    [id, origen]
  );
}

export async function crearEntrega({ id, ruta_id, cliente, direccion, eta, estado }) {
  await pool.query(
    `INSERT INTO entregas (id, ruta_id, cliente, direccion, eta, estado)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, ruta_id, cliente, direccion, eta, estado]
  );
}

export async function obtenerRutaPorId(id) {
  const res = await pool.query(
    'SELECT id, origen, estado, repartidor FROM rutas WHERE id = $1',
    [id]
  );
  return res.rows[0];
}

export async function obtenerEntregasPorRuta(id_ruta) {
  const res = await pool.query(
    `SELECT id, cliente, direccion, eta, estado
     FROM entregas
     WHERE ruta_id = $1
     ORDER BY eta ASC`,
    [id_ruta]
  );
  return res.rows;
}

export async function obtenerEntregasPendientes(ruta_id) {
  const res = await pool.query(
    `SELECT id, direccion, cliente
     FROM entregas
     WHERE ruta_id = $1 AND estado = 'pendiente'
     ORDER BY eta`,
    [ruta_id]
  );
  return res.rows;
}

export async function actualizarETA(entrega_id, nuevaEta) {
  await pool.query(
    `UPDATE entregas SET eta = $1 WHERE id = $2`,
    [nuevaEta, entrega_id]
  );
}

export async function obtenerRutasSinAsignar() {
  const query = `SELECT * FROM rutas WHERE repartidor IS NULL AND estado = 'disponible'`;
  const result = await pool.query(query); 
  return result.rows;
}

export async function tomarRuta(id, repartidor) {
  const res = await pool.query(
    `UPDATE rutas
     SET estado = 'en_curso', repartidor = $1
     WHERE id = $2 AND estado = 'disponible'
     RETURNING *`,
    [repartidor, id]
  );

  return res.rowCount > 0;
}

