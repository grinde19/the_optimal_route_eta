CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  rol_id UUID REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS rutas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  origen TEXT NOT NULL,
  estado TEXT DEFAULT 'disponible',
  repartidor UUID REFERENCES usuarios(id),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS entregas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ruta_id UUID REFERENCES rutas(id) ON DELETE CASCADE,
  cliente TEXT NOT NULL,
  direccion TEXT NOT NULL,
  eta TIME,
  estado TEXT DEFAULT 'pendiente'
);
