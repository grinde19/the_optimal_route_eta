
import MainLayout from '../layouts/MainLayout';
import RutaForm from '../components/RutaForm';
import RegisterForm from '../components/RegisterForm';
import RutasDisponibles from '../components/RutasDisponibles';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminPage() {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" />;
  if (usuario.rol_id !== import.meta.env.VITE_ADMIN_ROLE_ID)
    return <p>No tienes permiso para acceder a esta página.</p>;

  return (
    <MainLayout>
      <h2>Panel de administrador</h2>

      <section>
        <h3>Crear nueva ruta</h3>
        <RutaForm />
      </section>

      <section>
        <h3>Crear usuario (delivery)</h3>
        <RegisterForm />
      </section>

      <section>
        <h3>Rutas disponibles</h3>
        <RutasDisponibles rol="admin" userId={parseInt(usuario.id)} />
      </section>
    </MainLayout>
  );
}

