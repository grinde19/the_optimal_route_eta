import api from './api';

export async function getRoles() {
  const { data } = await api.get('/roles');
  return data;
}