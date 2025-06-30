import fs from 'fs';
import path from 'path';
import pool from '../db/connection.js';
import bcrypt from 'bcrypt';

export async function initDatabase() {
  try {
    const schemaPath = path.resolve('db/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schema);
    console.log('✅ Base de datos: esquema cargado.');

    await seedRoles();
    await seedAdmin();
    console.log('✅ Base de datos: roles iniciales verificados.');
  } catch (err) {
    console.error('❌ Error al inicializar la base de datos:', err.message);
  }
}

async function seedRoles() {
  const roles = ['admin', 'delivery'];
  for (const nombre of roles) {
    await pool.query(
      `INSERT INTO roles (nombre)
       VALUES ($1)
       ON CONFLICT (nombre) DO NOTHING`,
      [nombre]
    );
  }
}

async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NOMBRE } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_NOMBRE) {
    console.warn('⚠️ Variables de entorno del admin no están definidas, omitiendo creación de admin.');
    return;
  }

  const rolRes = await pool.query(`SELECT id FROM roles WHERE nombre = 'admin'`);
  const rol_id = rolRes.rows[0]?.id;

  if (!rol_id) {
    console.error('❌ Rol admin no existe, no se puede crear usuario admin');
    return;
  }

  const existe = await pool.query(`SELECT 1 FROM usuarios WHERE email = $1`, [ADMIN_EMAIL]);
  if (existe.rowCount > 0) {
    console.log('ℹ️ Admin ya existe, no se crea de nuevo');
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await pool.query(
    `INSERT INTO usuarios (nombre, email, password, rol_id)
     VALUES ($1, $2, $3, $4)`,
    [ADMIN_NOMBRE, ADMIN_EMAIL, passwordHash, rol_id]
  );

  console.log('✅ Admin creado automáticamente:', ADMIN_EMAIL);
}
