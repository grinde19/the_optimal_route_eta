
import RutasDisponibles from '../components/RutasDisponibles';
import { useAuth } from '../context/AuthContext';

export default function RutasPage() {
  const { usuario } = useAuth();

  if (!usuario) return <p>No estás logueado</p>;

  const rol = usuario.rol_id === import.meta.env.VITE_ADMIN_ROLE_ID ? 'admin' : 'delivery';
  //const userId = Number(usuario.id);

  return <RutasDisponibles rol={rol} userId={usuario.id} />;
}
