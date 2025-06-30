import api from './api';

type CrearUsuarioInput = {
  nombre: string;
  email: string;
  password: string;
  rol_id: string;
};

export async function crearUsuario(data: CrearUsuarioInput) {
  const res = await api.post('/usuarios', data);
  return res.data;
}
