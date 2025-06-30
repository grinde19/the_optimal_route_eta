import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rutaRoutes from './routes/rutas.js';
import entregaRoutes from './routes/entregas.js';
import { initDatabase } from './utils/initDb.js';
import usuarioRoutes from './routes/usuarios.js';
import rolRoutes from './routes/roles.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/rutas', rutaRoutes);
app.use('/api/entregas', entregaRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Inicializar DB
initDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚚 API corriendo en http://localhost:${PORT}`);
});
